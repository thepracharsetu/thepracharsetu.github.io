import React, { useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Soft elastic spring feel for the top loading bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollPercentage(Math.floor(latest * 100));
  });

  return (
    <>
      {/* Top indicator timeline */}
      <motion.div
        id="scroll-timeline"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA7C11] origin-left z-[9999] pointer-events-none"
      />

      {/* Floating Radial Scroll Indicator (Awwwards Style) */}
      <motion.div
        id="scroll-radial-indicator"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: scrollPercentage > 2 ? 1 : 0, scale: scrollPercentage > 2 ? 1 : 0.8 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-28 right-8 z-[99] hidden md:flex items-center justify-center w-12 h-12 rounded-full navy-glass-card shadow-lg cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r="16"
            className="stroke-white/10"
            strokeWidth="1.5"
            fill="transparent"
          />
          <motion.circle
            cx="20"
            cy="20"
            r="16"
            className="stroke-[#D4AF37]"
            strokeWidth="1.5"
            fill="transparent"
            strokeDasharray={100}
            strokeDashoffset={100 - scrollPercentage}
            style={{
              strokeLinecap: 'round',
            }}
          />
        </svg>
        <span className="absolute text-[8px] font-mono font-medium text-[#D4AF37]">
          {scrollPercentage}%
        </span>
      </motion.div>
    </>
  );
}
