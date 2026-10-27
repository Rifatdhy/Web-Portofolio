# Brand Guidelines — Rifat Dhiya Ul Lail (v3, Monokrom Apple)

> Dokumen ini adalah sumber kebenaran branding. v2 (near-black `#0b0b0d`, Outfit/DM Sans/JetBrains Mono) sudah tidak berlaku. v1 (aksen biru `#2563EB`, light-only) juga sudah tidak berlaku.

## Brand Overview

| Atribut | Nilai |
|---------|-------|
| Nama | Rifat Dhiya Ul Lail |
| Monogram | RD |
| Title | Web, App & Network Engineer |
| Tagline | Nulis kode, ngulik jaringan |
| Audience | Technical recruiters, hiring managers, freelance clients |
| Tone | Profesional, hangat, percaya diri |

## Brand Voice

| Dimensi | Karakter |
|---------|----------|
| Tone | Profesional tapi approachable |
| Language | Indonesia (utama), Inggris (tech terms) |
| Register | Conversational, no jargon-jargon kaku |
| Kepribadian | Teknikal, curious, straightforward |

**Do:** "Buat saya, coding bukan cuma nulis function, tapi soal bikin sesuatu yang benar-benar dipakai orang."
**Don't:** Gunakan hiperbola marketing atau buzzwords kosong.

## Color Palette (Monokrom, Tanpa Accent Color)

Hierarki visual dibawa oleh tipografi, spacing, dan kontras — bukan warna.

### Dark Mode (satu-satunya tema)

```css
--color-surface:       #000000;  /* Page background — Apple pure black */
--color-surface-alt:   #1c1c1e;  /* Elevated surface (badge, icon-box) */
--color-surface-card:  #1c1c1e;  /* Card/surface background */
--color-border:        #2c2c2e;  /* Borders, dividers */
--color-border-hover:  #48484a;  /* Hover borders */
--color-text-primary:  #f5f5f7;  /* Primary text, CTA background */
--color-text-secondary:#a1a1a6;  /* Secondary text */
--color-text-muted:    #86868b;  /* Muted/hint text */
--color-brand-50: rgba(245,245,247,0.06);  /* Subtle tint */
```

**No light mode.** Palet di atas satu-satunya yang berlaku di seluruh situs.

### Color Usage Rules

| Elemen | Token |
|--------|-------|
| Page background | `--color-surface` |
| Section alt bg | `--color-surface-alt` |
| Card/surface bg | `--color-surface-card` |
| Primary text | `--color-text-primary` |
| Secondary text | `--color-text-secondary` |
| CTA button bg | `--color-text-primary` (inverted terhadap surface) |
| Borders | `--color-border` |
| Focus ring | `--color-text-primary` |

**Zero accent color.** Jangan menambahkan warna aksen (biru/hijau/merah) kecuali ikon brand pihak ketiga dan logo sosial.

**Glow ambient (`bg-radial-soft`) — dose cap 1:** hanya di hero (glow dekoratif ber-parallax). Section konten (About, Experience, Projects, Skills) dan kontak flat — glow kontak dihapus karena memunculkan tepi kotak gradien yang terlihat. Ikon panah `↗` hanya untuk link eksternal; link internal tanpa panah. Tidak ada animasi loop abadi pada **elemen UI** — semua motion foreground berpemicu scroll/hover/klik atau one-shot reveal. Pengecualiannya hanya dua layer background (`BackgroundPixelStars` dan `LiquidAmbient`) yang memang bergerak kontinu; keduanya di-nonaktifkan saat `prefers-reduced-motion`.

## Typography

Font memakai **system SF stack** — tidak ada webfont yang diunduh, dan SF Pro tidak di-host sendiri (lisensi Apple membatasi distribusi file font). Di perangkat Apple stack ini menghasilkan SF Pro; di Windows/Linux jatuh ke Segoe UI/Roboto dengan metrik yang tetap netral.

| Role | Stack | Weight | Source |
|------|-------|--------|--------|
| Display/Headline | `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif` | 500–700 | System font |
| Body | `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif` | 400–600 | System font |
| Mono/Code | `ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace` | 400/600 | System font |

Tidak ada `next/font`, Google Fonts, atau file font eksternal. `--font-display`, `--font-body`, dan `--font-mono` didefinisikan di blok `@theme` `src/app/globals.css`.

### Type Scale

