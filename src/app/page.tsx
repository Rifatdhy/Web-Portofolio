import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

// Canonical is declared per page, not on the root layout — a layout-level
// canonical would make every sub-page claim the homepage as canonical.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
      <div>
        <Hero />
        <Projects />
        <div className="profile-editorial">
          <About />
          <Experience />
        </div>
        <Skills />
        <Contact />
      </div>
  );
}
