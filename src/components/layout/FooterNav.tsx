"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pageLinks = [
  { href: "/", label: "Beranda" },
  { href: "/proyek", label: "Proyek" },
  { href: "/cv", label: "CV" },
  { href: "/privacy", label: "Privasi" },
];

export function FooterNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigasi halaman"
      className="flex flex-wrap items-center justify-center gap-1 text-sm sm:justify-start"
    >
      {pageLinks.map((link, i) => (
        <span key={link.href} className="flex items-center gap-1">
          {i > 0 && (
            <span aria-hidden="true" className="text-[var(--color-border-hover)]">
              &middot;
            </span>
          )}
          <Link
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            className={`inline-flex min-h-11 items-center rounded px-2 py-2 transition-colors hover:text-[var(--color-text-primary)] ${
              pathname === link.href
                ? "font-medium text-[var(--color-text-primary)]"
                : ""
            }`}
          >
            {link.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}
