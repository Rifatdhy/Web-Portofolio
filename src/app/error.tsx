"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Error 500
        </span>
        <div role="alert" className="mt-4">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Halaman gagal dimuat.
          </h1>
          <p className="mt-6 leading-relaxed text-secondary">
            Sesuatu tidak beres saat memuat halaman ini. Coba lagi, atau kembali
            ke beranda untuk melanjutkan.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            Coba lagi
          </button>
          <Link href="/" className="btn btn-outline">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
