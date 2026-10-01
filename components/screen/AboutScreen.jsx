'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { name: 'CODE', filled: 18, total: 20 },
  { name: 'DESIGN', filled: 14, total: 20 },
  { name: '3D', filled: 12, total: 20 },
  { name: 'SOLVING', filled: 17, total: 20 },
];

const images = [
  '/images/profile-1.jpg',
  '/images/profile-2.jpg',
];

export default function AboutScreen({ horizontalNavTrigger, onBack }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    if (!horizontalNavTrigger) return;
    if (horizontalNavTrigger.direction === 'left' || horizontalNavTrigger.direction === 'right') {
      setImageIndex((prev) => (prev + 1) % images.length);
    }
  }, [horizontalNavTrigger]);

  // Ganti gambar otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#263238] text-[#FFF3D6] select-none">

      {/* ================= CRT ================= */}

      <div
        className="absolute inset-0 pointer-events-none z-50 opacity-[0.035]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, #FFF3D6 3px)',
        }}
      />

      {/* ================= MAIN ================= */}

      <div className="relative z-10 w-full h-full flex flex-col px-4 py-3 sm:px-6 sm:py-4">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between border-b-2 border-[#63C8CC]/30 pb-2">

          <div className="flex items-center gap-2">

            <span className="font-arcade text-[12px] sm:text-sm font-bold text-[#63C8CC]">
              KHΔZ
            </span>

            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#FFF3D6]/60">
              / ABOUT
            </span>

          </div>

          <span className="font-arcade text-[9px] sm:text-[10px] font-bold text-[#F4C96B]">
            01 / 05
          </span>

        </div>


        {/* ================= TITLE ================= */}

        <div className="text-center py-1.5">

          <h2 className="font-arcade text-[12px] sm:text-sm font-bold tracking-[0.12em] text-[#F4C96B]">
            CHARACTER SELECT
          </h2>

          <div className="flex justify-center items-center gap-2 mt-0.5">

            <span className="h-[2px] w-6 bg-[#63C8CC]" />

            <span className="font-mono text-[7.5px] sm:text-[8.5px] font-bold text-[#63C8CC]">
              PLAYER PROFILE
            </span>

            <span className="h-[2px] w-6 bg-[#63C8CC]" />

          </div>

        </div>


        {/* ================= CHARACTER ================= */}

        <div className="flex-1 min-h-0 flex items-center gap-4 sm:gap-6">


          {/* ================= PHOTO ================= */}

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-[105px] sm:w-[135px] aspect-[3/4] flex-shrink-0"
          >

            {/* Outer frame */}

            <div className="absolute inset-0 bg-[#63C8CC] p-[3px] shadow-[0_0_15px_rgba(99,200,204,0.15)]">

              <div className="relative w-full h-full overflow-hidden bg-[#237F85]">

                <AnimatePresence mode="wait">
                  {images[imageIndex] && !imageError[imageIndex] ? (
                    <motion.img
                      key={images[imageIndex]}
                      src={images[imageIndex]}
                      alt="Khaz"
                      onError={() => {
                        setImageError((prev) => ({ ...prev, [imageIndex]: true }));
                      }}
                      initial={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.65,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key={`fallback-${imageIndex}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#237F85] to-[#15484c] text-center p-2"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#18393d] border-2 border-[#63C8CC] flex items-center justify-center shadow-[0_0_12px_rgba(99,200,204,0.3)] mb-1">
                        <span className="text-3xl">🧑‍💻</span>
                      </div>
                      <span className="font-arcade text-[8px] text-[#F4C96B] tracking-wider font-bold">
                        KHAZ
                      </span>
                      <span className="font-mono text-[6.5px] text-[#63C8CC] mt-0.5">
                        DEV / 3D
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image overlay */}
                <div className="absolute inset-0 bg-[#63C8CC]/5 pointer-events-none" />


                {/* Scanlines */}

                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #000 4px)',
                  }}
                />


                {/* Corner markers */}

                <span className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#F4C96B]" />

                <span className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#F4C96B]" />

                <span className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#F4C96B]" />

                <span className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#F4C96B]" />

              </div>

            </div>


            {/* Player label */}

            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#263238] border-2 border-[#63C8CC] px-2 py-1">

              <span className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#63C8CC]">
                PLAYER 01
              </span>

            </div>


            {/* Image indicator */}

            <div className="absolute -right-2 top-2 flex flex-col gap-1">

              {images.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 border border-[#FFF3D6] ${
                    index === imageIndex
                      ? 'bg-[#F4C96B]'
                      : 'bg-transparent'
                  }`}
                />
              ))}

            </div>

          </motion.div>


          {/* ================= INFO ================= */}

          <div className="flex-1 min-w-0">

            <p className="font-mono text-[9px] sm:text-[10px] font-bold text-[#63C8CC] tracking-wider mb-1">
              CHARACTER NAME
            </p>

            <h3 className="font-arcade text-lg sm:text-2xl font-bold text-[#FFF3D6] tracking-wider">
              KHΔZ
            </h3>

            <p className="font-mono text-[10px] sm:text-xs font-bold text-[#F4C96B] mt-1">
              CREATIVE DEVELOPER
            </p>


            {/* Description */}

            <p className="font-mono text-[9px] sm:text-[10px] font-medium leading-relaxed text-[#FFF3D6]/90 mt-3 max-w-[300px]">
              Developer yang suka membangun hal baru dengan
              teknologi, desain, 3D, dan kreativitas.
            </p>


            {/* Tags */}

            <div className="flex flex-wrap gap-1.5 mt-3">

              {['CODE', 'DESIGN', '3D'].map((tag) => (
                <span
                  key={tag}
                  className="font-arcade text-[7px] sm:text-[8px] font-bold px-2 py-1 border border-[#63C8CC]/60 text-[#63C8CC]"
                >
                  {tag}
                </span>
              ))}

            </div>

          </div>

        </div>


        {/* ================= STATS ================= */}

        <div className="border-2 border-[#63C8CC]/25 bg-[#000]/15 rounded-md px-2.5 py-2 mt-1.5">

          <div className="flex justify-between items-center mb-1.5">

            <span className="font-arcade text-[7.5px] sm:text-[8.5px] font-bold tracking-wider text-[#63C8CC]">
              PLAYER STATS
            </span>

            <span className="font-mono text-[7.5px] font-bold text-[#F4C96B]">
              LEVEL 01
            </span>

          </div>


          <div className="space-y-1.5">

            {stats.map((stat) => (

              <div
                key={stat.name}
                className="flex items-center gap-2"
              >

                <span className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#FFF3D6] w-[62px] sm:w-[80px]">
                  {stat.name}
                </span>


                <div className="flex flex-1 gap-[2px]">

                  {Array.from({ length: stat.total }).map((_, i) => (

                    <motion.span
                      key={i}
                      initial={{
                        scaleX: 0,
                        opacity: 0,
                      }}
                      animate={{
                        scaleX: 1,
                        opacity: i < stat.filled ? 1 : 0.25,
                      }}
                      transition={{
                        delay: i * 0.025,
                        duration: 0.15,
                      }}
                      className={`h-[7px] sm:h-[8px] flex-1 rounded-[1px] origin-left ${
                        i < stat.filled
                          ? 'bg-[#63C8CC]'
                          : 'bg-[#FFF3D6]/15'
                      }`}
                    />

                  ))}

                </div>


                <span className="font-mono text-[8px] sm:text-[9px] font-bold text-[#F4C96B] w-5 text-right">
                  {stat.filled}
                </span>

              </div>

            ))}

          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => setImageIndex((p) => (p + 1) % images.length)}
            className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#FFF3D6]/60 hover:text-[#FFF3D6] transition-colors cursor-pointer"
          >
            ◀ ▶ CHANGE
          </button>

          <span className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#F4C96B]">
            ● ACTIVE
          </span>

          <button
            onClick={onBack}
            className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#FFF3D6]/60 hover:text-[#FFF3D6] transition-colors cursor-pointer"
          >
            ESC BACK
          </button>
        </div>

      </div>

    </div>
  );
}