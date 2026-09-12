import type { Metadata } from "next";
import { Outfit, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE, SOCIAL } from "@/lib/constants";
import { Footer } from "@/components/layout/Footer";
import { ProgressBar } from "@/components/layout/ProgressBar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { BackgroundPixelStars } from "@/components/ui/background-pixel-stars";
import { LiquidAmbient } from "@/components/ui/LiquidAmbient";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | ${SITE.title}`,
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} | Portfolio`,
    description: SITE.description,
    type: "website",
    url: SITE.url,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.title,
  almaMater: "Jakarta Global University",
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
    <html
      lang="id"
      className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#0b0b0d" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-dvh">
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[70] px-4 py-2 rounded bg-[var(--color-text-primary)] text-[var(--color-surface)] text-sm font-medium transition-transform duration-300 -translate-y-24 focus:translate-y-0"
        >
          Loncat ke konten utama
        </a>
        <ProgressBar />
        <BackgroundPixelStars />
        <LiquidAmbient />
        <SmoothScroll>
          <main id="main-content" className="relative z-10">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
