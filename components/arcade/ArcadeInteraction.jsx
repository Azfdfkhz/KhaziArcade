'use client';

import { useEffect, useCallback } from 'react';
import { playSound } from '@/utils/audio';

const MENU_ITEMS = ['about', 'projects', 'skills', 'experience', 'contact'];

export default function ArcadeInteraction({
  activeScreen,
  selectedIndex,
  setSelectedIndex,
  onNavigate,
  started,
  introActive = false,
  onStart,
  soundEnabled = true,
  setJoystickDir,
  setIsButtonPressed,
  onHorizontalNav,
  onSelectKey,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      // Avoid intercepting if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (introActive) return;

      if (!started) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsButtonPressed?.(true);
          playSound('start', soundEnabled);
          onStart();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          setJoystickDir?.('up');
          if (activeScreen === 'menu') {
            playSound('move', soundEnabled);
            setSelectedIndex((prev) => (prev - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
          }
          break;

        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          setJoystickDir?.('down');
          if (activeScreen === 'menu') {
            playSound('move', soundEnabled);
            setSelectedIndex((prev) => (prev + 1) % MENU_ITEMS.length);
          }
          break;

        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          setJoystickDir?.('left');
          playSound('move', soundEnabled);
          if (onHorizontalNav) onHorizontalNav('left');
          break;

        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          setJoystickDir?.('right');
          playSound('move', soundEnabled);
          if (onHorizontalNav) onHorizontalNav('right');
          break;

        case 'Enter':
          e.preventDefault();
          setIsButtonPressed?.(true);
          if (activeScreen === 'menu') {
            playSound('select', soundEnabled);
            onNavigate(MENU_ITEMS[selectedIndex]);
          } else {
            playSound('select', soundEnabled);
            if (onSelectKey) onSelectKey();
          }
          break;

        case 'Escape':
        case 'Backspace':
          e.preventDefault();
          setIsButtonPressed?.(true);
          if (activeScreen !== 'menu') {
            playSound('back', soundEnabled);
            onNavigate('menu');
          }
          break;

        default:
          break;
      }
    },
    [
      activeScreen,
      selectedIndex,
      setSelectedIndex,
      onNavigate,
      started,
      introActive,
      onStart,
      soundEnabled,
      setJoystickDir,
      setIsButtonPressed,
      onHorizontalNav,
      onSelectKey,
    ]
  );

  const handleKeyUp = useCallback(
    (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
        setJoystickDir?.('idle');
      }
      if (['Enter', ' ', 'Escape', 'Backspace'].includes(e.key)) {
        setIsButtonPressed?.(false);
      }
    },
    [setJoystickDir, setIsButtonPressed]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return null;
}
