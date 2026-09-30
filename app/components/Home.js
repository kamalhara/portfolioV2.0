import PortfolioWidgets from "@/app/ui/Widgets";
import PortfolioDock from "./Dock";
import AboutSection from "./home/AboutSection";
import ActivitySection from "./home/ActivitySection";
import ExperienceSection from "./home/ExperienceSection";
import HomeFooter from "./home/HomeFooter";
import InterfacesSection from "./home/InterfacesSection";
import IntroSection from "./home/IntroSection";
import ProjectsSection from "./home/ProjectsSection";
import StackSection from "./home/StackSection";

export default function Home() {
  return (
    <div className="home-page min-h-screen bg-background text-[15.7px] leading-[1.64] tracking-[-0.025em] text-foreground [font-family:var(--font-geist)] max-[480px]:text-[15.5px]">
      <main
        id="main-content"
        className="mx-auto w-[min(800px,calc(100%-50px))] pt-24.75 pb-40 max-[700px]:pt-13.5"
      >
        <IntroSection />
        <PortfolioWidgets />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <StackSection />
        <InterfacesSection />
        <ActivitySection />
        <HomeFooter />
      </main>
      <PortfolioDock />
    </div>
  );
}
