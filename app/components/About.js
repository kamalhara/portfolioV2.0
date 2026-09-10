export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mb-28 border-t border-paper-border pt-8">
      <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-ink-muted"><h2 id="about-title" className="font-normal">03 About</h2><span>the person behind the index</span></div>
      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="space-y-4 md:col-span-5"><p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">About</p><h3 className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">I care about the point where software meets real life.</h3></div>
        <div className="space-y-5 text-sm leading-relaxed text-ink-muted md:col-span-7"><p>I&apos;m a full-stack and mobile engineer who likes following a feature all the way through—from the first interaction to the data, infrastructure, and edge cases underneath it.</p><p>My recent work spans React Native products, Next.js interfaces, Node.js services, authentication, real-time messaging, maps, and production operations.</p><p>I value direct communication, readable systems, and details that make a product feel considered rather than merely complete.</p><p className="font-serif text-base italic text-ink-text">Build clearly. Learn from what breaks.</p></div>
      </div>
      <div className="grid grid-cols-1 gap-8 border-t border-paper-border pt-8 sm:grid-cols-2">
        <div><h4 className="mb-4 font-mono text-[11px] font-normal uppercase tracking-wider text-ink-faint">Working deeply in</h4><ul className="space-y-2 text-xs font-medium"><li>Mobile product engineering</li><li>Real-time systems</li><li>Backend architecture</li><li>Authentication and security</li></ul></div>
        <div><h4 className="mb-4 font-mono text-[11px] font-normal uppercase tracking-wider text-ink-faint">Curious about</h4><ul className="space-y-2 text-xs font-medium"><li>Distributed systems</li><li>Reliable infrastructure</li><li>Offline-first products</li><li>Human-centered software</li></ul></div>
      </div>
    </section>
  );
}
