'use client';

// Layar attract-mode yang tampil di layar arcade 3D sebelum START.
// Ukuran disesuaikan dengan layar logis 500px (sebelumnya "MY PORTFOLIO"
// 46px lebih lebar dari layarnya sehingga terpotong).
export default function AttractScreen({ onStart }) {
  return (
    <button
      type="button"
      onClick={onStart}
      aria-label="Press start"
      className="relative w-full h-full flex flex-col items-center justify-center text-center bg-[#15484c] font-arcade cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#F4C96B]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#63C8CC]/15 to-transparent pointer-events-none" />

      <p className="text-[#63C8CC] text-[16px] tracking-[0.25em] mb-4">WELCOME TO</p>
      <h2 className="text-[#FFF3D6] text-[30px] leading-tight tracking-[0.06em] mb-10 group-hover:text-[#F4C96B] transition-colors">
        MY PORTFOLIO
      </h2>
      <div className="px-7 py-3.5 rounded-xl bg-black/40 border-[3px] border-[#F4C96B] text-[#F4C96B] text-[20px] tracking-[0.15em] animate-blink">
        PRESS START
      </div>
      <span className="font-sans text-[13px] text-[#FFF3D6]/80 mt-7 tracking-widest">
        CLICK · TAP · ENTER
      </span>
    </button>
  );
}
