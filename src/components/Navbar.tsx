import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll detection for glass background updates
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent horizontal scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/services', label: 'SERVICES' },
    { path: '/portfolio', label: 'PORTFOLIO' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      <motion.header
        id="main-navigation"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
          isScrolled 
            ? 'py-4 bg-[#F7F5F2]/90 backdrop-blur-md border-b border-[#001133]/5' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 flex justify-between items-center">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 interactive-hover group">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center relative bg-[#001133]/5 overflow-hidden transition-all duration-300 group-hover:border-[#AA7C11]">
              <span className="text-[#AA7C11] font-space text-sm font-semibold tracking-wider relative z-10">PS</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-space font-medium tracking-[0.25em] text-[#002366] leading-tight group-hover:text-[#AA7C11] transition-colors duration-300">
                THE PRACHAR SETU
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#002366]/40 uppercase">
                Digital Growth Agency
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs tracking-[0.2em] font-space font-medium transition-colors duration-300 hover-gold-underline py-2 ${
                    isActive ? 'text-[#AA7C11]' : 'text-[#002366]/70 hover:text-[#002366]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Connect Call To Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/contact" 
              className="px-6 py-2.5 rounded-full text-xs font-space tracking-widest text-[#F7F5F2] bg-[#001133] relative overflow-hidden group interactive-hover border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-bold">
                GET IN TOUCH <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
            </Link>
          </div>

          {/* Mobile Burger Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-full border border-[#002366]/10 text-[#002366] hover:bg-[#002366]/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {isOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, y: '-10%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-10%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[998] md:hidden bg-[#F7F5F2] pt-28 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            {/* Top background accent details */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
              <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full border border-[#002366] animate-slow-spin" />
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-6 relative z-10 my-auto">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#AA7C11] mb-2 block">MENU</span>
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-3xl font-space tracking-wide font-light block py-2 focus:text-[#AA7C11] focus:outline-none ${
                        isActive ? 'text-[#AA7C11] font-medium' : 'text-[#002366]/80'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Footer Area */}
            <div className="flex flex-col gap-6 relative z-10 border-t border-[#002366]/10 pt-6 mt-6">
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-[#AA7C11] font-mono tracking-wider">EMAIL US</span>
                <span className="text-[#002366]/70">thepracharsetu@gmail.com</span>
              </div>
              
              <Link
                to="/contact"
                className="w-full text-center py-3.5 rounded-full text-xs font-space tracking-widest text-[#F7F5F2] bg-[#001133] relative overflow-hidden flex items-center justify-center gap-2 border border-[#D4AF37]/40 font-bold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                GET FREE CONSULTATION <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
