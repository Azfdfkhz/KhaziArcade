'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '@/data/skills';
import { useTrigger } from '@/hooks/useTrigger';
import ScreenFrame from '@/components/ui/ScreenFrame';

// Nama file harus persis sama dengan di /public/images (case-sensitive di Linux/Vercel).
const images = ['/images/Profile-1.jpeg', '/images/Profile-2.jpeg'];

export default function AboutScreen({ horizontalNavTrigger, onBack }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState({});

  const cycle = () => setImageIndex((p) => (p + 1) % images.length);
  useTrigger(horizontalNavTrigger, cycle);

  return (
    <ScreenFrame
      index="01 / 05"
      title="CHARACTER SELECT"
      subtitle="PLAYER PROFILE"
      footer={[
        { label: '◀ ▶ CHANGE', onClick: cycle },
        { label: '● ACTIVE', accent: true },
        { label: '◀ BACK', onClick: onBack },
      ]}
    >
      <div className="flex items-center gap-5 py-2">
        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-[116px] aspect-[3/4] shrink-0"
        >
          <div className="absolute inset-0 bg-[#63C8CC] p-[3px]">
            <div className="relative w-full h-full overflow-hidden bg-[#237F85]">
              <AnimatePresence mode="wait">
                {!imageError[imageIndex] ? (
                  <motion.img
                    key={images[imageIndex]}
                    src={images[imageIndex]}
                    alt="Foto Khaz"
                    onError={() => setImageError((p) => ({ ...p, [imageIndex]: true }))}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <motion.div
                    key={`fallback-${imageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gradient-to-b from-[#237F85] to-[#15484c]"
                  >
                    <span className="text-4xl">🧑‍💻</span>
                    <span className="font-arcade text-[10px] text-[#F4C96B]">KHAZ</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="absolute top-1 left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#F4C96B]" />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#F4C96B]" />
              <span className="absolute bottom-1 left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#F4C96B]" />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#F4C96B]" />
            </div>
          </div>

          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#15484c] border-2 border-[#63C8CC] px-2 py-1">
            <span className="font-arcade text-[9px] text-[#63C8CC]">PLAYER 01</span>
          </div>

          <div className="absolute -right-2.5 top-2 flex flex-col gap-1">
            {images.map((src, i) => (
              <span
                key={src}
                className={`w-2 h-2 border border-[#FFF3D6] ${i === imageIndex ? 'bg-[#F4C96B]' : ''}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="font-arcade text-[10px] tracking-wider text-[#63C8CC]">CHARACTER NAME</p>
          <h3 className="font-arcade text-[24px] tracking-wider text-[#FFF3D6] mt-1.5">KHΔZ</h3>
          <p className="font-arcade text-[11px] text-[#F4C96B] mt-1.5">CREATIVE DEVELOPER</p>
          <p className="text-[12px] leading-relaxed text-[#FFF3D6]/90 mt-3">
            Developer yang suka membangun hal baru dengan teknologi, desain, 3D, dan kreativitas.
          </p>
        </div>
      </div>

      {/* Loadout: diambil dari data skills (menggantikan bar statistik yang angkanya karangan) */}
      <div className="mt-3 rounded-md border border-[#63C8CC]/25 bg-black/15 px-3 py-2">
        <p className="font-arcade text-[10px] tracking-wider text-[#63C8CC] mb-1.5">LOADOUT</p>
        <ul className="flex flex-wrap gap-1.5">
          {skills.slice(0, 6).map((s) => (
            <li
              key={s.name}
              className="text-[11px] px-2 py-0.5 rounded border border-[#63C8CC]/50 text-[#FFF3D6]"
            >
              {s.name}
            </li>
          ))}
        </ul>
      </div>
    </ScreenFrame>
  );
}
