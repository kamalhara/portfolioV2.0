import Image from "next/image";
import Navbar from "./components/Navbar";
import Grid from "./components/GridBackground";

export default function Home() {
  return (
    <div>
      <Grid />
      <Navbar />
      <main className="z-50 relative max-w-6xl ml-40 mt-48 px-6 py-20">
        <h1 className="text-7xl font-bold">
          Kamalveer<span className="text-green-300">Singh</span>
        </h1>
      </main>
    </div>
  );
}
