import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import UniversityProjects from "@/components/UniversityProjects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Certifications />
        <UniversityProjects />
        <Contact />
      </main>
    </>
  );
}
