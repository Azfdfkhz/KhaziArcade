'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import ScreenFrame from '@/components/ui/ScreenFrame';

export default function ExperienceScreen({ onBack }) {
  return (
    <ScreenFrame
      index="04 / 05"
      title="HIGH SCORE"
      subtitle="PERJALANAN SEJAK 2022"
      footer={[
        { label: '● TIMELINE', accent: true },
        { label: '◀ BACK', onClick: onBack },
      ]}
    >
      {/* Scrollable timeline area */}
      <div className="relative w-full max-w-[415px] mx-auto">
        <div className="max-h-[215px] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-thumb-[#63C8CC]/40 scrollbar-track-transparent">
          <div className="relative py-2">
            {/* Timeline Line */}
            <div
              aria-hidden="true"
              className="absolute left-[27px] top-5 bottom-5 w-px bg-[#63C8CC]/30"
            />

            <ol className="space-y-2.5">
              {experiences.map((exp, index) => (
                <motion.li
                  key={`${exp.year}-${exp.title}`}
                  initial={{
                    opacity: 0,
                    x: -10,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                  className="relative flex gap-3"
                >
                  {/* Year */}
                  <div className="relative z-10 w-[54px] shrink-0 flex justify-center">
                    <div
                      className="
                        flex items-center justify-center
                        w-[50px] h-[30px]
                        rounded-md
                        bg-[#237F85]
                        border border-[#63C8CC]/60
                      "
                    >
                      <span className="font-arcade text-[9px] tracking-wide text-[#F4C96B]">
                        {exp.year}
                      </span>

                      {/* Timeline dot */}
                      <span
                        aria-hidden="true"
                        className="
                          absolute
                          -right-[10px]
                          top-1/4
                          -translate-y-1/2
                          w-2.5 h-2.5
                          rounded-full
                          bg-[#F4C96B]
                          border-2
                          border-[#15484c]
                        "
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <article
                    className="
                      min-w-0 flex-1
                      rounded-lg
                      bg-black/15
                      border border-[#63C8CC]/15
                      px-3 py-2
                      hover:border-[#63C8CC]/30
                      transition-colors duration-200
                    "
                  >
                    <h3 className="font-arcade text-[10px] leading-[1.3] tracking-wide text-[#FFF3D6]">
                      {exp.title}
                    </h3>

                    <p className="mt-1 text-[9px] font-semibold tracking-wide text-[#63C8CC]">
                      {exp.place}
                    </p>

                    <p className="mt-1 text-[9px] leading-[1.4] text-[#FFF3D6]/65">
                      {exp.description}
                    </p>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </ScreenFrame>
  );
}