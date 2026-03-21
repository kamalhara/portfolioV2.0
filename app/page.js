import Navbar from "./components/Navbar";
import Grid from "./components/GridBackground";

import Hero from "./components/Hero";
import Professional from "./components/Professional";
import Skills from "./components/Skills";
import Project from "./components/Project";

export default function Home() {
  return (
    <div className="relative z-10">
      <Grid />
      <Navbar />
      <Hero />

      <Professional />

      <Skills />

      <Project />
    </div>
  );
}
