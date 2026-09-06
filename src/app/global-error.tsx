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
          backgroundColor: "#0b0b0d",
          color: "#f5f5f7",
          fontFamily: "system-ui, sans-serif",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: "28rem", padding: "1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            Terjadi kesalahan
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#a1a1a6", lineHeight: 1.7 }}>
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
                fontWeight: 600,
                fontSize: "0.875rem",
                backgroundColor: "#f5f5f7",
                color: "#0b0b0d",
              }}
            >
              Coba lagi
            </button>
            <Link
              href="/"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#f5f5f7",
                border: "1px solid #3a3a42",
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
