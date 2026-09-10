import { FiArrowUpRight } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-marquee" aria-hidden="true">またね</div>
      <div className="footer-frame">
        <p>Goodbye—see you soon. Kamalveer · © {new Date().getFullYear()} · Available for building things</p>
        <div className="footer-links">
          <a href="mailto:kamalhara7@gmail.com">Hello@Kamalveer <FiArrowUpRight /></a>
          <a href="https://github.com/kamalhara" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/kamalveer-singh-bb7250335/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
