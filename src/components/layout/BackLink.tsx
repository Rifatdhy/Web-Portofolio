import Link from "next/link";

export function BackLink({ href = "/", label = "Kembali ke Beranda" }: { href?: string; label?: string }) {
  return (
    <Link
      href={href}
      className="mb-8 -ml-2 inline-flex min-h-11 items-center gap-1 px-2 text-sm font-medium text-[var(--color-text-secondary)] transition-opacity hover:opacity-60 print:hidden"
    >
      <span aria-hidden="true">&larr;</span>
      {label}
    </Link>
  );
}
