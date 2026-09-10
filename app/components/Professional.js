import Image from "next/image";
import { experiences } from "../data/experience";

export default function Professional() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="chapter-section">
      <div className="chapter-heading">
        <h2 id="experience-title">Experience</h2>
        <p>work in production</p>
      </div>

      {experiences.map((experience) => (
        <article className="experience-sheet" key={`${experience.company}-${experience.role}`}>
          <div className="experience-title-block">
            <p>Current role</p>
            <h3>{experience.role}</h3>
            <div className="company-line">
              <Image src={experience.logo} alt="" width={42} height={42} />
              <span><strong>{experience.company.trim()}</strong><small>{experience.duration}</small></span>
            </div>
          </div>
          <div className="experience-copy">
            <p>{experience.description}</p>
            <p>
              The job sits across product implementation, mobile performance,
              backend integration, and the small reliability details users only
              notice when they fail.
            </p>
            <ul aria-label="Technologies used">
              {experience.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        </article>
      ))}
    </section>
  );
}
