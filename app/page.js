import Footer from "./components/Footer";
import GithubGraph from "./components/GithubGraph";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Professional from "./components/Professional";
import Project from "./components/Project";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Project />
        <Professional />
        <Skills />
        <GithubGraph />
      </main>
      <Footer />
    </>
  );
}
