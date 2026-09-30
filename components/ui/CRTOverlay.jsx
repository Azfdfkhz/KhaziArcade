'use client';

export default function CRTOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 70%, rgba(0,0,0,0.12) 100%)',
        }}
      />

      {/* Screen glow */}
      <div className="absolute inset-0 bg-[#63C8CC]/[0.02]" />
    </div>
  );
}
