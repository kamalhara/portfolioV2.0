function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50  bg-[#0C1117]/80 backdrop-blur-md   py-2 ">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-8  text-gray-500 font-semibold ">
          <li className="">
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-md hover:text-[#2CB35A] font-semibold "
            >
              About
            </a>
          </li>
          <li className="">
            <a
              href="#professional"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-md hover:text-[#2CB35A] font-semibold "
            >
              Professional
            </a>
          </li>
          <li className="">
            <a
              href="#projects"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-md hover:text-[#2CB35A] font-semibold "
            >
              Projects
            </a>
          </li>
          <li className="">
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors font-mono text-md hover:text-[#2CB35A] font-semibold "
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
