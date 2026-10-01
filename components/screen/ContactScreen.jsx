'use client';

import { motion } from 'framer-motion';
import { contactEmail, socialLinks } from '@/data/contact';
import ScreenFrame from '@/components/ui/ScreenFrame';

export default function ContactScreen({ onBack }) {
  return (
    <ScreenFrame
      index="05 / 05"
      title="READY TO CONNECT?"
      footer={[{ label: '● CONNECT', accent: true }, { label: '◀ BACK', onClick: onBack }]}
    >
      <div className="w-full max-w-[360px] mx-auto text-center">
        <motion.div
          aria-hidden="true"
          className="font-arcade text-[28px] leading-none text-[#F29A8D] mb-3"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          ♥
        </motion.div>

        <p className="text-[13px] leading-relaxed text-[#FFF3D6]/90 mb-4">
          Let&apos;s build something interesting together.
        </p>

        <a
          href={`mailto:${contactEmail}`}
          className="inline-block px-7 py-2.5 rounded-full bg-[#F4C96B] text-[#263238] font-arcade text-[11px] tracking-wider hover:bg-[#ffe082] transition-colors shadow-lg mb-4"
        >
          CONTACT ME
        </a>

        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-10 rounded-lg bg-[#237F85] border border-[#63C8CC]/50 text-[12px] font-medium hover:bg-[#2e9da4] transition-colors"
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </ScreenFrame>
  );
}
