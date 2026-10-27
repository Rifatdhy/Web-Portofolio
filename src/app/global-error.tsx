"use client";

import Link from "next/link";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          backgroundColor: "#000000",
          color: "#f5f5f7",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div style={{ maxWidth: "28rem", padding: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.03em" }}>
            Terjadi kesalahan
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#a1a1a6", lineHeight: 1.6 }}>
            Sesuatu tidak beres saat memuat halaman ini. Coba lagi atau
            kembali ke beranda.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "0.9375rem",
                backgroundColor: "#f5f5f7",
                color: "#000000",
              }}
            >
              Coba lagi
            </button>
            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                fontWeight: 500,
                fontSize: "0.9375rem",
                color: "#f5f5f7",
                border: "1px solid #48484a",
                textDecoration: "none",
              }}
            >
              Beranda
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
