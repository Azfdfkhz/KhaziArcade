'use client';

import { motion } from 'framer-motion';

const stats = [
  { name: 'CODE', filled: 18, total: 20 },
  { name: 'DESIGN', filled: 14, total: 20 },
  { name: '3D', filled: 12, total: 20 },
  { name: 'PROBLEM SOLVING', filled: 17, total: 20 },
];

export default function AboutScreen() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
        <span>KHΔZ</span>
        <span className="text-[#F4C96B]">01/05</span>
      </div>

      {/* Screen Title */}
      <div className="text-center mt-1 mb-2">
        <h2 className="font-arcade text-[#F4C96B] text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          CHARACTER SELECT
        </h2>
      </div>

      {/* Character Profile Card */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 my-auto px-1 sm:px-3">
        {/* Avatar Box */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#237F85] border-2 border-[#63C8CC] flex flex-col items-center justify-center p-1.5 shadow-inner flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#63C8CC]/10 to-transparent" />
          {/* Pixel Developer Avatar */}
          <div className="text-3xl sm:text-4xl filter drop-shadow">
            🧑‍💻
          </div>
          <span className="font-arcade text-[6px] text-[#FFF3D6]/70 mt-1 uppercase tracking-widest">
            LVL 99
          </span>
        </div>

        {/* Bio & Details */}
        <div className="text-left flex-1 min-w-0">
          <h3 className="font-arcade text-sm sm:text-base text-[#FFF3D6] font-bold tracking-wider">
            KHΔZ
          </h3>
          <p className="text-[#63C8CC] text-[10px] sm:text-xs font-semibold tracking-wide mb-1.5">
            Creative Developer
          </p>
          <p className="text-[#FFF3D6]/80 text-[9px] sm:text-[10px] leading-relaxed">
            Saya adalah seorang developer yang suka membangun hal-hal baru, memadukan teknologi, desain, dan kreativitas untuk menciptakan pengalaman yang bermakna.
          </p>
        </div>
      </div>

      {/* RPG Stat Bars */}
      <div className="space-y-1.5 px-2 sm:px-4 py-2 bg-black/15 rounded-lg border border-white/5 my-1">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center justify-between text-[8px] sm:text-[9px]">
            <span className="font-arcade text-[#63C8CC] w-28 sm:w-32 tracking-wider truncate">
              {stat.name}
            </span>
            <div className="flex items-center gap-0.5 font-mono text-[9px] text-[#F4C96B]">
              {Array.from({ length: stat.total }).map((_, i) => (
                <span
                  key={i}
                  className={`inline-block w-1.5 h-2 rounded-[1px] ${
                    i < stat.filled ? 'bg-[#63C8CC]' : 'bg-[#FFF3D6]/15'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer controls hint */}
      <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[9px] text-[#FFF3D6]/50 font-arcade tracking-wider border-t border-[#63C8CC]/20 pt-2">
        <span>◀ ▶ CHANGE</span>
        <span>● SELECT</span>
      </div>
    </div>
  );
}
