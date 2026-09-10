import Heading from "../ui/Heading";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mb-28 pt-8">
      <Heading label1={"03 About"} label2={"the person behind the index"} />

      <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              About
            </p>
            <p className="mt-4 max-w-[24ch] text-4xl font-medium leading-snug tracking-tight text-ink-text">
              I care about the point where software meets real life.
            </p>
          </div>
        </div>
        <div className="space-y-5 text-md leading-relaxed text-ink-text/80 md:col-span-6 md:col-start-7">
          <p className="max-w-[56ch]">
            I&apos;m a full-stack and mobile engineer who likes following a
            feature all the way through—from the first interaction to the data,
            infrastructure, and edge cases underneath it.
          </p>
          <p className="max-w-[56ch]">
            My recent work spans React Native products, Next.js interfaces,
            Node.js services, authentication, real-time messaging, maps, and
            production operations.
          </p>
          <p className="max-w-[56ch]">
            I value direct communication, readable systems, and details that
            make a product feel considered rather than merely complete.
          </p>
          <p className="max-w-[56ch] font-serif italic text-ink-text text-base tracking-wider">
            Still learning. Still building.
          </p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-2 md:col-start-7">
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Working deeply in
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-text/80">
            <li>Mobile product engineering</li>
            <li>Real-time systems</li>
            <li>Backend architecture</li>
            <li>Authentication and security</li>
          </ul>
        </div>
        <div className="md:col-span-3 md:col-start-9">
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Curious about
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-text/80">
            <li>Distributed systems</li>
            <li>Reliable infrastructure</li>
            <li>Offline-first products</li>
            <li>Human-centered software</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
