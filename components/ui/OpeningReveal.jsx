'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function OpeningReveal() {
  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.05, duration: 0.55, ease }}
      aria-hidden="true"
    >
      {/* Layer 1: the loading surface splits open. */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#071718] border-r border-[#63C8CC]/20"
        initial={{ x: 0 }}
        animate={{ x: '-101%' }}
        transition={{ delay: 0.35, duration: 1.15, ease }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#071718] via-[#071718]/95 to-transparent" />
        <div className="absolute right-6 top-1/2 h-px w-16 bg-[#63C8CC]/35" />
      </motion.div>

      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#071718] border-l border-[#63C8CC]/20"
        initial={{ x: 0 }}
        animate={{ x: '101%' }}
        transition={{ delay: 0.35, duration: 1.15, ease }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-[#071718] via-[#071718]/95 to-transparent" />
        <div className="absolute left-6 top-1/2 h-px w-16 bg-[#63C8CC]/35" />
      </motion.div>

      {/* Layer 2: a smaller frame moves at a different speed for parallax. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [1, 1, 0], scale: [1, 1.02, 1.16] }}
        transition={{ delay: 0.62, duration: 2.35, times: [0, 0.5, 1], ease }}
      >
        <motion.div
          className="relative w-[min(72vw,900px)] h-[min(40vw,500px)] rounded-[18px] border border-[#63C8CC]/25"
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{ delay: 0.7, duration: 2.1, ease }}
        >
          <div className="absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_center,rgba(99,200,204,0.08),transparent_60%)]" />
          <div className="absolute -inset-px rounded-[18px] border border-white/[0.04]" />
        </motion.div>
      </motion.div>

      {/* Layer 3: tiny center aperture sells the push-through effect. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#071718]"
        initial={{ width: 0, height: 0, opacity: 0.9 }}
        animate={{ width: '18vmax', height: '18vmax', opacity: [0.9, 0.5, 0] }}
        transition={{ delay: 1.05, duration: 1.75, times: [0, 0.55, 1], ease }}
      />

      {/* Minimal system text stays behind the moving layers. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [1, 1, 0], scale: [1, 1, 1.08] }}
        transition={{ delay: 0.1, duration: 1.75, times: [0, 0.35, 1], ease }}
      >
        <p className="text-[11px] tracking-[0.4em] text-[#63C8CC]">KHAZ SYSTEM</p>
        <p className="mt-2 text-[10px] tracking-[0.25em] text-[#FFF3D6]/60">LOADING SPACE</p>
      </motion.div>

      {/* Title appears only after the camera has pushed through the layers. */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        initial={{ opacity: 0, scale: 0.94, y: 8 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.94, 1, 1.02, 1.05], y: [8, 0, 0, -6] }}
        transition={{ delay: 2.05, duration: 1.55, times: [0, 0.18, 0.7, 1], ease }}
      >
        <p className="font-mono text-[11px] tracking-[0.5em] text-[#63C8CC] mb-3">WELCOME TO</p>
        <h2 className="font-arcade text-[#FFF3D6] text-xl sm:text-4xl md:text-5xl tracking-[0.12em] drop-shadow-[0_0_22px_rgba(99,200,204,0.35)]">
          KHAZ ARCADE
        </h2>
      </motion.div>

      {/* One restrained flash at the moment the camera passes the last layer. */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-1 h-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF3D6]"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 0.8, 0], scale: [1, 7, 16] }}
        transition={{ delay: 1.62, duration: 0.65, ease }}
        style={{ boxShadow: '0 0 32px 8px rgba(99,200,204,0.35)' }}
      />
    </motion.div>
  );
}
