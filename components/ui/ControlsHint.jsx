'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function ControlsHint({ visible = true }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3 sm:gap-4 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#263238]/80 backdrop-blur-sm rounded-full border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <span className="text-[#FFF3D6]/50 text-[10px] sm:text-xs tracking-wider">↑↓ Move</span>
          <span className="text-[#63C8CC]/70 text-[10px] sm:text-xs tracking-wider">Enter Select</span>
          <span className="text-[#F29A8D]/70 text-[10px] sm:text-xs tracking-wider">Esc Back</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
