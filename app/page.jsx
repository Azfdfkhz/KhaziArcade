"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CRTOverlay from "@/components/ui/CRTOverlay";
import ArcadeScreen from "@/components/screen/ArcadeScreen";
import ArcadeInteraction from "@/components/arcade/ArcadeInteraction";
import { playSound } from "@/utils/audio";

// Dynamic import for 3D scene (no SSR)
const ArcadeScene = dynamic(
  () => import("@/components/arcade/ArcadeScene"),
  { ssr: false }
);

const MENU_ITEMS = ["about", "projects", "skills", "experience", "contact"];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [activeScreen, setActiveScreen] = useState("menu");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 3D Model interactive animation state
  const [joystickDir, setJoystickDir] = useState("idle");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [horizontalNavTrigger, setHorizontalNavTrigger] = useState(null);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleStart = useCallback(() => {
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 200);
    playSound("start", soundEnabled);
    setStarted(true);
    setActiveScreen("menu");
  }, [soundEnabled]);

  const handleNavigate = useCallback(
    (screen) => {
      playSound(screen === "menu" ? "back" : "select", soundEnabled);
      setActiveScreen(screen);
      if (!started) {
        setStarted(true);
      }
    },
    [soundEnabled, started]
  );

  const handleMenuSelect = useCallback(
    (index) => {
      setSelectedIndex(index);
      handleNavigate(MENU_ITEMS[index]);
    },
    [handleNavigate]
  );

  const handleHorizontalNav = useCallback((direction) => {
    setHorizontalNavTrigger({ direction, timestamp: Date.now() });
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  const handleHomeClick = () => {
    playSound("back", soundEnabled);
    setStarted(false);
    setActiveScreen("menu");
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#F8F6EF] font-sans select-none">
      {/* Keyboard navigation & controller */}
      <ArcadeInteraction
        activeScreen={activeScreen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onNavigate={handleNavigate}
        started={started}
        onStart={handleStart}
        soundEnabled={soundEnabled}
        setJoystickDir={setJoystickDir}
        setIsButtonPressed={setIsButtonPressed}
        onHorizontalNav={handleHorizontalNav}
      />

      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <div className="relative w-full h-full flex flex-col justify-between">
          {/* ================= TOP NAVIGATION BAR (from Frame 1) ================= */}
          <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-none">
            {/* Logo */}
            <div className="pointer-events-auto cursor-pointer" onClick={handleHomeClick}>
              <h1 className="font-arcade text-[#237F85] text-base sm:text-lg tracking-widest font-bold">
                KHΔZ
              </h1>
              <p className="text-[10px] text-[#263238]/60 tracking-wider font-mono">
                Creative Developer
              </p>
            </div>

            {/* Nav Links */}
            <nav className="pointer-events-auto flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-medium text-[#263238]/80 font-mono">
              <button
                onClick={handleHomeClick}
                className={`hover:text-[#237F85] transition-colors cursor-pointer ${
                  !started ? "text-[#237F85] font-bold underline underline-offset-4" : ""
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate("about")}
                className={`hover:text-[#237F85] transition-colors cursor-pointer ${
                  started && activeScreen === "about"
                    ? "text-[#237F85] font-bold underline underline-offset-4"
                    : ""
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavigate("projects")}
                className={`hover:text-[#237F85] transition-colors cursor-pointer ${
                  started && activeScreen === "projects"
                    ? "text-[#237F85] font-bold underline underline-offset-4"
                    : ""
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => handleNavigate("contact")}
                className={`hover:text-[#237F85] transition-colors cursor-pointer ${
                  started && activeScreen === "contact"
                    ? "text-[#237F85] font-bold underline underline-offset-4"
                    : ""
                }`}
              >
                Contact
              </button>

              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
                className="ml-2 w-8 h-8 rounded-full bg-white/70 hover:bg-white border border-[#237F85]/20 flex items-center justify-center text-xs shadow-sm transition-all"
                title={soundEnabled ? "Mute Sound" : "Enable Sound"}
              >
                {soundEnabled ? "🔊" : "🔇"}
              </button>
            </nav>
          </header>

          {/* ================= 3D ARCADE VIEWPORT ================= */}
          <div className="absolute inset-0 z-0">
            <ArcadeScene
              zoomedIn={started}
              joystickDir={joystickDir}
              isButtonPressed={isButtonPressed}
            />
          </div>

          {/* ================= ROOM DECORATIONS (Frame 1 Overlay) ================= */}
          <AnimatePresence>
            {!started && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Left Wall Typography ("Small Steps Big Games.") */}
                <div className="hidden md:flex flex-col justify-center absolute left-10 lg:left-16 top-1/2 -translate-y-1/2 text-left">
                  <span className="text-[#237F85] font-semibold text-2xl lg:text-3xl tracking-tight leading-tight">
                    Small<br />
                    Steps<br />
                    Big<br />
                    Games.
                  </span>
                </div>

                {/* Right Wall Sticky Notes ("Build Create Explore ->") */}
                <div className="hidden md:flex flex-col justify-center items-end absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 text-right">
                  <div className="bg-[#FFF3D6] p-4 rounded-xl shadow-md border border-[#F4C96B]/30 max-w-[140px] text-left transform rotate-2">
                    <p className="text-[11px] font-mono text-[#263238] font-bold leading-relaxed mb-1">
                      Build<br />
                      Create<br />
                      Explore
                    </p>
                    <span className="text-sm text-[#237F85]">→</span>
                  </div>

                  <div className="flex gap-2 mt-3 mr-2">
                    <div className="w-5 h-5 bg-[#63C8CC] rounded-sm shadow-sm opacity-80" />
                    <div className="w-5 h-5 bg-[#F29A8D] rounded-sm shadow-sm opacity-80" />
                  </div>
                </div>

                {/* ARCADE SCREEN OVERLAY IN LANDING MODE (Frame 1) */}
                <div className="absolute inset-0 flex items-center justify-center pb-10 pointer-events-none">
                  <motion.div
                    onClick={handleStart}
                    className="pointer-events-auto cursor-pointer flex flex-col items-center justify-center text-center p-3.5 sm:p-5 rounded-xl bg-[#15484c]/95 border-2 border-[#63C8CC]/60 shadow-2xl max-w-[210px] sm:max-w-[240px] h-[175px] sm:h-[195px] font-arcade hover:border-[#F4C96B] transition-all transform hover:scale-105 group relative overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#63C8CC]/10 to-transparent pointer-events-none" />
                    <p className="text-[#63C8CC] text-[8px] sm:text-[9px] tracking-[0.25em] mb-1.5 uppercase font-bold">
                      WELCOME TO
                    </p>
                    <h2 className="text-[#FFF3D6] text-[10px] sm:text-xs tracking-[0.2em] mb-4 font-bold group-hover:text-[#F4C96B] transition-colors">
                      MY PORTFOLIO
                    </h2>
                    <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-[#F4C96B]/60 text-[#F4C96B] text-[8px] sm:text-[9px] tracking-[0.25em] animate-blink font-bold shadow-md">
                      PRESS START
                    </div>
                    <span className="text-[6px] sm:text-[7px] text-[#FFF3D6]/50 mt-3 tracking-widest font-mono">
                      [ CLICK OR ENTER ]
                    </span>
                    <CRTOverlay />
                  </motion.div>
                </div>

                {/* Bottom Bar: "Portfolio 2026" & "Scroll / Press Start [O]" */}
                <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-5 text-[11px] font-mono text-[#263238]/60">
                  <span>Portfolio 2026</span>
                  <div className="flex items-center gap-2">
                    <span>Scroll / Press Start</span>
                    <button
                      onClick={handleStart}
                      className="pointer-events-auto w-5 h-5 rounded-full border border-[#237F85] flex items-center justify-center font-bold text-[9px] text-[#237F85] hover:bg-[#237F85] hover:text-white transition-colors cursor-pointer"
                    >
                      O
                    </button>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= IN-GAME ARCADE SCREEN DISPLAY (Frames 2-8) ================= */}
          <AnimatePresence>
            {started && (
              <motion.div
                className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Spacer for top nav bar */}
                <div className="h-16" />

                {/* THE ARCADE SCREEN: Framed by the 3D Cabinet */}
                <div className="flex-1 flex items-center justify-center px-4 py-2 pointer-events-none">
                  <motion.div
                    className="pointer-events-auto relative w-full max-w-[360px] sm:max-w-[440px] md:max-w-[480px] h-[390px] sm:h-[420px] md:h-[450px] rounded-2xl bg-[#15484c] border-4 border-[#1a5c61] shadow-2xl overflow-hidden screen-glow"
                    initial={{ scale: 0.85, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <ArcadeScreen
                      activeScreen={activeScreen}
                      onNavigate={handleNavigate}
                      selectedIndex={selectedIndex}
                      onSelect={handleMenuSelect}
                      horizontalNavTrigger={horizontalNavTrigger}
                    />
                    <CRTOverlay />
                  </motion.div>
                </div>

                {/* Bottom Interactive Control Deck */}
                <footer className="w-full flex items-center justify-between px-4 sm:px-8 py-3 bg-[#263238]/90 backdrop-blur-md border-t border-white/10 pointer-events-auto">
                  {/* Left: D-Pad Controls */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setJoystickDir("up");
                        setTimeout(() => setJoystickDir("idle"), 200);
                        if (activeScreen === "menu") {
                          playSound("move", soundEnabled);
                          setSelectedIndex(
                            (p) => (p - 1 + MENU_ITEMS.length) % MENU_ITEMS.length
                          );
                        }
                      }}
                      className="w-8 h-8 rounded-lg bg-[#237F85] text-[#FFF3D6] border border-[#63C8CC]/40 flex items-center justify-center text-xs active:scale-90 hover:bg-[#2a939a] transition-all cursor-pointer shadow-sm"
                      aria-label="Up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => {
                        setJoystickDir("down");
                        setTimeout(() => setJoystickDir("idle"), 200);
                        if (activeScreen === "menu") {
                          playSound("move", soundEnabled);
                          setSelectedIndex(
                            (p) => (p + 1) % MENU_ITEMS.length
                          );
                        }
                      }}
                      className="w-8 h-8 rounded-lg bg-[#237F85] text-[#FFF3D6] border border-[#63C8CC]/40 flex items-center justify-center text-xs active:scale-90 hover:bg-[#2a939a] transition-all cursor-pointer shadow-sm"
                      aria-label="Down"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => {
                        setJoystickDir("left");
                        setTimeout(() => setJoystickDir("idle"), 200);
                        playSound("move", soundEnabled);
                        handleHorizontalNav("left");
                      }}
                      className="w-8 h-8 rounded-lg bg-[#237F85] text-[#FFF3D6] border border-[#63C8CC]/40 flex items-center justify-center text-xs active:scale-90 hover:bg-[#2a939a] transition-all cursor-pointer shadow-sm"
                      aria-label="Left"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => {
                        setJoystickDir("right");
                        setTimeout(() => setJoystickDir("idle"), 200);
                        playSound("move", soundEnabled);
                        handleHorizontalNav("right");
                      }}
                      className="w-8 h-8 rounded-lg bg-[#237F85] text-[#FFF3D6] border border-[#63C8CC]/40 flex items-center justify-center text-xs active:scale-90 hover:bg-[#2a939a] transition-all cursor-pointer shadow-sm"
                      aria-label="Right"
                    >
                      ▶
                    </button>
                  </div>

                  {/* Center hint */}
                  <span className="hidden sm:inline font-mono text-[10px] text-[#FFF3D6]/60 tracking-wider">
                    Arrow keys / W A S D / Enter / Esc
                  </span>

                  {/* Right: Action & Back buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsButtonPressed(true);
                        setTimeout(() => setIsButtonPressed(false), 200);
                        if (activeScreen === "menu") {
                          playSound("select", soundEnabled);
                          handleMenuSelect(selectedIndex);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#63C8CC] text-[#237F85] font-arcade text-[9px] font-bold active:scale-95 shadow-md flex items-center gap-1.5 hover:bg-[#7be0e4] transition-all cursor-pointer"
                      aria-label="Select Action"
                    >
                      <span>●</span>
                      <span>SELECT</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsButtonPressed(true);
                        setTimeout(() => setIsButtonPressed(false), 200);
                        if (activeScreen !== "menu") {
                          playSound("back", soundEnabled);
                          handleNavigate("menu");
                        } else {
                          handleHomeClick();
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#F29A8D] text-white font-arcade text-[9px] font-bold active:scale-95 shadow-md flex items-center gap-1.5 hover:bg-[#f6b0a5] transition-all cursor-pointer"
                      aria-label="Back / Exit"
                    >
                      <span>◀</span>
                      <span>{activeScreen === "menu" ? "EXIT" : "BACK"}</span>
                    </button>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
}
