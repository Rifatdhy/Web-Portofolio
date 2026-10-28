import { SOCIAL } from "@/lib/constants";
import { GithubLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react/ssr";
import { FooterNav } from "./FooterNav";

export function Footer() {
  return (
    <footer className="relative z-10 text-[var(--color-text-muted)] py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <div className="flex flex-col items-center sm:items-start gap-3">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Rifat Dhiya Ul Lail
            </p>
            <FooterNav />
          </div>
          <div className="flex items-center gap-x-2">
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub (dibuka di tab baru)">
              <GithubLogo aria-hidden="true" size={20} />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn (dibuka di tab baru)">
              <LinkedinLogo aria-hidden="true" size={20} />
            </a>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram (dibuka di tab baru)">
              <InstagramLogo aria-hidden="true" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
