'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ArcadeMenu from './ArcadeMenu';
import AboutScreen from './AboutScreen';
import ProjectsScreen from './ProjectsScreen';
import SkillsScreen from './SkillsScreen';
import ExperienceScreen from './ExperienceScreen';
import ContactScreen from './ContactScreen';

const screenVariants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.15, ease: 'easeIn' } },
};

export default function ArcadeScreen({
  activeScreen,
  onNavigate,
  selectedIndex,
  onSelect,
  horizontalNavTrigger,
}) {
  const renderScreen = () => {
    switch (activeScreen) {
      case 'menu':
        return <ArcadeMenu selectedIndex={selectedIndex} onSelect={onSelect} />;
      case 'about':
        return <AboutScreen />;
      case 'projects':
        return (
          <ProjectsScreen
            onBack={() => onNavigate('menu')}
            horizontalNavTrigger={horizontalNavTrigger}
          />
        );
      case 'skills':
        return <SkillsScreen />;
      case 'experience':
        return <ExperienceScreen />;
      case 'contact':
        return <ContactScreen />;
      default:
        return <ArcadeMenu selectedIndex={selectedIndex} onSelect={onSelect} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col font-mono select-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="w-full h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
