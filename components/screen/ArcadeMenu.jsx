'use client';

import { motion } from 'framer-motion';

const menuItems = [
  { id: 'about', label: 'ABOUT ME', icon: '📁', number: '01/05' },
  { id: 'projects', label: 'PROJECTS', icon: '📁', number: '02/05' },
  { id: 'skills', label: 'SKILLS', icon: '📁', number: '03/05' },
  { id: 'experience', label: 'EXPERIENCE', icon: '📁', number: '04/05' },
  { id: 'contact', label: 'CONTACT', icon: '📁', number: '05/05' },
];

export default function ArcadeMenu({ selectedIndex, onSelect }) {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 text-[#FFF3D6] select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
        <span>KHΔZ</span>
        <span className="text-[#F4C96B]">MENU</span>
      </div>

      {/* Title */}
      <div className="text-center my-auto py-2">
        <h2 className="font-arcade text-[#F4C96B] text-xs sm:text-sm tracking-[0.25em] mb-4 sm:mb-6 uppercase">
          SELECT CATEGORY
        </h2>

        {/* Menu Items */}
        <div className="space-y-1.5 sm:space-y-2 w-full max-w-[280px] sm:max-w-[320px] mx-auto">
          {menuItems.map((item, index) => {
            const isSelected = selectedIndex === index;
            return (
              <motion.button
                key={item.id}
                onClick={() => onSelect(index)}
                className={`w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all duration-150 flex items-center justify-between group cursor-pointer ${
                  isSelected
                    ? 'bg-[#237F85] text-[#FFF3D6] font-bold shadow-md border border-[#63C8CC]/60'
                    : 'text-[#FFF3D6]/70 hover:text-[#FFF3D6] hover:bg-white/5 border border-transparent'
                }`}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] ${isSelected ? 'text-[#63C8CC]' : 'opacity-0'}`}>
                    ▶
                  </span>
                  <span className="text-sm">{item.icon}</span>
                  <span className="font-arcade text-[10px] sm:text-xs tracking-wider">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#63C8CC]/70 opacity-60 group-hover:opacity-100">
                  {item.number}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer controls hint */}
      <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[9px] text-[#FFF3D6]/50 font-arcade tracking-wider border-t border-[#63C8CC]/20 pt-2.5">
        <span>↑ ↓ MOVE</span>
        <span>● SELECT</span>
        <span>◀ BACK</span>
      </div>
    </div>
  );
}
