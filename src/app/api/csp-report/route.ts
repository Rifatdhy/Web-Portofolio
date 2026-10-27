import { NextResponse } from "next/server";

const MAX_REPORT_BYTES = 64 * 1024;

interface CspViolation {
  "document-uri"?: unknown;
  "blocked-uri"?: unknown;
  "violated-directive"?: unknown;
  "effective-directive"?: unknown;
  disposition?: unknown;
}

type ReportPayload =
  | { "csp-report"?: CspViolation }
  | Array<{ type?: string; body?: CspViolation }>
  | CspViolation;

function truncate(value: unknown, maxLength = 200): string | undefined {
  if (typeof value !== "string" || value.length === 0) return undefined;
  return value.length > maxLength
    ? `${value.slice(0, maxLength)}...`
    : value;
}

function documentPath(value: unknown): string | undefined {
  const uri = truncate(value, 2048);
  if (!uri) return undefined;

  try {
    const parsed = new URL(uri);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    // Legacy reports may contain a bare path; keep it, but drop query/hash.
    return uri.split(/[?#]/, 1)[0];
  }
}

function logViolation(violation: CspViolation | undefined) {
  if (!violation) return;

  const directive = truncate(
    violation["effective-directive"] ?? violation["violated-directive"],
    120,
  );
  const blocked = truncate(violation["blocked-uri"], 300);
  const path = documentPath(violation["document-uri"]);
  const disposition = truncate(violation.disposition, 40);

  if (!directive && !blocked) return;

  // Keep the log shape small and strip page query strings before they reach
  // Vercel's log drain. CSP reports are untrusted input, so every field is
  // length-limited above.
  console.warn(
    "[csp-report]",
    JSON.stringify({ directive, blocked, documentPath: path, disposition }),
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (Number.isFinite(contentLength) && contentLength > MAX_REPORT_BYTES) {
    return new NextResponse(null, { status: 413 });
  }

  const raw = await request.text();
  if (raw.length > MAX_REPORT_BYTES) {
    return new NextResponse(null, { status: 413 });
  }
  if (!raw) {
    return new NextResponse(null, { status: 204 });
  }

  let payload: ReportPayload;
  try {
    payload = JSON.parse(raw) as ReportPayload;
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  if (Array.isArray(payload)) {
    // Reporting API (`report-to`) sends a batch of report objects.
    for (const report of payload) {
      if (report && typeof report === "object" && "body" in report) {
        logViolation(report.body);
      }
    }
  } else if (payload && typeof payload === "object" && "csp-report" in payload) {
    // Legacy `report-uri` payload.
    logViolation((payload as { "csp-report"?: CspViolation })["csp-report"]);
  } else {
    logViolation(payload as CspViolation);
  }

  return new NextResponse(null, { status: 204 });
}
