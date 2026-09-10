import Link from "next/link";
import { mainProjects } from "../data/project";

export default function Project() {
  return (
    <section id="work" aria-labelledby="work-title" className="chapter-section work-chapter">
      <div className="chapter-heading">
        <h2 id="work-title">Selected work</h2>
        <p>{String(mainProjects.length).padStart(2, "0")} featured</p>
      </div>

      <ol className="work-list">
        {mainProjects.map((project, index) => (
          <li key={project.slug}>
            <Link href={`/project/${project.slug}`} className="work-row">
              <span className="work-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="work-name">
                <strong>{project.title}</strong>
                <em>{project.description}</em>
              </span>
              <span className="work-arrow">⟶</span>
              <span className="work-stack"><i />{project.technologies}</span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="chapter-outro">
        <p>
          Each project opens as a practical case study—the product, the system,
          and the engineering decisions that hold it together.
        </p>
        <Link href="/project">Explore all projects <span>↗</span></Link>
      </div>
    </section>
  );
}