| Level | Size (clamp) | Weight | Line Height | Font |
|-------|-------------|--------|-------------|------|
| Hero H1 | `text-5xl sm:text-6xl lg:text-7xl` | 700 | 1.02 | SF Display stack |
| Section H2 | `text-3xl md:text-4xl lg:text-5xl` | 700 | 1.1 | SF Display stack |
| Section H3 | `text-2xl md:text-3xl` | 700 | 1.2 | SF Display stack |
| Card Title | `text-2xl md:text-3xl` | 700 | 1.2 | SF Display stack |
| Body | `1.0625rem` | 400 | 1.65 | SF Text stack |
| Body Small | `text-sm` | 400 | 1.5 | SF Text stack |
| Mono Label / Eyebrow | `0.6875–0.75rem`, uppercase, `tracking-[0.25em]` | 400/600 | 1 | SF Mono stack |
| Badge | `0.75rem` | 500 | 1 | SF Text stack |
| Button | `0.9375rem` | 500 | 1 | SF Text stack |

Heading tracking mengikuti Apple: `-0.035em` untuk H1, `-0.028em` untuk H2, `-0.022em` untuk H3–H6. Body memakai `letter-spacing: -0.01em`.

## Logo & Monogram

**Monogram:** "RD" dalam rounded square (`border-radius: 6px`), background warm gray `#787774` dengan teks `#FBFBFA` (lihat `public/favicon.svg`).

### Usage
- Jangan rotate, recolor, atau taruh di background yang ramai
- Minimum size: 28px

### Ikon skill
- Pakai logo brand resmi berwarna (Devicon varian `original` atau aset resmi brand). Jangan memonokromkan ikon berwarna.
- Brand yang memang hitam/putih (Next.js, GitHub, Express, Prisma, MikroTik) memakai varian putih resmi agar terbaca di kartu gelap.
- Satu pengecualian raster: Winbox memakai app icon PNG resmi (belum ada SVG resmi), dideklarasikan lewat field `icon` di `src/lib/data.ts`.

## Spacing System

| Token | Value |
|-------|-------|
| Section padding | `py-28 md:py-32` |
| Container | `max-w-6xl mx-auto px-6` |
| Grid gaps | `gap-6` (cards), `gap-3` (chips), `gap-10 md:gap-16` (section grid) |

## Border Radius Scale

| Level | Value | Usage |
|-------|-------|-------|
| Soft | 8px | Focus ring |
| Rounded | 16–22px | Cards (project 22px, edu/contact/cv 18px, skill 16px) |
| Pill | 999px | Buttons, badges, nav, dividers |

## Component Tokens

### Button Primary
| State | Background | Text |
|-------|-----------|------|
| Default | `--color-text-primary` | `--color-surface` |
| Hover | `#ffffff` | `--color-surface` |
| Active | `#e8e8ed` + `scale(0.97)` | `--color-surface` |

### Button Outline
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | transparent | `--color-border-hover` | `--color-text-primary` |
| Hover | `rgba(255,255,255,0.06)` | `--color-text-muted` | `--color-text-primary` |
| Active | `scale(0.97)` | — | — |

### Card & Surface (Liquid Glass System)
| Property | Value |
|----------|-------|
| Background | `rgba(28, 28, 30, 0.72)` — Apple elevated neutral, tanpa gradient |
| Backdrop Blur | `backdrop-filter: blur(20px) saturate(180%)` |
| Border | `1px solid rgba(255, 255, 255, 0.08)` + hairline atas `inset 0 1px 0 rgba(255, 255, 255, 0.04)` |
| Shadow | `0 12px 32px -12px rgba(0, 0, 0, 0.8)` (project card `0 18px 42px -16px`) |
| Hover | background `rgba(28, 28, 30, 0.9)`, border `rgba(255,255,255,0.16)`, `translateY(-2px)`, shadow lebih dalam |

Tidak ada glow putih di tepi kartu. Aksen visual hanya dari hairline, kontras teks, dan ambient background yang samar.

### Background Layers (Starfield + Liquid Ambient)
1. **Canvas Starfield (`BackgroundPixelStars`):** `fixed inset-0 z-[1]`, bintang monokrom kelap-kelip 16fps.
2. **Liquid Ambient (`LiquidAmbient`):** `fixed inset-0 z-[2]`, fluid organic blobs monokrom halus yang bergerak lambat di balik kaca.
3. **Content (`main`):** `relative z-10`, section transparan dengan kartu Liquid Glass semi-transparan yang membiaskan cahaya di baliknya.

