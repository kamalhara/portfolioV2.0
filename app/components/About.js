export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="chapter-section">
      <div className="chapter-heading">
        <h2 id="about-title">About</h2>
        <p>the person behind the work</p>
      </div>

      <div className="about-grid">
        <div>
          <p className="micro-label">About</p>
          <h3>I care about the point where software meets real life.</h3>
        </div>
        <div className="about-copy">
          <p>
            I&apos;m a full-stack and mobile engineer who likes following a
            feature all the way through—from the first interaction to the data,
            infrastructure, and edge cases underneath it.
          </p>
          <p>
            My recent work spans React Native products, Next.js interfaces,
            Node.js services, authentication, real-time messaging, maps, and
            production operations.
          </p>
          <p>
            I value direct communication, readable systems, and details that
            make a product feel considered rather than merely complete.
          </p>
          <em>Build clearly. Learn from what breaks.</em>
        </div>
      </div>
    </section>
  );
}
