'use client';

import { motion, useAnimation } from 'framer-motion';
import { skills } from '@/data/skills';
import { useEffect } from 'react';

export default function SkillsScreen() {
  const controls = useAnimation();

  // Lebar card + gap
  const cardWidth = 145;
  const gap = 16;
  const step = cardWidth + gap;

  useEffect(() => {
    let cancelled = false;

    const animateCarousel = async () => {
      let current = 0;

      while (!cancelled) {
        // Tunggu sebelum bergerak
        await new Promise((resolve) => setTimeout(resolve, 1800));

        if (cancelled) return;

        current += 1;

        // Kalau sudah sampai card terakhir,
        // kembali ke awal dengan transisi halus
        if (current >= skills.length) {
          current = 0;

          await controls.start({
            x: 0,
            transition: {
              duration: 0.7,
              ease: 'easeInOut',
            },
          });

          continue;
        }

        await controls.start({
          x: -(current * step),
          transition: {
            duration: 1,
            ease: 'easeInOut',
          },
        });
      }
    };

    animateCarousel();

    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, step]);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b-2 border-[#63C8CC]/25 pb-2">

        <span className="font-arcade text-[10px] sm:text-xs font-bold text-[#63C8CC]">
          KHΔZ
        </span>

        <span className="font-arcade text-[9px] sm:text-[10px] font-bold text-[#F4C96B]">
          03 / 05
        </span>

      </div>


      {/* TITLE */}
      <div className="text-center pt-2 pb-3">

        <h2 className="font-arcade text-[12px] sm:text-sm font-bold tracking-[0.18em] text-[#F4C96B]">
          POWER UPS
        </h2>

        <p className="font-mono text-[8px] sm:text-[9px] font-bold text-[#FFF3D6]/55 mt-1">
          COLLECTED SKILLS
        </p>

      </div>


      {/* CAROUSEL */}
      <div className="relative flex-1 min-h-0 flex items-center overflow-hidden">

        {/* LEFT FADE */}
        <div className="
          absolute
          left-0
          top-0
          bottom-0
          w-10
          sm:w-14
          z-20
          pointer-events-none
          bg-gradient-to-r
          from-[#263238]
          to-transparent
        " />

        {/* RIGHT FADE */}
        <div className="
          absolute
          right-0
          top-0
          bottom-0
          w-10
          sm:w-14
          z-20
          pointer-events-none
          bg-gradient-to-l
          from-[#263238]
          to-transparent
        " />


        {/* MOVING TRACK */}
        <motion.div
          animate={controls}
          className="
            flex
            gap-4
            px-4
            sm:px-8
            will-change-transform
          "
        >

          {skills.map((skill, index) => (

            <motion.div
              key={skill.name}
              className="
                relative
                flex-shrink-0
                w-[125px]
                h-[150px]
                sm:w-[145px]
                sm:h-[165px]
                rounded-xl
                bg-[#237F85]
                border-2
                border-[#63C8CC]/50
                overflow-hidden
              "
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: index * 0.08,
                duration: 0.4,
              }}
            >

              {/* GLOW */}
              <div className="
                absolute
                -top-10
                -right-10
                w-24
                h-24
                rounded-full
                bg-[#63C8CC]/15
                blur-2xl
              " />


              {/* NUMBER */}
              <div className="absolute top-2 left-2">

                <span className="font-mono text-[8px] font-bold text-[#FFF3D6]/45">
                  #{String(index + 1).padStart(2, '0')}
                </span>

              </div>


              {/* ICON */}
              <div className="relative flex justify-center pt-7">

                <div className="
                  w-14
                  h-14
                  sm:w-16
                  sm:h-16
                  rounded-full
                  bg-[#263238]
                  border-2
                  border-[#63C8CC]
                  flex
                  items-center
                  justify-center
                  shadow-[0_0_14px_rgba(99,200,204,0.2)]
                ">

                  {skill.iconType === 'text' ? (
                    <span className="font-arcade text-lg sm:text-xl font-bold text-[#F4C96B]">
                      {skill.icon}
                    </span>
                  ) : (
                    <span className="text-2xl sm:text-3xl">
                      {skill.icon}
                    </span>
                  )}

                </div>

              </div>


              {/* NAME */}
              <div className="
                absolute
                left-2
                right-2
                bottom-9
                text-center
              ">

                <span className="
                  font-arcade
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  tracking-wider
                  text-[#FFF3D6]
                ">
                  {skill.name}
                </span>

              </div>


              {/* POWER BAR */}
              <div className="absolute bottom-3 left-3 right-3">

                <div className="h-1.5 bg-[#FFF3D6]/15 rounded-full overflow-hidden">

                  <motion.div
                    className="h-full bg-[#63C8CC]"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${Math.min(100, 60 + index * 5)}%`,
                    }}
                    transition={{
                      delay: 0.5 + index * 0.08,
                      duration: 0.7,
                    }}
                  />

                </div>

              </div>

            </motion.div>

          ))}

        </motion.div>

      </div>


      {/* DOT INDICATOR */}
      <div className="flex justify-center gap-1.5 py-2">

        {skills.map((skill, index) => (

          <motion.span
            key={skill.name}
            className="w-1.5 h-1.5 rounded-full bg-[#63C8CC]/40"
            animate={{
              opacity: [0.35, 1, 0.35],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1.8,
              delay: index * 0.2,
              repeat: Infinity,
            }}
          />

        ))}

      </div>


      {/* FOOTER */}
      <div className="
        flex
        justify-center
        items-center
        gap-4
        border-t-2
        border-[#63C8CC]/20
        pt-2
      ">

        <span className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#FFF3D6]/60">
          ◀ AUTO ▶
        </span>

        <span className="font-arcade text-[7px] sm:text-[8px] font-bold text-[#F4C96B]">
          ● SELECT
        </span>

      </div>

    </div>
  );
}    