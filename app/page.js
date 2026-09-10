import About from "./components/About";
import ChapterRail from "./components/ChapterRail";
import Footer from "./components/Footer";
import GithubGraph from "./components/GithubGraph";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Professional from "./components/Professional";
import Project from "./components/Project";

export default function Home() {
  return (
    <>
      <Navbar />
      <ChapterRail />
      <main id="main" className="indexed-main">
        <Hero />
        <Project />
        <Professional />
        <About />
        <GithubGraph />
      </main>
      <Footer />
    </>
  );
}
