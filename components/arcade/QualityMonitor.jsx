'use client';

import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { TIERS } from '@/utils/quality';

// Pengukuran FPS dalam jendela WINDOW_S detik.
const WINDOW_S = 2;
const WARMUP_S = 3; // abaikan awal: kompilasi shader, parsing model, intro kamera
const GRACE_S = 2; // jeda setelah pergantian tier (kompilasi ulang shader)

const DOWN_FPS = 40; // di bawah ini dianggap tidak mulus
const UP_FPS = 57; // di atas ini dianggap punya sisa tenaga
const DOWN_WINDOWS = 2; // turun cepat: 2 jendela berturut-turut (~4 dtk)
const UP_WINDOWS = 5; // naik hati-hati: 5 jendela berturut-turut (~10 dtk)
const FLIPFLOP_MS = 20000; // turun lagi <20 dtk setelah naik => kunci tier atas

/**
 * Memantau FPS aktual dan memanggil onTierChange(tier) saat kualitas perlu
 * diturunkan / dinaikkan satu tingkat. Render null; harus di dalam <Canvas>.
 */
export default function QualityMonitor({ tier, onTierChange, enabled = true }) {
  const cb = useRef(onTierChange);
  useEffect(() => {
    cb.current = onTierChange;
  });

  const s = useRef({
    tier,
    frames: 0,
    time: 0,
    hold: WARMUP_S,
    low: 0,
    high: 0,
    maxIdx: TIERS.length - 1,
    lastUpAt: -Infinity,
  });

  // Setelah tier berubah: beri waktu shader dikompilasi ulang sebelum mengukur lagi
  useEffect(() => {
    const st = s.current;
    if (st.tier === tier) return;
    st.tier = tier;
    st.frames = 0;
    st.time = 0;
    st.low = 0;
    st.high = 0;
    st.hold = GRACE_S;
  }, [tier]);

  useFrame((_, delta) => {
    if (!enabled) return;
    const st = s.current;

    // Tab di background / frame sangat lambat bukan sinyal performa GPU
    if (document.hidden || delta > 0.5) {
      st.frames = 0;
      st.time = 0;
      return;
    }
    if (st.hold > 0) {
      st.hold -= delta;
      return;
    }

    st.frames += 1;
    st.time += delta;
    if (st.time < WINDOW_S) return;

    const fps = st.frames / st.time;
    st.frames = 0;
    st.time = 0;

    if (fps < DOWN_FPS) {
      st.low += 1;
      st.high = 0;
    } else if (fps >= UP_FPS) {
      st.high += 1;
      st.low = 0;
    } else {
      st.low = 0;
      st.high = 0;
    }

    const idx = TIERS.indexOf(st.tier);

    if (st.low >= DOWN_WINDOWS && idx > 0) {
      // Naik lalu langsung turun lagi = tier atas tidak sanggup. Kunci supaya
      // kualitas tidak bolak-balik (dan tidak memicu kompilasi ulang berulang).
      if (performance.now() - st.lastUpAt < FLIPFLOP_MS) st.maxIdx = idx - 1;
      st.low = 0;
      console.info(`[quality] ${TIERS[idx]} → ${TIERS[idx - 1]} (${fps.toFixed(0)} fps)`);
      cb.current?.(TIERS[idx - 1]);
    } else if (st.high >= UP_WINDOWS && idx < Math.min(st.maxIdx, TIERS.length - 1)) {
      st.high = 0;
      st.lastUpAt = performance.now();
      console.info(`[quality] ${TIERS[idx]} → ${TIERS[idx + 1]} (${fps.toFixed(0)} fps)`);
      cb.current?.(TIERS[idx + 1]);
    }
  });

  return null;
}
