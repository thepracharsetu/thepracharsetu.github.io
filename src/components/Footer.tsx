import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Instagram, Linkedin, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#001133] text-[#F7F5F2] pt-20 pb-12 relative overflow-hidden border-t border-[#D4AF37]/20">
      {/* Abstract Background Ring */}
      <div className="absolute -bottom-1/3 -left-1/4 w-[800px] h-[800px] rounded-full border border-[#D4AF37]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-12 border-b border-[#F7F5F2]/10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-white/5">
                <span className="text-[#D4AF37] font-space text-sm font-semibold tracking-wider">PS</span>
              </div>
              <span className="text-lg font-space font-medium tracking-[0.25em]">
                THE PRACHAR SETU
              </span>
            </div>
            <p className="text-sm text-[#F7F5F2]/60 font-light leading-relaxed max-w-sm">
              We help ambitious businesses grow online. We design professional, fast-loading websites and run digital campaigns that bring you real customers.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-2">
              <a 
                href="https://instagram.com/thepracharsetu" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#F7F5F2]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 interactive-hover"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#F7F5F2]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 interactive-hover"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#F7F5F2]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300 interactive-hover"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Directory Links Column */}
          <div className="lg:col-span-3 lg:col-start-7 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase">DIRECTORY</span>
            <ul className="flex flex-col gap-3 text-sm font-light">
              <li>
                <Link to="/" className="text-[#F7F5F2]/60 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1 group">
                  Home <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-[#F7F5F2]/60 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1 group">
                  Services <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-[#F7F5F2]/60 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1 group">
                  Portfolio <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#F7F5F2]/60 hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1 group">
                  Contact <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-xs font-mono tracking-[0.2em] text-[#D4AF37] uppercase">STAY UPDATED</span>
            <p className="text-xs text-[#F7F5F2]/50 font-light leading-relaxed">
              Subscribe to get tips and news on how to grow your business online and get more customers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 mt-2 w-full relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-4 pr-12 text-xs font-light text-[#F7F5F2] focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/50 transition-all"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1 w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] flex items-center justify-center text-[#001133] hover:scale-105 transition-transform interactive-hover"
                aria-label="Subscribe to newsletter"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>

        </div>

        {/* Big typography footer showcase */}
        <div className="py-8 overflow-hidden select-none pointer-events-none">
          <h2 className="text-[12vw] font-space font-medium tracking-tight text-white/[0.02] text-center uppercase leading-none whitespace-nowrap">
            THE PRACHAR SETU
          </h2>
        </div>

        {/* Copyright & Founder Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-[#F7F5F2]/40 border-t border-[#F7F5F2]/5 pt-6 text-center sm:text-left">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span>&copy; {currentYear} THE PRACHAR SETU. ALL RIGHTS RESERVED.</span>
            <span className="text-[#D4AF37]/80 font-sans tracking-widest text-[9px] uppercase font-semibold">
              FOUNDED BY NARAYAN KUMAR VAISHNAV
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <span>ONLINE & ACTIVE</span>
            <span>POWERED BY REACT</span>
            <span>HIGH PERFORMANCE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
