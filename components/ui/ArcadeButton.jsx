'use client';

import { motion } from 'framer-motion';

export default function ArcadeButton({ label, onClick, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'bg-[#63C8CC] text-[#237F85] hover:bg-[#63C8CC]/90',
    secondary: 'bg-[#F29A8D] text-white hover:bg-[#F29A8D]/90',
    ghost: 'bg-transparent border-2 border-[#63C8CC]/40 text-[#63C8CC] hover:border-[#63C8CC]/70',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95, y: 2 }}
    >
      {label}
    </motion.button>
  );
}
