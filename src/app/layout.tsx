import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE, SOCIAL } from "@/lib/constants";
import { Footer } from "@/components/layout/Footer";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { BackToTop } from "@/components/layout/BackToTop";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";
import { LiquidAmbient } from "@/components/ui/LiquidAmbient";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | ${SITE.title}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
  },
  keywords:
    "Rifat Dhiya Ul Lail, portfolio, web developer, aplikasi desktop, aplikasi mobile, jaringan komputer, IT support, teknik informatika, Jakarta Global University, frontend, backend, react, nextjs, laravel, java, mikrotik, cisco",
  authors: [{ name: SITE.name }],
};

// themeColor belongs in the `viewport` export — the `metadata.themeColor`
// option was deprecated in Next.js 14.
export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.title,
  description: SITE.description,
  email: SITE.email,
  // City-level only: enough for structured data without publishing a home
  // address. Matches the location shown on /cv.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Depok",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Jakarta Global University",
  },
  knowsLanguage: ["id", "en"],
  knowsAbout: [
    "Web Development",
    "Desktop Application Development",
    "Mobile Development",
    "Network Engineering",
    "IT Support",
    "React",
    "Next.js",
    "TypeScript",
    "Laravel",
    "Java",
    "MikroTik",
    "Cisco",
  ],
  sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.instagram],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Without JS the scroll-reveal / Motion elements would stay at
            opacity:0, leaving the page blank. Force everything visible. */}
        <noscript>
          <style>{`
            .scroll-reveal, .skill-cell { opacity: 1 !important; transform: none !important; }
            [style*="opacity:0;"], [style$="opacity:0"] { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-dvh">
        <a
          href="#main-content"
          className="skip-link fixed top-4 left-4 z-[70] inline-flex min-h-11 items-center px-4 py-2 rounded bg-[var(--color-text-primary)] text-[var(--color-surface)] text-sm font-medium transition-transform duration-300 -translate-y-24 focus:translate-y-0"
        >
          Loncat ke konten utama
        </a>
        <ProgressBar />
        <BackToTop />
        <BackgroundPixelStars />
        <LiquidAmbient />
        <SmoothScroll>
          <main id="main-content" tabIndex={-1} className="relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
