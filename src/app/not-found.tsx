import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80dvh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-6 text-center">
        <span
          className="font-display text-[8rem] md:text-[10rem] font-bold leading-none tracking-[-0.04em]"
          style={{ color: "var(--color-border)" }}
        >
          404
        </span>
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mt-4">
          Halaman tidak ditemukan
        </h1>
        <p
          className="mt-3 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak
          pernah ada.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
