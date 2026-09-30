'use client';

import { motion } from 'framer-motion';

const socialLinks = [
  { name: 'GitHub', icon: '💻', url: 'https://github.com' },
  { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com' },
  { name: 'Email', icon: '✉️', url: 'mailto:khaz@example.com' },
  { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
];

export default function ContactScreen() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-5 text-[#FFF3D6] select-none font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#63C8CC] font-arcade tracking-wider border-b border-[#63C8CC]/20 pb-2">
        <span>KHΔZ</span>
        <span className="text-[#F4C96B]">05/05</span>
      </div>

      {/* Main Content */}
      <div className="my-auto py-2 text-center max-w-[280px] mx-auto w-full">
        <h2 className="font-arcade text-[#F4C96B] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3">
          READY TO CONNECT?
        </h2>

        {/* Pixel Heart */}
        <motion.div
          className="text-3xl sm:text-4xl my-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          ❤️
        </motion.div>

        <p className="text-[#FFF3D6]/90 text-[10px] sm:text-[11px] leading-relaxed mb-4">
          Let&apos;s build something great together!
        </p>

        {/* Big Yellow CTA Button */}
        <a
          href="mailto:khaz@example.com"
          className="inline-block px-6 py-2 rounded-full bg-[#F4C96B] text-[#263238] font-arcade text-[9px] sm:text-[10px] tracking-wider font-bold hover:bg-[#ffe082] transition-transform hover:scale-105 active:scale-95 shadow-lg mb-4"
        >
          CONTACT ME
        </a>

        {/* Social Icons Row */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#237F85] border border-[#63C8CC]/50 flex items-center justify-center text-sm hover:bg-[#63C8CC] hover:text-[#237F85] transition-all transform hover:scale-110 active:scale-95 shadow-md"
              title={link.name}
            >
              <span>{link.icon}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Footer controls hint */}
      <div className="flex justify-center items-center gap-4 text-[8px] sm:text-[9px] text-[#FFF3D6]/50 font-arcade tracking-wider border-t border-[#63C8CC]/20 pt-2">
        <span>◀ ▶ BACK</span>
        <span>● SELECT</span>
      </div>
    </div>
  );
}
