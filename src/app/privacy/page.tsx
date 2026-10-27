import { SITE } from "@/lib/constants";
import { buildPageMetadata } from "@/lib/metadata";
import { BackLink } from "@/components/layout/BackLink";

export const metadata = buildPageMetadata({
  title: "Kebijakan Privasi",
  description: `Kebijakan privasi situs portofolio ${SITE.name} — data yang dikumpulkan dan hak Anda.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="pt-20 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <BackLink />

        <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
          Kebijakan Privasi
        </h1>

        <div className="prose-custom">
          <h2>Data yang dikumpulkan</h2>
          <p>
            Situs ini tidak mengumpulkan data pribadi Anda. Satu-satunya data
            yang diproses adalah data analitik anonim melalui Vercel Analytics
            dan Speed Insights untuk memahami lalu lintas dan performa
            pengunjung.
          </p>

          <h2>Penyimpanan data</h2>
          <p>
            Tidak ada data pribadi yang disimpan di server. Statistik kunjungan
            dan metrik performa dikumpulkan secara anonim dan agregat oleh
            Vercel Analytics dan Speed Insights.
          </p>

          <h2>Cookie</h2>
          <p>
            Situs ini tidak menggunakan cookie pelacakan atau pelacakan pihak
            ketiga. Vercel Analytics dan Speed Insights digunakan untuk
            mengukur lalu lintas dan performa secara anonim tanpa cookie.
          </p>

          <h2>Hak Anda</h2>
          <p>
            Anda berhak meminta penghapusan data Anda kapan saja dengan
            menghubungi saya melalui email yang tercantum di halaman kontak.
          </p>

          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Terakhir diperbarui: Oktober 2026
          </p>
        </div>
      </div>
    </div>
  );
}
