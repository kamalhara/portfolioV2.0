export default function IPhoneFrame({ children }) {
  return (
    <div className="relative mx-auto w-full">
      {/* Outer body */}
      <div
        className="relative overflow-hidden rounded-[2.5rem] border-[3px] border-[#1a1a1a] bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_4px_20px_rgba(0,0,0,0.15)]"
        style={{ padding: "6px" }}
      >
        {/* Dynamic island */}
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 flex justify-center pt-2.5">
          <div className="h-5.5 w-22.5 rounded-full bg-[#1a1a1a]" />
        </div>

        {/* Screen */}
        <div className="relative overflow-hidden rounded-4xl bg-black">
          {children}
        </div>

        {/* Home indicator */}
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 flex justify-center pb-1.5">
          <div className="h-1 w-25 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Side buttons — right (power) */}
      <div className="absolute -right-1.25 top-[22%] h-12.5 w-0.75 rounded-r-sm bg-[#2a2a2a]" />

      {/* Side buttons — left (volume up, volume down, mute) */}
      <div className="absolute -left-1.25 top-[16%] h-6 w-0.75 rounded-l-sm bg-[#2a2a2a]" />
      <div className="absolute -left-1.25 top-[24%] h-10 w-0.75 rounded-l-sm bg-[#2a2a2a]" />
      <div className="absolute -left-1.25 top-[33%] h-10 w-0.75 rounded-l-sm bg-[#2a2a2a]" />
    </div>
  );
}
