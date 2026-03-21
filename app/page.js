import Navbar from "./components/Navbar";
import Grid from "./components/GridBackground";

import Hero from "./components/Hero";
import Professional from "./components/Professional";
import Skills from "./components/Skills";
import Project from "./components/Project";

export default function Home() {
  return (
    <div>
      <Grid />
      <Navbar />
      <Hero />

      <Professional />

      <Skills />

      <Project />
    </div>
  );
}
