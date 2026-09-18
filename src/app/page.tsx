import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

// Below-the-fold sections are code-split so the initial JS bundle only
// covers the hero (LCP). SSR stays enabled, so crawlers and first paint
// still get the full HTML.
const About = dynamic(() =>
  import("@/components/sections/About").then((m) => m.About),
);
const Experience = dynamic(() =>
  import("@/components/sections/Experience").then((m) => m.Experience),
);
const Projects = dynamic(() =>
  import("@/components/sections/Projects").then((m) => m.Projects),
);
const Skills = dynamic(() =>
  import("@/components/sections/Skills").then((m) => m.Skills),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}
