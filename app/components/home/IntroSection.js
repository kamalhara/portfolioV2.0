import { portfolio } from "@/app/data/portfolio";
import { EmailCopy } from "@/app/ui/Widgets";

export default function IntroSection() {
  return (
    <header className="home-intro">
      <h1 className="text-[19.6px] leading-[1.4] font-medium tracking-[-0.035em]">
        {portfolio.name}
      </h1>
      <p className="text-muted-foreground">{portfolio.role}</p>
      <div className="mt-7.5">
        <h2 className="text-[15.7px] leading-[1.6] font-medium">Currently</h2>
        <p className="mt-1.75 text-muted-foreground">{portfolio.currently}</p>
      </div>
      <EmailCopy />
    </header>
  );
}
