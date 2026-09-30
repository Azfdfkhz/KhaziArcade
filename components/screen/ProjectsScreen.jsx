'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

export default function ProjectsScreen({ onBack, horizontalNavTrigger }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const project = projects[currentIndex];

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % projects.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    if (!horizontalNavTrigger) return;
    if (horizontalNavTrigger.direction === 'left') {
      prev();
    } else if (horizontalNavTrigger.direction === 'right') {
      next();
    }
  }, [horizontalNavTrigger, next, prev]);

  // Frame 5: Project Detail View
  if (showDetail) {
    return (
      <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">
        {/* Top Header */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
          <span>KHΔZ</span>
          <span className="text-[#F4C96B]">02/05</span>
        </div>

        {/* Content */}
        <div className="my-auto py-1 max-w-[340px] mx-auto w-full text-center">
          {/* Top UI Preview Mockup Card */}
          <div className="bg-[#FFF3D6] rounded-lg p-2.5 shadow-md border border-white/20 mb-3 text-left">
            <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-[#237F85]/20">
              <div className="w-2 h-2 rounded-full bg-[#F29A8D]" />
              <div className="w-2 h-2 rounded-full bg-[#F4C96B]" />
              <div className="w-2 h-2 rounded-full bg-[#63C8CC]" />
              <span className="text-[7px] text-[#237F85] font-bold ml-1 tracking-wider uppercase font-mono">
                {project.title} APP PREVIEW
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 h-14 bg-[#237F85]/10 rounded p-1.5">
              <div className="bg-[#63C8CC]/20 rounded p-1 flex flex-col justify-between">
                <div className="w-full h-1 bg-[#63C8CC] rounded" />
                <div className="w-3/4 h-1 bg-[#63C8CC]/60 rounded" />
                <div className="w-1/2 h-1 bg-[#63C8CC]/40 rounded" />
              </div>
              <div className="col-span-2 bg-white/70 rounded p-1 flex flex-col justify-between">
                <div className="w-full h-1.5 bg-[#237F85]/50 rounded" />
                <div className="w-5/6 h-1 bg-[#237F85]/30 rounded" />
                <div className="w-full h-1 bg-[#237F85]/20 rounded" />
              </div>
            </div>
          </div>

          <h3 className="font-arcade text-xs sm:text-sm text-[#FFF3D6] font-bold tracking-wider mb-0.5">
            {project.title}
          </h3>
          <p className="text-[#63C8CC] text-[10px] font-semibold mb-2">
            {project.subtitle}
          </p>
          <p className="text-[#FFF3D6]/80 text-[9px] leading-relaxed mb-3">
            {project.description}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-1.5 mb-3.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[8px] sm:text-[9px] px-2 py-0.5 bg-[#237F85] text-[#FFF3D6] rounded border border-[#63C8CC]/40 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2">
            <a
              href={project.demoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded bg-[#F4C96B] text-[#263238] font-arcade text-[9px] tracking-wider font-bold hover:bg-[#ffe082] transition-colors shadow-md"
            >
              PLAY PROJECT
            </a>
            <a
              href={project.githubUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded bg-[#237F85] text-[#FFF3D6] font-arcade text-[9px] tracking-wider border border-[#63C8CC]/50 hover:bg-[#2e9da4] transition-colors"
            >
              GITHUB
            </a>
          </div>

          <button
            onClick={() => setShowDetail(false)}
            className="text-[8px] text-[#FFF3D6]/60 hover:text-[#FFF3D6] mt-3 underline underline-offset-2 cursor-pointer font-arcade"
          >
            ◀ BACK TO LIBRARY
          </button>
        </div>

        {/* Footer controls hint */}
        <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[9px] text-[#FFF3D6]/50 font-arcade tracking-wider border-t border-[#63C8CC]/20 pt-2">
          <span>◀ ▶ CHANGE</span>
          <span>● SELECT</span>
        </div>
      </div>
    );
  }

  // Frame 4: Game Library Carousel
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
        <span>KHΔZ</span>
        <span className="text-[#F4C96B]">02/05</span>
      </div>

      {/* Screen Title */}
      <div className="text-center mt-1">
        <h2 className="font-arcade text-[#F4C96B] text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          GAME LIBRARY
        </h2>
      </div>

      {/* 3 Cartridges Carousel */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 my-auto py-2">
        {/* Left card (dimmed) */}
        <button
          onClick={prev}
          aria-label="Previous Project"
          className="w-20 sm:w-24 h-32 sm:h-36 rounded-lg bg-black/25 border border-white/10 p-2 flex flex-col items-center justify-center opacity-40 hover:opacity-70 transition-all cursor-pointer transform -scale-95"
        >
          <span className="text-xl mb-1">🎮</span>
          <span className="font-arcade text-[7px] text-center text-[#FFF3D6]/70 leading-tight">
            {projects[prevIndex].title}
          </span>
        </button>

        {/* Center active card */}
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowDetail(true)}
          className="w-40 sm:w-44 h-48 sm:h-52 rounded-xl bg-[#FFF3D6] text-[#263238] p-3 shadow-xl border-2 border-white flex flex-col justify-between cursor-pointer hover:shadow-2xl transition-all transform hover:-translate-y-1 group"
        >
          {/* Card Mockup Window */}
          <div className="w-full h-20 bg-[#237F85] rounded-lg p-1.5 flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F29A8D]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#F4C96B]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#63C8CC]" />
            </div>
            <div className="text-center text-2xl my-auto">💻</div>
            <div className="w-full h-1 bg-[#63C8CC]/40 rounded" />
          </div>

          {/* Card Info */}
          <div className="text-center">
            <h3 className="font-arcade text-[10px] sm:text-xs text-[#263238] font-bold tracking-wider mb-0.5">
              {project.title}
            </h3>
            <p className="text-[8px] text-[#237F85] font-semibold leading-tight line-clamp-1">
              {project.subtitle}
            </p>
          </div>

          {/* Card Badges */}
          <div className="flex flex-wrap justify-center gap-1">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[6px] sm:text-[7px] px-1 py-0.5 rounded bg-[#237F85]/10 text-[#237F85] font-bold font-mono"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Press prompt */}
          <div className="text-center text-[7px] font-arcade text-[#237F85] group-hover:text-[#F29A8D] transition-colors font-bold">
            [ TAP TO OPEN ]
          </div>
        </motion.div>

        {/* Right card (dimmed) */}
        <button
          onClick={next}
          aria-label="Next Project"
          className="w-20 sm:w-24 h-32 sm:h-36 rounded-lg bg-black/25 border border-white/10 p-2 flex flex-col items-center justify-center opacity-40 hover:opacity-70 transition-all cursor-pointer transform -scale-95"
        >
          <span className="text-xl mb-1">🕹️</span>
          <span className="font-arcade text-[7px] text-center text-[#FFF3D6]/70 leading-tight">
            {projects[nextIndex].title}
          </span>
        </button>
      </div>

      {/* Footer controls hint */}
      <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[9px] text-[#FFF3D6]/50 font-arcade tracking-wider border-t border-[#63C8CC]/20 pt-2">
        <span>↑ ↓ SELECT</span>
        <span>● PLAY</span>
        <span>◀ BACK</span>
      </div>
    </div>
  );
}
