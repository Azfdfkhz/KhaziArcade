'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';

export default function SkillsScreen() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
        <span>KHΔZ</span>
        <span className="text-[#F4C96B]">03/05</span>
      </div>

      {/* Screen Title */}
      <div className="text-center mt-1">
        <h2 className="font-arcade text-[#F4C96B] text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          POWER UPS
        </h2>
      </div>

      {/* 8 Collectible Power-Up Capsules (2 rows of 4) */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 my-auto px-1 sm:px-2 max-w-[340px] mx-auto w-full">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#237F85] border border-[#63C8CC]/40 hover:border-[#F4C96B] hover:bg-[#2a939a] transition-all cursor-default shadow-md group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04 }}
            whileHover={{ y: -3, scale: 1.05 }}
          >
            {/* Icon Bubble */}
            <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center mb-1 text-sm font-bold text-[#FFF3D6] group-hover:text-[#F4C96B] transition-colors border border-white/10">
              {skill.iconType === 'text' ? (
                <span className="font-bold text-xs">{skill.icon}</span>
              ) : (
                <span className="text-sm">{skill.icon}</span>
              )}
            </div>

            {/* Skill Name */}
            <span className="font-arcade text-[7px] text-[#FFF3D6] text-center leading-tight tracking-wider truncate w-full">
              {skill.name}
            </span>
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
