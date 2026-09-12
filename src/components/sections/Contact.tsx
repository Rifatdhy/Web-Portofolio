"use client";

import { SITE, SOCIAL } from "@/lib/constants";
import {
  WhatsappLogo,
  Envelope,
  DownloadSimple,
  GithubLogo,
  ArrowUpRight,
  LinkedinLogo,
  InstagramLogo
} from "@phosphor-icons/react";
import { Reveal } from "../magic/Reveal";

export function Contact() {
  return (
    <section id="kontak" className="relative py-28 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Tersedia untuk diskusi
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-tight mt-4">
              Ada project atau ide?
            </h2>
            <p
              className="mt-6 leading-relaxed max-w-md mx-auto text-secondary"
            >
              Terbuka untuk diskusi, kolaborasi, atau sekadar mengobrol
              seputar teknologi: pengembangan web, aplikasi desktop dan
              mobile, jaringan, hingga IT support.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="max-w-2xl mx-auto mt-12">
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group contact-card"
              >
                <div className="icon-box">
                  <WhatsappLogo
                    aria-hidden="true"
                    weight="bold"
                    className="text-2xl text-secondary"
                  />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-sm font-display font-semibold truncate">
                    WhatsApp
                  </span>
                  <span
                    className="block text-xs truncate text-secondary"
                  >
                    {SITE.phone}
                  </span>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  weight="bold"
                  className="text-sm ml-auto shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={SITE.emailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="group contact-card"
              >
                <div className="icon-box">
                  <Envelope
                    aria-hidden="true"
                    weight="bold"
                    className="text-2xl text-secondary"
                  />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-sm font-display font-semibold truncate">
                    Email
                  </span>
                  <span
                    className="block text-xs truncate text-secondary"
                  >
                    {SITE.email}
                  </span>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  weight="bold"
                  className="text-sm ml-auto shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href="/assets/CV%20Rifat.pdf"
                download
                className="group contact-card"
              >
                <div className="icon-box">
                  <DownloadSimple
                    aria-hidden="true"
                    weight="bold"
                    className="text-2xl text-secondary"
                  />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-sm font-display font-semibold truncate">
                    Download CV
                  </span>
                  <span
                    className="block text-xs truncate text-secondary"
                  >
                    PDF &middot; Rifat Dhiya Ul Lail
                  </span>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  weight="bold"
                  className="text-sm ml-auto shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={SOCIAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group contact-card"
              >
                <div className="icon-box">
                  <GithubLogo
                    aria-hidden="true"
                    weight="bold"
                    className="text-2xl"
                  />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-sm font-display font-semibold truncate">
                    GitHub
                  </span>
                  <span
                    className="block text-xs truncate text-secondary"
                  >
                    @Rifatdhy
                  </span>
                </div>
                <ArrowUpRight
                  aria-hidden="true"
                  weight="bold"
                  className="text-sm ml-auto shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="flex justify-center gap-3 mt-12">
            <a href={SOCIAL.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
              <WhatsappLogo aria-hidden="true" weight="bold" className="text-xl" />
            </a>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <GithubLogo aria-hidden="true" weight="bold" className="text-xl" />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <LinkedinLogo aria-hidden="true" weight="bold" className="text-xl" />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <InstagramLogo aria-hidden="true" weight="bold" className="text-xl" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}