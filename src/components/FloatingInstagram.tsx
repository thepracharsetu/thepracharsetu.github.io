import React from 'react';
import { motion } from 'motion/react';
import { Instagram, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function FloatingInstagram() {
  const location = useLocation();
  const isShown = location.pathname === '/' || location.pathname === '/contact';

  if (!isShown) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[99] flex flex-col gap-3.5 pointer-events-none">
      {/* WhatsApp Floating Button */}
      <motion.a
        id="floating-whatsapp"
        href="https://wa.me/910000000000" // Placeholder phone number to be updated later by the user
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1, translateY: -3 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full border border-emerald-500/20 bg-[#001133]/90 backdrop-blur-md shadow-lg shadow-emerald-500/10 interactive-hover group relative overflow-hidden"
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
        
        {/* Subtle pulsing green status indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      </motion.a>

      {/* Instagram Floating Button */}
      <motion.a
        id="floating-instagram"
        href="https://instagram.com/thepracharsetu"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1, translateY: -3 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full border border-[#D4AF37]/20 bg-[#001133]/90 backdrop-blur-md shadow-lg shadow-[#D4AF37]/10 interactive-hover group relative overflow-hidden"
        title="Follow us on Instagram"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Instagram className="w-5 h-5 text-[#D4AF37] group-hover:text-amber-300 transition-colors duration-300" />
        
        {/* Subtle pulsing gold status indicator */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#AA7C11]"></span>
        </span>
      </motion.a>
    </div>
  );
}
