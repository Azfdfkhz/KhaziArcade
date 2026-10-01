'use client';

import { motion } from 'framer-motion';
import ScreenFrame from '@/components/ui/ScreenFrame';

const menuItems = [
  { id: 'about', label: 'ABOUT ME', icon: '📁' },
  { id: 'projects', label: 'PROJECTS', icon: '📁' },
  { id: 'skills', label: 'SKILLS', icon: '📁' },
  { id: 'experience', label: 'EXPERIENCE', icon: '📁' },
  { id: 'contact', label: 'CONTACT', icon: '📁' },
];

export default function ArcadeMenu({ selectedIndex, onSelect }) {
  return (
    <ScreenFrame
      index="MENU"
      title="SELECT CATEGORY"
      footer={[{ label: '↑ ↓ MOVE' }, { label: '● SELECT', accent: true }, { label: '◀ BACK' }]}
    >
      <div className="w-full max-w-[340px] mx-auto space-y-2 py-2">
        {menuItems.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onSelect(index)}
              aria-current={isSelected ? 'true' : undefined}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border transition-colors duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-[#237F85] text-[#FFF3D6] border-[#63C8CC]/70 shadow-md'
                  : 'text-[#FFF3D6]/75 border-transparent hover:bg-white/5 hover:text-[#FFF3D6]'
              }`}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`w-3 text-[11px] ${isSelected ? 'text-[#F4C96B]' : 'opacity-0'}`}
                >
                  ➜ 
                </span>
                <span aria-hidden="true" className="text-base leading-none">
                  {item.icon}
                </span>
                <span className="font-arcade text-[12px] tracking-wider">{item.label}</span>
              </span>
              <span className="font-arcade text-[10px] text-[#63C8CC]/80">
                0{index + 1}/05
              </span>
            </motion.button>
          );
        })}
      </div>
    </ScreenFrame>
  );
}
