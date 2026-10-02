'use client';

import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const DPAD = [
  { dir: 'up', Icon: FaChevronUp, area: 'col-start-2 row-start-1' },
  { dir: 'left', Icon: FaChevronLeft, area: 'col-start-1 row-start-2' },
  { dir: 'right', Icon: FaChevronRight, area: 'col-start-3 row-start-2' },
  { dir: 'down', Icon: FaChevronDown, area: 'col-start-2 row-start-3' },
];

export default function ControlDeck({ isMenu, onDir, onSelect, onBack }) {
  return (
    <div className="fixed z-30 bottom-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 md:bottom-6 [@media(max-height:480px)]:left-auto [@media(max-height:480px)]:translate-x-0 [@media(max-height:480px)]:right-3 pointer-events-auto flex items-center gap-4 px-3 py-2 rounded-2xl bg-[#263238]/85 backdrop-blur-md border border-white/10 shadow-lg">
      <div className="grid grid-rows-3 gap-2">
        {DPAD.map(({ dir, Icon, area }) => (
          <button
            key={dir}
            onClick={() => onDir(dir)}
            aria-label={dir}
            className={`${area} w-10 h-10 rounded-lg bg-[#237F85] text-[#FFF3D6] border border-[#63C8CC]/40 flex items-center justify-center text-sm active:scale-90 hover:bg-[#2a939a] transition-all cursor-pointer`}
          >
            <Icon aria-hidden="true" className="w-4 h-4" />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onSelect}
          aria-label="Select"
          className="px-4 py-2.5 rounded-full bg-[#63C8CC] text-[#237F85] font-arcade text-[10px] font-bold active:scale-95 shadow-md flex items-center gap-1.5 hover:bg-[#7be0e4] transition-all cursor-pointer"
        >
          <span>●</span>
          <span>SELECT</span>
        </button>
        <button
          onClick={onBack}
          aria-label={isMenu ? 'Exit' : 'Back'}
          className="px-4 py-2.5 rounded-full bg-[#F29A8D] text-[#263238] font-arcade text-[10px] font-bold active:scale-95 shadow-md flex items-center gap-1.5 hover:bg-[#f6b0a5] transition-all cursor-pointer"
        >
          <FaChevronLeft aria-hidden="true" className="w-3 h-3" />
          <span>{isMenu ? 'EXIT' : 'BACK'}</span>
        </button>
      </div>
    </div>
  );
}