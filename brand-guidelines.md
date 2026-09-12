# Brand Guidelines — Rifat Dhiya Ul Lail (v2, Monokrom)

> Dokumen ini adalah sumber kebenaran branding. v1 (aksen biru `#2563EB`, light-only) sudah tidak berlaku.

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
--color-surface:       #0b0b0d;  /* Page background — near-black */
--color-surface-alt:   #141418;  /* Alt background (badge, icon-box) */
--color-surface-card:  #15151a;  /* Card/surface background */
--color-border:        #26262c;  /* Borders, dividers */
--color-border-hover:  #3a3a42;  /* Hover borders */
--color-text-primary:  #f5f5f7;  /* Primary text, CTA background */
--color-text-secondary:#a1a1a6;  /* Secondary text */
--color-text-muted:    #8a8a91;  /* Muted/hint text */
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

**Glow ambient (`bg-radial-soft`) — dose cap 2:** hanya di hero (glow dekoratif) dan section kontak (penutup halaman). Section konten (About, Projects, Skills) flat. Ikon panah `↗` hanya untuk link eksternal; link internal tanpa panah. Tidak ada animasi loop abadi — semua motion berpemicu scroll/hover/klik atau one-shot reveal.

## Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| Display/Headline | Outfit | 400, 500, 600, 700, 800 | Google Fonts (next/font) |
| Body | DM Sans | 400, 500, 600, 700 | Google Fonts (next/font) |
| Mono/Code | JetBrains Mono | 400, 500 | Google Fonts (next/font) |

### Type Scale

| Level | Size (clamp) | Weight | Line Height | Font |
|-------|-------------|--------|-------------|------|
| Hero H1 | `text-5xl sm:text-6xl lg:text-7xl` | 700 | 1.02 | Outfit |
| Section H2 | `text-3xl md:text-4xl lg:text-5xl` | 700 | 1.1 | Outfit |
| Section H3 | `text-2xl md:text-3xl` | 700 | 1.2 | Outfit |
| Card Title | `text-2xl md:text-3xl` | 700 | 1.2 | Outfit |
| Body | `1.0625rem` | 400 | 1.7 | DM Sans |
| Body Small | `text-sm` | 400 | 1.5 | DM Sans |
| Mono Label / Eyebrow | `0.6875–0.75rem`, uppercase, `tracking-[0.25em]` | 400/600 | 1 | JetBrains Mono |
| Badge | `0.75rem` | 500 | 1 | DM Sans |
| Button | `0.875rem` | 600 | 1 | DM Sans |

## Logo & Monogram

**Monogram:** "RD" dalam rounded square (`border-radius: 6px`), background warm gray `#787774` dengan teks `#FBFBFA` (lihat `public/favicon.svg`).

### Usage
- Jangan rotate, recolor, atau taruh di background yang ramai
- Minimum size: 28px

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
| Rounded | 12–20px | Cards (project 20px, edu/skill 14–16px) |
| Pill | 999px | Buttons, badges, nav, dividers |

## Component Tokens

### Button Primary
| State | Background | Text |
|-------|-----------|------|
| Default | `--color-text-primary` | `--color-surface` |
| Hover | `#f2f2f5` | `--color-surface` |
| Active | `scale(0.97)` | — |

### Button Outline
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | transparent | `--color-border-hover` | `--color-text-primary` |
| Hover | subtle surface tint | `--color-text-primary` | `--color-text-primary` |
| Active | `scale(0.97)` | — | — |

### Card & Surface (Liquid Glass System)
| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, rgba(25, 25, 32, 0.72) 0%, rgba(15, 15, 20, 0.52) 100%)` |
| Backdrop Blur | `backdrop-filter: blur(18px-20px) saturate(150%-160%)` |
| Border | `1px solid rgba(255, 255, 255, 0.08)` (specular highlight tepi atas `inset 0 1px 1px rgba(255, 255, 255, 0.14)`) |
| Hover | `translateY(-2px s.d. -4px)` + border ke `rgba(255, 255, 255, 0.22)` + ambient glare & depth shadow |

### Background Layers (Starfield + Liquid Ambient)
1. **Canvas Starfield (`BackgroundPixelStars`):** `fixed inset-0 z-[1]`, bintang monokrom kelap-kelip 16fps.
2. **Liquid Ambient (`LiquidAmbient`):** `fixed inset-0 z-[2]`, fluid organic blobs monokrom halus yang bergerak lambat di balik kaca.
3. **Content (`main`):** `relative z-10`, section transparan dengan kartu Liquid Glass semi-transparan yang membiaskan cahaya di baliknya.

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
| Scroll reveal | opacity + translateY + blur | 0.55s | `cubic-bezier(0.12,0,0.3,1)` |
| Hero stagger | opacity + translateY + blur | 0.6–0.7s | `[0.16, 1, 0.3, 1]` |
| Role rotator | opacity + translateY + blur | 0.5s | `[0.16, 1, 0.3, 1]` |
| Hover card | translateY | 0.3s | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| Active press | scale 0.97 | 0.15s | ease |

Semua animasi Motion (`motion/react`) di-guard `useReducedMotionSafe()`; CSS reveal di-guard `prefers-reduced-motion`.

### Pixel-Star Background (`BackgroundPixelStars`)
- Canvas fixed `z-[1]`, di bawah konten (`main` z-10), `aria-hidden`, `print:hidden`
- Bintang monokrom mengikuti `--color-text-primary` (tidak rainbow), 3 tier
  titik bulat: mayoritas 1-2px redup (0.3-0.6), sedang 2-3px (0.6-0.85),
  hero 4-5px terang (0.9-1.0)
- reduced-motion → render satu frame statis, loop rAF tidak jalan
- Twinkle effect halus dengan regenerasi berkala, 16fps retro

## Accessibility Standards

- WCAG AA contrast minimum (4.5:1 body, 3:1 large text)
- Focus-visible rings on all interactive elements
- Skip navigation link ("Loncat ke konten utama")
- Touch targets minimum 44px (`.btn` min-height 44px)
- Reduced motion support (`prefers-reduced-motion: reduce`)
- Semantic HTML: `nav`, `main`, landmark, `role="progressbar"`
- Print stylesheet
