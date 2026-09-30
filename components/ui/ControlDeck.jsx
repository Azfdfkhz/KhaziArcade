'use client';

const DPAD = [
  { dir: 'up', label: '▲', area: 'col-start-2 row-start-1' },
  { dir: 'left', label: '◀', area: 'col-start-1 row-start-2' },
  { dir: 'right', label: '▶', area: 'col-start-3 row-start-2' },
  { dir: 'down', label: '▼', area: 'col-start-2 row-start-3' },
];

// Panel kontrol kompak (untuk touch/mouse). Melayang di sudut,
// tidak menutupi arcade 3D.
export default function ControlDeck({ isMenu, onDir, onSelect, onBack }) {
  return (
    <div className="fixed z-30 bottom-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 md:bottom-6 pointer-events-auto flex items-center gap-4 px-3 py-2 rounded-2xl bg-[#263238]/85 backdrop-blur-md border border-white/10 shadow-lg">
      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        {DPAD.map(({ dir, label, area }) => (
          <button
            key={dir}
            onClick={() => onDir(dir)}
            aria-label={dir}
            className={`${area} w-8 h-8 rounded-lg bg-[#237F85] text-[#FFF3D6] border border-[#63C8CC]/40 flex items-center justify-center text-xs active:scale-90 hover:bg-[#2a939a] transition-all cursor-pointer`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={onSelect}
          aria-label="Select"
          className="px-3.5 py-2 rounded-full bg-[#63C8CC] text-[#237F85] font-arcade text-[9px] font-bold active:scale-95 shadow-md flex items-center gap-1.5 hover:bg-[#7be0e4] transition-all cursor-pointer"
        >
          <span>●</span>
          <span>SELECT</span>
        </button>
        <button
          onClick={onBack}
          aria-label={isMenu ? 'Exit' : 'Back'}
          className="px-3.5 py-2 rounded-full bg-[#F29A8D] text-white font-arcade text-[9px] font-bold active:scale-95 shadow-md flex items-center gap-1.5 hover:bg-[#f6b0a5] transition-all cursor-pointer"
        >
          <span>◀</span>
          <span>{isMenu ? 'EXIT' : 'BACK'}</span>
        </button>
      </div>
    </div>
  );
}
