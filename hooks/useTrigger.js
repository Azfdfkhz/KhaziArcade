import { useEffect, useRef } from 'react';

// Menjalankan callback hanya ketika `trigger` BERUBAH setelah mount.
// Trigger lama yang masih tersimpan di state induk (mis. sisa tombol SELECT
// dari layar sebelumnya) diabaikan, sehingga layar baru tidak langsung
// "terpencet" saat dibuka.
export function useTrigger(trigger, callback) {
  const seen = useRef(trigger);
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    if (!trigger || trigger === seen.current) return;
    seen.current = trigger;
    cbRef.current(trigger);
  }, [trigger]);
}
