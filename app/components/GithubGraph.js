"use client";

import dynamic from "next/dynamic";
import { FiArrowUpRight } from "react-icons/fi";
import { skillCategories } from "../data/skills";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((module) => module.GitHubCalendar),
  { ssr: false },
);

export default function GithubGraph() {
  return (
    <section id="activity" aria-labelledby="activity-title" className="chapter-section activity-chapter">
      <div className="chapter-heading">
        <h2 id="activity-title">Activity</h2>
        <p>evidence, not claims</p>
      </div>

      <div className="activity-heading">
        <div><p className="micro-label">GitHub activity</p><h3>A record of showing up.</h3></div>
        <a href="https://github.com/kamalhara" target="_blank" rel="noopener noreferrer">
          @kamalhara <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="calendar-wrap" aria-label="Kamalveer Singh's GitHub contribution calendar">
        <GitHubCalendar
          username="kamalhara"
          colorScheme="light"
          theme={{ light: ["#e8e8e1", "#d9b3a7", "#c98370", "#b75c42", "#843923"] }}
          blockSize={11}
          blockMargin={4}
          blockRadius={0}
          fontSize={12}
        />
      </div>

      <div id="skills" className="toolbox-heading">
        <div><p className="micro-label">Toolbox</p><h3>What I reach for.</h3></div>
        <p>Grouped by use, not proficiency bars.</p>
      </div>
      <div className="toolbox-grid">
        {skillCategories.map((category, index) => (
          <article key={category.title}>
            <header><h4>{category.title}</h4><span>{String(index + 1).padStart(2, "0")}</span></header>
            <ul>{category.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
