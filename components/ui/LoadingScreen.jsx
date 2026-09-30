'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  const clampedProgress = Math.min(progress, 100);
  const blocks = Math.floor(clampedProgress / 10);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#237F85]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-[#FFF3D6] text-2xl sm:text-4xl font-bold tracking-[0.3em] mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        KHAZ ARCADE
      </motion.h1>

      <motion.p
        className="text-[#63C8CC] text-xs sm:text-sm tracking-[0.2em] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        LOADING...
      </motion.p>

      <motion.div
        className="w-48 sm:w-64 flex items-center gap-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 sm:h-5 flex-1 rounded-sm transition-colors duration-200 ${
              i < blocks ? 'bg-[#63C8CC]' : 'bg-[#237F85]/50 border border-[#63C8CC]/20'
            }`}
          />
        ))}
      </motion.div>

      <p className="text-[#FFF3D6]/40 text-[10px] sm:text-xs mt-3 tracking-wider">
        {Math.floor(clampedProgress)}%
      </p>
    </motion.div>
  );
}
