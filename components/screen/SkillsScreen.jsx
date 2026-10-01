'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { skills } from '@/data/skills';
import { useTrigger } from '@/hooks/useTrigger';
import ScreenFrame from '@/components/ui/ScreenFrame';

// Layar logis 500px, kartu aktif selalu di tengah.
const SCREEN_W = 500;
const CARD_W = 140;
const GAP = 14;
const STEP = CARD_W + GAP;
const SIDE_PAD = (SCREEN_W - CARD_W) / 2;

export default function SkillsScreen({ horizontalNavTrigger, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const go = useCallback((delta) => {
    setActiveIndex((i) => (i + delta + skills.length) % skills.length);
  }, []);

  useTrigger(horizontalNavTrigger, ({ direction }) => {
    setAutoPlay(false);
    go(direction === 'left' ? -1 : 1);
  });

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => go(1), 2800);

    return () => clearInterval(timer);
  }, [autoPlay, go]);

  return (
    <ScreenFrame
      index="03 / 05"
      title="POWER UPS"
      subtitle="COLLECTED SKILLS"
      footer={[
        { label: '◀ ▶ BROWSE' },
        { label: '● SELECT', accent: true },
        { label: '◀ BACK', onClick: onBack },
      ]}
    >
      {/* Skills Carousel */}
      <div className="relative -mx-6 overflow-hidden py-3">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10 bg-gradient-to-r from-[#15484c] to-transparent" />

        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10 bg-gradient-to-l from-[#15484c] to-transparent" />

        <motion.ul
          className="flex will-change-transform"
          style={{
            gap: GAP,
            paddingLeft: SIDE_PAD,
            paddingRight: SIDE_PAD,
          }}
          animate={{
            x: -activeIndex * STEP,
          }}
          transition={{
            duration: 0.45,
            ease: 'easeOut',
          }}
        >
          {skills.map((skill, index) => {
            const isActive = index === activeIndex;
            const Icon = skill.icon;

            return (
              <motion.li
                key={skill.name}
                animate={{
                  scale: isActive ? 1 : 0.86,
                  opacity: isActive ? 1 : 0.5,
                }}
                transition={{
                  duration: 0.3,
                }}
                style={{
                  width: CARD_W,
                }}
                className={`relative shrink-0 h-[160px] rounded-xl bg-[#237F85] border-2 overflow-hidden flex flex-col items-center justify-center gap-2.5 ${
                  isActive
                    ? 'border-[#F4C96B] shadow-[0_0_18px_rgba(244,201,107,0.25)]'
                    : 'border-[#63C8CC]/40'
                }`}
              >
                {/* Skill Number */}
                <span className="absolute top-2 left-2.5 font-arcade text-[9px] text-[#FFF3D6]/60">
                  #{String(index + 1).padStart(2, '0')}
                </span>

                {/* Skill Icon */}
                <span
                  className="w-16 h-16 rounded-full bg-[#263238] border-2 border-[#63C8CC] flex items-center justify-center"
                  style={{
                    boxShadow: isActive
                      ? `0 0 14px ${skill.color}35`
                      : 'none',
                  }}
                >
                  <Icon
                    size={34}
                    strokeWidth={0.2}
                    color={skill.color}
                    aria-hidden="true"
                  />
                </span>

                {/* Skill Name */}
                <span className="font-arcade text-[11px] tracking-wider text-[#FFF3D6]">
                  {skill.name}
                </span>

                {/* Category */}
                <span className="text-[11px] text-[#FFF3D6]/70">
                  {skill.category}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2 pt-1">
        {skills.map((skill, index) => (
          <button
            key={skill.name}
            type="button"
            onClick={() => {
              setAutoPlay(false);
              setActiveIndex(index);
            }}
            aria-label={`Go to ${skill.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
              index === activeIndex
                ? 'bg-[#F4C96B] scale-125'
                : 'bg-[#63C8CC]/35 hover:bg-[#63C8CC]/70'
            }`}
          />
        ))}
      </div>
    </ScreenFrame>
  );
}