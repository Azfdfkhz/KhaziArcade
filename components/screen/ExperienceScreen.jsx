'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';

export default function ExperienceScreen() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
        <span>KHΔZ</span>
        <span className="text-[#F4C96B]">04/05</span>
      </div>

      {/* Screen Title */}
      <div className="text-center mt-1">
        <h2 className="font-arcade text-[#F4C96B] text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          HIGH SCORE
        </h2>
      </div>

      {/* Timeline List */}
      <div className="my-auto py-1 max-w-[320px] mx-auto w-full space-y-2">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.year}
            className="flex items-start gap-2.5 p-1.5 rounded-lg bg-black/10 border border-white/5 hover:border-[#63C8CC]/40 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            {/* Year Badge */}
            <div className="font-arcade text-[8px] text-[#F4C96B] bg-[#237F85] px-1.5 py-0.5 rounded border border-[#63C8CC]/40 flex-shrink-0">
              {exp.year}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-arcade text-[8px] sm:text-[9px] text-[#FFF3D6] font-bold tracking-wide truncate">
                {exp.title}
              </h4>
              <p className="text-[8px] text-[#63C8CC] font-semibold truncate">
                {exp.place}
              </p>
              <p className="text-[7.5px] text-[#FFF3D6]/60 line-clamp-1 leading-normal">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer controls hint */}
      <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[9px] text-[#FFF3D6]/50 font-arcade tracking-wider border-t border-[#63C8CC]/20 pt-2">
        <span>↑ ↓ MOVE</span>
        <span>● SELECT</span>
        <span>◀ BACK</span>
      </div>
    </div>
  );
}
