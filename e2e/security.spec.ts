import { expect, test } from "@playwright/test";

test("CSP report endpoint accepts legacy and Reporting API payloads", async ({
  request,
}) => {
  const legacy = await request.post("/api/csp-report", {
    data: {
      "csp-report": {
        "document-uri": "https://example.com/?token=secret",
        "blocked-uri": "https://evil.example/script.js",
        "violated-directive": "script-src 'self'",
        disposition: "enforce",
      },
    },
  });
  expect(legacy.status()).toBe(204);

  const modern = await request.post("/api/csp-report", {
    data: [
      {
        type: "csp-violation",
        body: {
          "document-uri": "https://example.com/page",
          "blocked-uri": "inline",
          "effective-directive": "script-src-elem",
          disposition: "enforce",
        },
      },
    ],
  });
  expect(modern.status()).toBe(204);
});

test("CSP report endpoint rejects oversized payloads", async ({ request }) => {
  const response = await request.post("/api/csp-report", {
    headers: { "content-type": "application/csp-report" },
    data: "x".repeat(70 * 1024),
  });

  expect(response.status()).toBe(413);
});
