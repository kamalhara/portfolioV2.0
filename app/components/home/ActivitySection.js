import PortfolioActivity from "../Activity";

export default function ActivitySection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="activity"
      aria-labelledby="activity-heading"
    >
      <h2
        className="mb-6.25 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="activity-heading"
      >
        Activity
      </h2>
      <PortfolioActivity />
    </section>
  );
}
