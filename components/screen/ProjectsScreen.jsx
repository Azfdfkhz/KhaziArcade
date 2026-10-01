'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { useTrigger } from '@/hooks/useTrigger';
import ScreenFrame from '@/components/ui/ScreenFrame';

const SIDE_ICONS = ['🎮', '🕹️'];

function SideCard({ item, icon, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-[104px] h-[140px] shrink-0 rounded-lg bg-black/25 border border-white/10 p-2 flex flex-col items-center justify-center gap-2 opacity-50 hover:opacity-80 transition-opacity cursor-pointer"
    >
      <span aria-hidden="true" className="text-2xl leading-none">{icon}</span>
      <span className="font-arcade text-[9px] leading-snug text-center text-[#FFF3D6]/80 break-words max-w-full">
        {item.title}
      </span>
    </button>
  );
}

export default function ProjectsScreen({ onBack, horizontalNavTrigger, selectTrigger }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const project = projects[currentIndex];

  const next = useCallback(() => setCurrentIndex((i) => (i + 1) % projects.length), []);
  const prev = useCallback(
    () => setCurrentIndex((i) => (i - 1 + projects.length) % projects.length),
    []
  );

  useTrigger(horizontalNavTrigger, ({ direction }) => {
    if (direction === 'left') prev();
    else if (direction === 'right') next();
  });

  // SELECT / Enter membuka & menutup detail
  useTrigger(selectTrigger, () => setShowDetail((v) => !v));

  if (showDetail) {
    return (
      <ScreenFrame
        index="02 / 05"
        footer={[
          { label: '◀ ▶ CHANGE', onClick: undefined },
          { label: '● CLOSE', accent: true, onClick: () => setShowDetail(false) },
        ]}
      >
        <div className="w-full max-w-[400px] mx-auto text-center">
          {/* Preview mockup */}
          <div className="bg-[#FFF3D6] rounded-lg p-2 shadow-md mb-3 text-left">
            <div className="flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-[#237F85]/20">
              <span className="w-2 h-2 rounded-full bg-[#F29A8D]" />
              <span className="w-2 h-2 rounded-full bg-[#F4C96B]" />
              <span className="w-2 h-2 rounded-full bg-[#63C8CC]" />
              <span className="ml-1 font-arcade text-[8px] text-[#237F85] tracking-wider uppercase">
                {project.title}
              </span>
            </div>
            <div
              className="grid grid-cols-3 gap-1.5 h-12 rounded p-1.5"
              style={{ backgroundColor: `${project.color}33` }}
            >
              <div className="rounded p-1 flex flex-col justify-between" style={{ backgroundColor: `${project.color}66` }}>
                <span className="h-1 rounded bg-[#237F85]/70" />
                <span className="h-1 w-3/4 rounded bg-[#237F85]/50" />
              </div>
              <div className="col-span-2 rounded bg-white/70 p-1 flex flex-col justify-between">
                <span className="h-1.5 rounded bg-[#237F85]/50" />
                <span className="h-1 w-5/6 rounded bg-[#237F85]/30" />
              </div>
            </div>
          </div>

          <h3 className="font-arcade text-[14px] tracking-wider text-[#FFF3D6]">{project.title}</h3>
          <p className="text-[12px] font-semibold text-[#63C8CC] mt-1.5">
            {project.subtitle} · {project.year}
          </p>
          <p className="text-[12px] leading-relaxed text-[#FFF3D6]/85 mt-2 mb-3">
            {project.description}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[11px] px-2 py-0.5 rounded bg-[#237F85] border border-[#63C8CC]/40 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <a
              href={project.demoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#F4C96B] text-[#263238] font-arcade text-[10px] tracking-wider hover:bg-[#ffe082] transition-colors shadow-md"
            >
              PLAY PROJECT
            </a>
            <a
              href={project.githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-[#237F85] border border-[#63C8CC]/50 font-arcade text-[10px] tracking-wider hover:bg-[#2e9da4] transition-colors"
            >
              GITHUB
            </a>
          </div>
        </div>
      </ScreenFrame>
    );
  }

  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <ScreenFrame
      index="02 / 05"
      title="GAME LIBRARY"
      footer={[
        { label: '◀ ▶ BROWSE' },
        { label: '● OPEN', accent: true, onClick: () => setShowDetail(true) },
        { label: '◀ BACK', onClick: onBack },
      ]}
    >
      <div className="flex items-center justify-center gap-3 py-2">
        <SideCard item={prevProject} icon={SIDE_ICONS[0]} onClick={prev} label="Previous project" />

        <motion.button
          type="button"
          key={currentIndex}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowDetail(true)}
          className="group w-[184px] h-[232px] shrink-0 rounded-xl bg-[#FFF3D6] text-[#263238] p-3 shadow-xl border-2 border-white flex flex-col justify-between cursor-pointer text-center"
        >
          <div
            className="w-full h-[72px] rounded-lg p-1.5 flex flex-col justify-between shadow-inner"
            style={{ backgroundColor: project.color }}
          >
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#263238]/50" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#263238]/35" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#263238]/20" />
            </span>
            <span aria-hidden="true" className="text-2xl leading-none">💻</span>
            <span className="h-1 rounded bg-[#263238]/20" />
          </div>

          <div>
            <h3 className="font-arcade text-[12px] tracking-wider">{project.title}</h3>
            <p className="text-[11px] font-semibold text-[#237F85] leading-tight mt-1 line-clamp-2">
              {project.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] px-1.5 py-0.5 rounded bg-[#237F85]/10 text-[#237F85] font-bold"
              >
                {t}
              </span>
            ))}
          </div>

          <span className="font-arcade text-[9px] text-[#237F85] group-hover:text-[#F29A8D] transition-colors">
            [ TAP TO OPEN ]
          </span>
        </motion.button>

        <SideCard item={nextProject} icon={SIDE_ICONS[1]} onClick={next} label="Next project" />
      </div>
    </ScreenFrame>
  );
}
