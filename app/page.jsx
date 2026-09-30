"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CRTOverlay from "@/components/ui/CRTOverlay";
import OpeningReveal from "@/components/ui/OpeningReveal";
import ArcadeScreen from "@/components/screen/ArcadeScreen";
import AttractScreen from "@/components/screen/AttractScreen";
import ControlDeck from "@/components/ui/ControlDeck";
import { SCREEN_LOGICAL_W, SCREEN_LOGICAL_H } from "@/utils/screen";
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
  const [introActive, setIntroActive] = useState(false);
  const [introScreenVisible, setIntroScreenVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeScreen, setActiveScreen] = useState("menu");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // 3D Model interactive animation state
  const [joystickDir, setJoystickDir] = useState("idle");
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [horizontalNavTrigger, setHorizontalNavTrigger] = useState(null);

  // Ref mesh layar 3D & elemen overlay UI (dihubungkan oleh ScreenTracker)
  const screenRef = useRef(null);
  const screenOverlayRef = useRef(null);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setIntroScreenVisible(false);
    setIntroActive(true);
  }, []);

  // Play the opening cinematic once after the loading screen.
  useEffect(() => {
    if (!introActive) {
      setIntroScreenVisible(false);
      return;
    }

    const screenTimer = setTimeout(() => {
      setIntroScreenVisible(true);
    }, 3550);

    const introTimer = setTimeout(() => {
      setIntroActive(false);
      setIntroScreenVisible(true);
    }, 5350);

    return () => {
      clearTimeout(screenTimer);
      clearTimeout(introTimer);
    };
  }, [introActive]);

  const handleStart = useCallback(() => {
    if (introActive) return;

    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 200);
    playSound("start", soundEnabled);
    setStarted(true);
    setActiveScreen("menu");
  }, [soundEnabled, introActive]);

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

  const flashButton = () => {
    setIsButtonPressed(true);
    setTimeout(() => setIsButtonPressed(false), 200);
  };

  const pressDir = (dir) => {
    setJoystickDir(dir);
    setTimeout(() => setJoystickDir("idle"), 200);
    playSound("move", soundEnabled);
    if (dir === "up" && activeScreen === "menu") {
      setSelectedIndex((p) => (p - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
    } else if (dir === "down" && activeScreen === "menu") {
      setSelectedIndex((p) => (p + 1) % MENU_ITEMS.length);
    } else if (dir === "left" || dir === "right") {
      handleHorizontalNav(dir);
    }
  };

  const pressSelect = () => {
    flashButton();
    if (activeScreen === "menu") handleMenuSelect(selectedIndex);
  };

  const pressBack = () => {
    flashButton();
    if (activeScreen !== "menu") handleNavigate("menu");
    else handleHomeClick();
  };

  // Klik tombol fisik pada model 3D
  const handlePartPress = (name) => {
    if (!started) return handleStart();
    if (name.startsWith("Coin_Button")) return;
    pressSelect();
  };

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-[#F8F6EF] font-sans select-none">
      {/* Keyboard navigation & controller */}
      <ArcadeInteraction
        activeScreen={activeScreen}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onNavigate={handleNavigate}
        started={started}
        introActive={introActive}
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
          <header
            className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-none transition-opacity duration-500 ${
              introActive ? "opacity-0" : "opacity-100"
            }`}
          >
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

          {/* ================= 3D ARCADE VIEWPORT (full screen) ================= */}
          <div className="absolute inset-0 z-0">
            <ArcadeScene
              zoomedIn={started}
              intro={introActive}
              joystickDir={joystickDir}
              isButtonPressed={isButtonPressed}
              screenRef={screenRef}
              screenOverlayRef={screenOverlayRef}
              introScreenVisible={introScreenVisible}
              onPartPress={handlePartPress}
            />
          </div>

          {/* ================= UI LAYAR: menempel tepat di mesh layar 3D ================= */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            <div
              ref={screenOverlayRef}
              className="absolute left-0 top-0 origin-top-left opacity-0 pointer-events-auto overflow-hidden rounded-[18px] bg-[#15484c]"
              style={{ width: SCREEN_LOGICAL_W, height: SCREEN_LOGICAL_H }}
            >
              <AnimatePresence mode="wait">
                {started ? (
                  <motion.div
                    key="game"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArcadeScreen
                      activeScreen={activeScreen}
                      onNavigate={handleNavigate}
                      selectedIndex={selectedIndex}
                      onSelect={handleMenuSelect}
                      horizontalNavTrigger={horizontalNavTrigger}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="attract"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AttractScreen onStart={handleStart} />
                  </motion.div>
                )}
              </AnimatePresence>
              <CRTOverlay />
            </div>
          </div>

          {/* ================= DEKORASI SISI (tidak menutupi arcade) ================= */}
          <AnimatePresence>
            {!started && !introActive && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="hidden lg:flex flex-col justify-center absolute left-10 xl:left-16 top-1/2 -translate-y-1/2 text-left">
                  <span className="text-[#237F85] font-semibold text-2xl xl:text-3xl tracking-tight leading-tight">
                    Small<br />
                    Steps<br />
                    Big<br />
                    Games.
                  </span>
                </div>

                <div className="hidden lg:flex flex-col justify-center items-end absolute right-10 xl:right-16 top-1/2 -translate-y-1/2 text-right">
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

                <footer className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-4 text-[11px] font-mono text-[#263238]/60">
                  <span>Portfolio 2026</span>
                  <div className="flex items-center gap-2">
                    <span>Press Start / Enter</span>
                    <button
                      onClick={handleStart}
                      aria-label="Start"
                      className="pointer-events-auto w-5 h-5 rounded-full border border-[#237F85] flex items-center justify-center font-bold text-[9px] text-[#237F85] hover:bg-[#237F85] hover:text-white transition-colors cursor-pointer"
                    >
                      O
                    </button>
                  </div>
                </footer>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================= OPENING CINEMATIC ================= */}
          <AnimatePresence>
            {introActive && <OpeningReveal />}
          </AnimatePresence>

          {/* ================= KONTROL KOMPAK (setelah START) ================= */}
          {started && (
            <ControlDeck
              isMenu={activeScreen === "menu"}
              onDir={pressDir}
              onSelect={pressSelect}
              onBack={pressBack}
            />
          )}
        </div>
      )}
    </main>
  );
}
