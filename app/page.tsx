import type { ComponentType } from "react";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import UniversityProjects from "@/components/UniversityProjects";
import Contact from "@/components/Contact";
import { enabledSections, navLinks, type SectionId } from "@/lib/siteConfig";

// Order and visibility come from content/site-config.json (edit via /admin in dev).
const SECTION_COMPONENTS: Record<SectionId, ComponentType> = {
  hero: Hero,
  projects: Projects,
  skills: Skills,
  about: About,
  certifications: Certifications,
  university: UniversityProjects,
  contact: Contact,
};

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar links={navLinks()} />
      <main>
        {enabledSections().map((id) => {
          const Section = SECTION_COMPONENTS[id];
          return <Section key={id} />;
        })}
      </main>
      <BackToTop />
    </>
  );
}
