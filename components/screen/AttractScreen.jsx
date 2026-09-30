'use client';

// Layar attract-mode yang tampil langsung di layar arcade 3D sebelum START.
export default function AttractScreen({ onStart }) {
  return (
    <button
      type="button"
      onClick={onStart}
      aria-label="Press start"
      className="relative w-full h-full flex flex-col items-center justify-center text-center bg-[#15484c] font-arcade cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F4C96B]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#63C8CC]/15 to-transparent pointer-events-none" />

      <p className="text-[#63C8CC] text-[28px] tracking-[0.2em] mb-5 font-bold">
        WELCOME TO
      </p>
      <h2 className="text-[#FFF3D6] text-[46px] leading-tight tracking-[0.08em] mb-12 font-bold group-hover:text-[#F4C96B] transition-colors">
        MY PORTFOLIO
      </h2>
      <div className="px-8 py-4 rounded-xl bg-black/50 border-[3px] border-[#F4C96B] text-[#F4C96B] text-[32px] tracking-[0.2em] animate-blink font-bold">
        PRESS START
      </div>
      <span className="text-[20px] text-[#FFF3D6]/80 mt-8 tracking-widest font-mono">
        [ CLICK / TAP / ENTER ]
      </span>
    </button>
  );
}
