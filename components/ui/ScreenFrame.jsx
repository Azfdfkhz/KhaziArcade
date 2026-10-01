'use client';

// Kerangka bersama semua layar arcade. Ukuran layar logis 500x450 lalu
// di-scale mengikuti mesh 3D, jadi ukuran teks di sini sengaja tidak memakai
// breakpoint `sm:` (breakpoint mengikuti browser, bukan layar arcade) dan
// tidak ada teks di bawah 10px agar tetap terbaca saat diperkecil di mobile.
export default function ScreenFrame({
  index,
  title,
  subtitle,
  footer = [],
  children,
  className = '',
}) {
  return (
    <div className="w-full h-full flex flex-col px-6 py-5 text-[#FFF3D6] font-sans select-none">
      <header className="flex items-center justify-between border-b border-[#63C8CC]/25 pb-2 font-arcade text-[11px] tracking-wider">
        <span className="text-[#63C8CC]">KHΔZ</span>
        <span className="text-[#F4C96B]">{index}</span>
      </header>

      {title && (
        <div className="text-center pt-3 pb-1">
          <h2 className="font-arcade text-[#F4C96B] text-[14px] tracking-[0.18em] uppercase">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1.5 text-[11px] tracking-wide text-[#FFF3D6]/65">{subtitle}</p>
          )}
        </div>
      )}

      <div className={`flex-1 min-h-0 flex flex-col justify-center ${className}`}>{children}</div>

      {footer.length > 0 && (
        <footer className="flex items-center justify-center gap-5 border-t border-[#63C8CC]/25 pt-2.5 font-arcade text-[10px] tracking-wider">
          {footer.map(({ label, onClick, accent }) => {
            const tone = accent ? 'text-[#F4C96B]' : 'text-[#FFF3D6]/70';
            return onClick ? (
              <button
                key={label}
                type="button"
                onClick={onClick}
                className={`${tone} hover:text-[#FFF3D6] transition-colors cursor-pointer`}
              >
                {label}
              </button>
            ) : (
              <span key={label} className={tone}>
                {label}
              </span>
            );
          })}
        </footer>
      )}
    </div>
  );
}
