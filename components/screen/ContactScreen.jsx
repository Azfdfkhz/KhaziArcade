'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram, FaEnvelope, FaHeart, FaChevronLeft } from 'react-icons/fa6';
import { contactEmail, socialLinks } from '@/data/contact';
import { useTrigger } from '@/hooks/useTrigger';
import ScreenFrame from '@/components/ui/ScreenFrame';

// Ikon SVG berdasarkan field `icon` di data/contact.js (konsisten di semua
// perangkat, tidak seperti emoji). Untuk link baru: tambah kunci di sini.
const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  email: FaEnvelope,
};

const FOCUS =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4C96B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#15484c]';

const MAILTO = `mailto:${contactEmail}`;

export default function ContactScreen({ onBack, selectTrigger }) {
  const openMail = () => {
    window.location.href = MAILTO;
  };

  // SELECT / Enter = "● CONNECT": buka email
  useTrigger(selectTrigger, openMail);

  return (
    <ScreenFrame
      index="05 / 05"
      title="READY TO CONNECT?"
      footer={[
        { label: '● CONNECT', accent: true, onClick: openMail },
        {
          label: (
            <span className="inline-flex items-center gap-1.5">
              <FaChevronLeft aria-hidden="true" className="w-2.5 h-2.5" />
              BACK
            </span>
          ),
          key: 'back',
          onClick: onBack,
        },
      ]}
    >
      <div className="w-full max-w-[360px] mx-auto text-center">
        <motion.div
          aria-hidden="true"
          className="flex justify-center text-[28px] text-[#F29A8D] mb-3"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <FaHeart />
        </motion.div>

        <p className="text-[13px] leading-relaxed text-[#FFF3D6]/90 mb-4">
          Let&apos;s build something interesting together.
        </p>

        <a
          href={MAILTO}
          className={`inline-block px-7 py-2.5 rounded-full bg-[#F4C96B] text-[#263238] font-arcade text-[11px] tracking-wider hover:bg-[#ffe082] transition-colors shadow-lg mb-4 ${FOCUS}`}
        >
          CONTACT ME
        </a>

        <div className="grid grid-cols-2 gap-2">
          {socialLinks.map((link) => {
            const Icon = ICONS[link.icon];
            const isMail = link.url.startsWith('mailto:');
            return (
              <a
                key={link.name}
                href={link.url}
                // mailto tidak perlu tab baru (bisa meninggalkan tab kosong)
                {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className={`flex items-center justify-center gap-2 h-10 rounded-lg bg-[#237F85] border border-[#63C8CC]/50 text-[12px] font-medium hover:bg-[#2e9da4] transition-colors ${FOCUS}`}
              >
                <span aria-hidden="true" className="inline-flex items-center">
                  {Icon ? <Icon className="w-3.5 h-3.5" /> : null}
                </span>
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </ScreenFrame>
  );
}