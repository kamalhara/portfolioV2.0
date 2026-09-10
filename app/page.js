import About from "./components/About";
import ChapterRail from "./components/ChapterRail";
import Footer from "./components/Footer";
import Activities from "./components/Activities";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Professional from "./components/Professional";
import Project from "./components/Project";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChapterRail />
      <main
        id="main"
        className="mx-auto max-w-360 px-4 pt-6 pb-20 sm:px-8 sm:pt-8 sm:pb-24 lg:px-12 xl:mr-auto xl:ml-56"
      >
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        <ScrollReveal>
          <Project />
        </ScrollReveal>
        <ScrollReveal>
          <Professional />
        </ScrollReveal>
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <Activities />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
