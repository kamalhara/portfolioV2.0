function TerminalDec() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2  bg-card/80 backdrop-blur-sm border border-gray-700 mb-6 md:mb-8 font-mono text-xs md:text-sm   ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-terminal w-3 h-3 md:w-4 md:h-4 text-primary text-[#2EA353]"
      >
        <polyline points="4 17 10 11 4 5" className="text-primary"></polyline>
        <line x1="12" x2="20" y1="19" y2="19" className="text-[#2EA353]"></line>
      </svg>
      <span className=" text-gray-500 ">~/portfolio</span>
      <span className="text-[#2EA353]">$</span>
      <span className=" ">whoami</span>
      <span className="w-1.5 h-3 md:w-2 md:h-4 bg-primary animate-pulse bg-[#2EA353] "></span>
    </div>
  );
}

export default TerminalDec;
