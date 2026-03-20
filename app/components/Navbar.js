function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border cz-color-15921906 cz-color-1511693 cz-color-3615781 py-4 ">
      <div className="max-w-6xl mx-auto px-6 py-4 cz-color-15921906 cz-color-3615781">
        <ul className="flex items-center justify-center gap-8 cz-color-15921906 cz-color-3615781">
          <li className="cz-color-15921906 cz-color-3615781">
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm cz-color-9207155 cz-color-3615781"
            >
              About
            </a>
          </li>
          <li className="cz-color-15921906 cz-color-3615781">
            <a
              href="#professional"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm cz-color-9207155 cz-color-3615781"
            >
              Professional
            </a>
          </li>
          <li className="cz-color-15921906 cz-color-3615781">
            <a
              href="#projects"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm cz-color-9207155 cz-color-3615781"
            >
              Projects
            </a>
          </li>
          <li className="cz-color-15921906 cz-color-3615781">
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm cz-color-9207155 cz-color-3615781"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
