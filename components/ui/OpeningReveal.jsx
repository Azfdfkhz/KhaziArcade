'use client';

import { motion } from 'framer-motion';

export default function OpeningReveal() {
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4.0, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      {/* The loading surface splits open from the center. */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#071718] border-r border-[#63C8CC]/25"
        initial={{ x: 0 }}
        animate={{ x: '-102%' }}
        transition={{ delay: 0.45, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(35,127,133,0.18),transparent_72%)]" />
        <div className="absolute right-5 top-1/2 w-20 h-px bg-[#63C8CC]/40" />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#071718] border-l border-[#63C8CC]/25"
        initial={{ x: 0 }}
        animate={{ x: '102%' }}
        transition={{ delay: 0.45, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(35,127,133,0.18),transparent_72%)]" />
        <div className="absolute left-5 top-1/2 w-20 h-px bg-[#63C8CC]/40" />
      </motion.div>

      {/* UI frame that visually sits in front of the 3D world. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [1, 1, 0.55, 0], scale: [1, 1.01, 1.035, 1.07] }}
        transition={{ duration: 4.95, times: [0, 0.42, 0.78, 1], ease: 'easeInOut' }}
      >
        <div className="relative w-[min(72vw,900px)] h-[min(40vw,500px)] border border-[#63C8CC]/35 rounded-[18px] shadow-[0_0_80px_rgba(99,200,204,0.10)]">
          <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_center,rgba(99,200,204,0.10),transparent_55%)]" />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.4em] text-[#63C8CC] whitespace-nowrap"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: 2.9, times: [0, 0.62, 1], ease: 'easeOut' }}
          >
            KHAZ SYSTEM // CONNECTING
          </motion.div>
        </div>
      </motion.div>

      {/* Logo is revealed while the opening surface is already moving away. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.94, 1, 1.02, 1.08], y: [8, 0, 0, -8] }}
        transition={{ delay: 2.0, duration: 2.3, times: [0, 0.2, 0.68, 1], ease: 'easeOut' }}
      >
        <p className="font-mono text-[9px] tracking-[0.5em] text-[#63C8CC] mb-3">WELCOME TO</p>
        <h2 className="font-arcade text-[#FFF3D6] text-3xl sm:text-5xl tracking-[0.14em] drop-shadow-[0_0_22px_rgba(99,200,204,0.4)]">
          KHAZ ARCADE
        </h2>
      </motion.div>

      {/* Tiny center flash sells the transition as passing through a display. */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-[#FFF3D6] shadow-[0_0_30px_8px_rgba(99,200,204,0.55)]"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 1, 0], scale: [1, 8, 18] }}
        transition={{ delay: 2.35, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-7 text-center font-mono text-[9px] tracking-[0.3em] text-[#FFF3D6]/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 1.2, duration: 2.8, ease: 'easeInOut' }}
      >
        ENTERING ARCADE SPACE
      </motion.div>
    </motion.div>
  );
}
