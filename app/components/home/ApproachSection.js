import { workingApproach } from "@/app/data/portfolio";

export default function ApproachSection() {
  return (
    <section
      className="mt-15.5 scroll-mt-8 max-[700px]:mt-14.75"
      id="approach"
      aria-labelledby="approach-heading"
    >
      <h2
        className="mb-2 text-[15.7px] leading-[1.6] font-medium tracking-[-0.025em]"
        id="approach-heading"
      >
        How I work
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        From the first user flow to the details that make it feel right.
      </p>
      <ol className="approach-flow">
        {workingApproach.map((step, index) => (
          <li className="approach-step" key={step.title}>
            <span className="approach-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="mb-2 text-sm font-medium leading-normal">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.75] text-muted-foreground">
                {step.description}
              </p>
              <p className="mt-4 text-[10px] leading-[1.6] text-muted-foreground [font-family:var(--font-geist-mono)]">
                {step.focus}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
