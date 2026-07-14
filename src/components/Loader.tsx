import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const duration = 1800; // 1.8 seconds loading simulation
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      current += step + Math.random() * 4;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 600); // Allow slide up transition to finish
        }, 400);
      } else {
        setProgress(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Staggered letters for the premium branding
  const brandName = "THE PRACHAR SETU";

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="global-loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-16 bg-[#F7F5F2]"
        >
          {/* Top Info */}
          <div className="flex justify-between items-center text-xs tracking-[0.25em] text-[#D4AF37] font-mono">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              CREATIVE ENGINE v1.2
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              EST. 2026
            </motion.span>
          </div>

          {/* Central Logo and Brand Typography */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="relative mb-6">
              {/* Premium fine golden circle design */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-16 h-16 rounded-full border border-[#D4AF37]/30 flex items-center justify-center relative"
              >
                <div className="absolute inset-0.5 rounded-full border border-dashed border-[#D4AF37]/50 animate-slow-spin" />
                <span className="text-[#D4AF37] font-space text-lg font-semibold">PS</span>
              </motion.div>
            </div>

            <h1 className="text-2xl md:text-4xl font-space font-medium tracking-[0.35em] text-center text-[#002366] flex overflow-hidden">
              {brandName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.4 + index * 0.04,
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="inline-block whitespace-pre"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-xs md:text-sm tracking-[0.15em] text-[#002366] mt-4 font-sans uppercase font-light text-center"
            >
              Luxury Digital Experience Agency
            </motion.p>
          </div>

          {/* Bottom Loading Progress Indicator */}
          <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 font-mono">
            <div className="flex flex-col gap-2 w-full md:max-w-md">
              <div className="flex justify-between text-xs text-[#D4AF37] tracking-widest">
                <span>INITIALIZING ASSETS</span>
                <span>{progress}%</span>
              </div>
              {/* Ultra-thin elegant progress bar */}
              <div className="w-full h-[2px] bg-[#002366]/10 relative overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            <div className="text-right text-[10px] text-[#002366]/40 tracking-widest leading-relaxed hidden md:block">
              PLATFORM VERIFIED • DESIGN SYSTEM OK<br />
              BRUSHES RENDERED • WEBGL CONTAINER READY
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
