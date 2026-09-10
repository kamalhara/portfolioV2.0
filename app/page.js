import About from "./components/About";
import ChapterRail from "./components/ChapterRail";
import Footer from "./components/Footer";
import Activities from "./components/Activities";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Professional from "./components/Professional";
import Project from "./components/Project";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChapterRail />
      <main
        id="main"
        className="mx-auto  px-6 pt-8 pb-24 sm:px-10 lg:px-12 xl:mx-0 xl:ml-56"
      >
        <Hero />
        <Project />
        <Professional />
        <About />
        <Activities />
      </main>
      <Footer />
    </>
  );
}
