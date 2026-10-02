/**
 * Adaptive 3D quality system.
 *
 * Tiga preset (low < medium < high). Tier awal dipilih dari kemampuan
 * perangkat (lihat getInitialQuality), lalu QualityMonitor menaikkan /
 * menurunkannya berdasarkan FPS aktual.
 *
 * Catatan desain: `shadows` pada <Canvas> sengaja SELALU aktif. Yang diatur
 * per tier adalah `castShadow` pada lampu utama, karena three.js otomatis
 * mengkompilasi ulang shader & melewati shadow pass saat tidak ada lampu yang
 * melempar bayangan. Hasilnya sama, tetapi tidak perlu mengutak-atik state
 * renderer saat runtime.
 */

export const TIERS = ['low', 'medium', 'high'];

export const QUALITY_PRESETS = {
  high: {
    dpr: [1, 1.5],
    castShadow: true,
    shadowMapSize: 1024,
    contactShadows: true,
    environment: true,
    outline: 'full', // arcade + kota
    lights: ['ambient', 'key', 'fill', 'rim', 'screen', 'marquee', 'neonCyan', 'neonPeach', 'wall'],
  },
  medium: {
    dpr: 1,
    castShadow: true,
    shadowMapSize: 512,
    contactShadows: false,
    environment: true,
    outline: 'important', // hanya mesin arcade, kota tanpa garis
    lights: ['ambient', 'key', 'fill', 'rim', 'screen', 'wall'],
  },
  low: {
    dpr: 1,
    castShadow: false,
    shadowMapSize: 512,
    contactShadows: false,
    environment: false, // tanpa HDR environment (hemat unduhan + PMREM)
    outline: 'off',
    lights: ['ambient', 'key', 'fill', 'screen'],
  },
};

// GPU yang jelas-jelas rendering lewat CPU
const SOFTWARE_RENDERER = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i;
// iGPU Intel (Arc adalah GPU diskrit, jadi dikecualikan)
const INTEL_INTEGRATED = /Intel(?!.*\bArc\b)/i;

/**
 * Probe WebGL2 lewat canvas sementara (context langsung dilepas lagi).
 * three.js r163+ hanya mendukung WebGL2, jadi WebGL1 tidak dianggap cukup.
 * Hasil ini juga bisa dipakai untuk keputusan fallback 2D.
 */
export function probeGPU() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) return { supported: false, renderer: '', maxTextureSize: 0 };

    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '') : '';
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 0;
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    return { supported: true, renderer, maxTextureSize };
  } catch {
    return { supported: false, renderer: '', maxTextureSize: 0 };
  }
}

function detectDeviceClass() {
  const ua = navigator.userAgent || '';
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const shortSide = Math.min(window.screen?.width ?? 0, window.screen?.height ?? 0);
  // iPadOS menyamar sebagai Mac, bedanya: punya layar sentuh
  const iPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;

  const phone =
    /iPhone|iPod|Android.*Mobile/i.test(ua) || (coarse && shortSide > 0 && shortSide < 600);
  if (phone) return 'phone';

  const tablet = /iPad|Android/i.test(ua) || iPadOS || (coarse && shortSide >= 600);
  return tablet ? 'tablet' : 'desktop';
}

/** Override manual untuk QA: tambahkan ?quality=low|medium|high ke URL. */
function readForcedTier() {
  try {
    const q = new URLSearchParams(window.location.search).get('quality');
    return TIERS.includes(q) ? q : null;
  } catch {
    return null;
  }
}

/**
 * Pilih tier awal. Hanya dipanggil di client (scene di-load dengan ssr:false).
 * @returns {{ tier: 'low'|'medium'|'high', forced: boolean, device: string, gpu: object }}
 */
export function getInitialQuality() {
  const gpu = probeGPU();
  const device = detectDeviceClass();

  const forcedTier = readForcedTier();
  if (forcedTier) return { tier: forcedTier, forced: true, device, gpu };

  const memory = navigator.deviceMemory; // hanya Chromium; undefined di Safari/Firefox
  const cores = navigator.hardwareConcurrency || 4;

  let tier = 'high';

  if (!gpu.supported || SOFTWARE_RENDERER.test(gpu.renderer) || gpu.maxTextureSize < 4096) {
    tier = 'low';
  } else if (device === 'phone') {
    tier = (memory && memory <= 2) || cores <= 4 ? 'low' : 'medium';
  } else if (device === 'tablet') {
    tier = 'medium';
  } else if ((memory && memory <= 4) || cores <= 4 || INTEL_INTEGRATED.test(gpu.renderer)) {
    // Desktop / laptop dengan spesifikasi sedang atau iGPU: mulai dari medium,
    // naik ke high otomatis kalau FPS terbukti stabil.
    tier = 'medium';
  }

  return { tier, forced: false, device, gpu };
}