### Project Imagery
| Aturan | Nilai |
|--------|-------|
| Rasio | 16:9 (`aspect-video`) |
| Ukuran | 900×506 (cover) atau 1200×750 (screenshot live) |
| Format | PNG teroptimasi, target < 100 KB |
| Warna | Monokrom: grayscale + invert, background mendekati `--color-surface` |
| Alt text | `Pratinjau proyek <judul>` — bukan deskripsi duplikat |
| Fallback | Monogram inisial di atas gradien surface kalau `image` kosong |
| Hover | Scale 1.02, hanya saat `motion-safe` |

Screenshot berwarna tidak boleh ditampilkan apa adanya: konversi dulu agar
tidak ada accent color yang lolos ke UI. Overlay gradient tipis di bagian bawah
menjaga transisi ke body kartu.

### Form Input
> Contact form saat ini dihapus (Juni 2026). Token ini dipertahankan untuk penggunaan di masa depan.

| State | Border |
|-------|--------|
| Default | `1px solid --color-border` |
| Focus | `--color-text-primary` + focus-visible ring |

## Motion Guidelines

| Elemen | Tipe | Durasi | Easing |
|--------|------|--------|--------|
| Page enter (template) | opacity + translateY | 0.35s | `[0.16, 1, 0.3, 1]` |
| Scroll reveal | opacity + translateY (tanpa blur, agar composited) | 0.55s | `cubic-bezier(0.12,0,0.3,1)` |
| Hero (H1, role-line, paragraf, tombol: statis demi LCP) | tanpa animasi enter | — | — |
| Role rotator (kata berputar) | opacity + translateY, interval 1s | 0.2s | `[0.16, 1, 0.3, 1]` |
| Hover card | translateY | 0.3s | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Active press | scale 0.97 | 0.15s | ease |

Semua animasi Motion (`motion/react`) di-guard `useReducedMotionSafe()`; CSS
reveal, liquid ambient, dan hover transform di-guard `prefers-reduced-motion`.
Pengecualian: rotator role hero sengaja tetap berjalan saat reduced motion
(keputusan produk); parallax glow hero tetap statis. Lenis di-import dinamis
setelah idle; skip link tetap memakai perilaku native.

### Pixel-Star Background (`BackgroundPixelStars`)
- Canvas fixed `z-[1]`, di bawah konten (`main` z-10), `aria-hidden`, `print:hidden`
- Bintang monokrom mengikuti `--color-text-primary` (tidak rainbow), 3 tier
  titik bulat: mayoritas 1-2px redup (0.3-0.6), sedang 2-3px (0.6-0.85),
  hero 4-5px terang (0.9-1.0)
- reduced-motion → render satu frame statis, loop rAF tidak jalan
- Live loop di-init setelah browser idle (`requestIdleCallback`, fallback timeout) agar tidak berebut dengan hydration/LCP
- Twinkle effect halus dengan regenerasi berkala, 16fps retro

## Accessibility Standards

- WCAG AA contrast minimum (4.5:1 body, 3:1 large text)
- Focus-visible rings on all interactive elements
- Skip navigation link ("Loncat ke konten utama", 44px, native behaviour)
- Touch targets minimum 44px (`.btn`, footer nav links)
- Reduced motion support (`prefers-reduced-motion: reduce`), termasuk mematikan liquid ambient dan hover transform; rotator role hero tetap berjalan
- Reduced transparency support (`prefers-reduced-transparency: reduce`): kartu dan pill memakai surface opak, backdrop blur dimatikan
- Semantic HTML: `nav`, `main`, landmark, `role="progressbar"`
- Link eksternal yang membuka tab baru: `rel="noopener noreferrer"` + hint
  "(dibuka di tab baru)" di accessible name, tanpa menghapus teks terlihat
- Navigasi hash memindahkan fokus keyboard ke section target (`tabindex="-1"`)
  dan tetap bekerja dengan reduced motion, deep link, serta back/forward
- Label link harus memuat teks terlihatnya; jangan menimpa dengan `aria-label`
  yang berbeda (axe `label-content-name-mismatch`)
- Filter proyek memakai `aria-pressed` + `role="status"` untuk mengumumkan
  jumlah hasil
- Print stylesheet: override token ke palet terang, sembunyikan nav/button/decorative layers
