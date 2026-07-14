import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';
import { ArrowRight, Sparkles, Send, Eye, ShieldCheck, Globe, HelpCircle, Code, MapPin, Target, Cpu, Video, Award, PenTool, Laptop, Smartphone, Tablet, ChevronDown, ChevronUp, Check, Quote, Mail, Instagram, Youtube, MessageCircle } from 'lucide-react';

// Components
import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import ScrollProgress from './components/ScrollProgress';
import FloatingInstagram from './components/FloatingInstagram';
import ThreeCanvas from './components/ThreeCanvas';

// ----------------- DYNAMIC PAGES -----------------

// 1. HOME VIEW (Premium Landing - Cinematic Scroll Experience)
function HomeView() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Track scroll parameters for the cinematic simulation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Interpolate hero visuals based on scroll progress
  const videoScale = useTransform(scrollYProgress, [0, 0.35, 0.7], [1.1, 1.0, 0.85]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7, 1], [0.95, 0.9, 0.4, 0.1]);
  const videoBlur = useTransform(scrollYProgress, [0, 0.4, 0.8], ["blur(0px)", "blur(4px)", "blur(12px)"]);
  const videoBorderRadius = useTransform(scrollYProgress, [0, 0.3, 0.6], ["0px", "24px", "40px"]);
  
  // Scroll transformations for text layers
  const textY1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const textOpacity1 = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  
  const textY2 = useTransform(scrollYProgress, [0.22, 0.45, 0.6], [80, 0, -80]);
  const textOpacity2 = useTransform(scrollYProgress, [0.22, 0.35, 0.52, 0.6], [0, 1, 1, 0]);

  const textY3 = useTransform(scrollYProgress, [0.62, 0.82, 0.95], [80, 0, -20]);
  const textOpacity3 = useTransform(scrollYProgress, [0.62, 0.72, 0.95], [0, 1, 1]);

  // Statistics counters state
  const [stats, setStats] = useState({ projects: 0, clients: 0, uptime: 0 });
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay was prevented or video failed, automatically showing fallback backdrop:", error);
          setVideoFailed(true);
        });
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const nextProjects = prev.projects < 150 ? prev.projects + 5 : 150;
        const nextClients = prev.clients < 98 ? prev.clients + 3 : 98;
        const nextUptime = prev.uptime < 100 ? prev.uptime + 2 : 100;
        return { projects: nextProjects, clients: nextClients, uptime: nextUptime };
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative bg-[#F7F5F2] overflow-x-hidden"
    >
      <SEO 
        title="Professional Web & Digital Marketing Agency" 
        description="The Prachar Setu helps local and national Indian businesses grow online with high-speed websites, SEO, and maps optimization." 
      />
      {/* 350vh Scroll Capture Section */}
      <div ref={containerRef} className="relative h-[350vh] bg-[#001133]">
        
        {/* Sticky viewport content container */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">
          
          {/* Particle Backing */}
          <ThreeCanvas />

          {/* Interactive Cinematic Video Player Background */}
          <motion.div 
            style={{ 
              scale: videoScale, 
              opacity: videoOpacity, 
              filter: videoBlur,
              borderRadius: videoBorderRadius 
            }}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          >
            {/* Ambient Dark Overlay to match theme style */}
            <div className="absolute inset-0 bg-[#001133]/45 mix-blend-multiply z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#001133]/60 via-transparent to-[#001133] z-10" />
            
            {videoFailed ? (
              <img
                src="/hero-fallback.webp"
                alt="Premium Agency Backdrop Fallback"
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/hero-fallback.webp"
                onError={() => setVideoFailed(true)}
                className="w-full h-full object-cover scale-105"
              >
                <source src="/videos/hero.mp4" type="video/mp4" />
                {/* Fallback backdrops */}
                <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-dust-particles-motion-background-41473-large.mp4" type="video/mp4" />
              </video>
            )}
          </motion.div>

          {/* FRAME 1: Absolute Opener (0% - 30% Scroll) */}
          <motion.div 
            style={{ y: textY1, opacity: textOpacity1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-6 z-20 pointer-events-none"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-white/5 backdrop-blur-md text-[#D4AF37] text-[10px] font-mono tracking-[0.2em] uppercase mb-8">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              THE PRACHAR SETU • DIGITAL GROWTH AGENCY
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-[6rem] font-display font-light text-white leading-[1.05] tracking-tight max-w-5xl">
              GROW YOUR <span className="italic text-[#D4AF37] font-normal">BUSINESS</span> ONLINE.
            </h1>
            <p className="text-sm md:text-base text-white/70 max-w-lg mt-8 font-light tracking-widest font-mono uppercase">
              SCROLL DOWN TO DISCOVER MORE
            </p>
          </motion.div>

          {/* FRAME 2: Slogan revealing on scroll (35% - 65% Scroll) */}
          <motion.div 
            style={{ y: textY2, opacity: textOpacity2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-6 z-20"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] mb-6 block uppercase">01 / DIGITAL CONVERSION</span>
            <h2 className="text-2xl sm:text-4xl md:text-[4rem] font-display font-light text-white leading-tight max-w-4xl">
              We design beautiful, fast, and <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-white to-[#AA7C11]">high-converting</span> websites that bring you real customers.
            </h2>
          </motion.div>

          {/* FRAME 3: Call to action trigger (70% - 100% Scroll) */}
          <motion.div 
            style={{ y: textY3, opacity: textOpacity3 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5 sm:px-6 z-20"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#D4AF37] mb-6 block uppercase">02 / GROW YOUR BRAND</span>
            <h2 className="text-2xl sm:text-4xl md:text-[3.5rem] font-display font-light text-white leading-tight max-w-3xl mb-8">
              Ready to take your business to the next level?
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-space tracking-[0.15em] text-[#001133] bg-[#D4AF37] hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 group interactive-hover font-bold"
              >
                OUR SERVICES <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs font-space tracking-[0.15em] text-white border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center interactive-hover font-bold"
              >
                GET A FREE QUOTE
              </Link>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ABOUT PREVIEW: Solid Professional Value Grid */}
      <section className="py-20 sm:py-32 bg-[#F7F5F2] px-5 sm:px-6 md:px-12 relative overflow-hidden border-t border-[#002366]/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Column Left: High-end copy */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-mono tracking-[0.25em] text-[#AA7C11] uppercase">ABOUT US</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#002366] tracking-tight leading-[1.1]">
                A creative digital agency built to grow your <span className="italic">business</span>.
              </h2>
              <p className="text-sm md:text-base text-[#002366]/70 font-light leading-relaxed">
                The Prachar Setu builds professional, fast-loading websites and runs online marketing campaigns that help you get direct customer inquiries. No pre-made basic templates, only high-performing custom systems.
              </p>
              
              {/* Elegant checklist with gold accents */}
              <div className="flex flex-col gap-3 mt-2 text-xs font-mono text-[#002366]/80">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>CUSTOM WEBSITE DESIGN</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>GOOGLE SEARCH & MAPS OPTIMIZATION</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>FAST & SECURE CLOUD HOSTING</span>
                </div>
              </div>
            </div>

            {/* Column Right: Elegant Glass Interactive Card Stack */}
            <div className="lg:col-span-7 relative">
              <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-3xl blur-3xl pointer-events-none" />
              
              <div className="navy-glass-card rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
                {/* Dash border outline */}
                <div className="absolute inset-0 rounded-2xl border border-dashed border-[#D4AF37]/10 pointer-events-none" />

                <div className="flex justify-between items-start mb-8 sm:mb-12">
                  <div className="w-10 h-10 border border-[#D4AF37]/40 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#D4AF37] rotate-45 animate-pulse" />
                  </div>
                  <span className="text-[#D4AF37] text-[10px] font-mono uppercase tracking-[0.2em]">OUR REAL TRACK RECORD</span>
                </div>

                <div className="space-y-6 sm:space-y-8">
                  {/* Stat 1 */}
                  <div className="border-b border-[#D4AF37]/10 pb-5 sm:pb-6 flex justify-between items-end gap-4">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-1">COMPLETED PROJECTS</div>
                      <div className="text-sm sm:text-base md:text-lg text-white font-space font-medium tracking-wider">Local Businesses • E-commerce • Portfolios</div>
                    </div>
                    <div className="text-3xl sm:text-4xl text-[#D4AF37] font-space font-bold shrink-0">
                      {stats.projects}+
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="border-b border-[#D4AF37]/10 pb-5 sm:pb-6 flex justify-between items-end gap-4">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase font-mono tracking-widest mb-1">HAPPY CLIENTS</div>
                      <div className="text-sm sm:text-base md:text-lg text-white font-space font-medium tracking-wider">Across India & Abroad</div>
                    </div>
                    <div className="text-3xl sm:text-4xl text-[#D4AF37] font-space font-bold shrink-0">
                      {stats.clients}%
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="pt-2">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#AA7C11]" style={{ width: '98%' }}></div>
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] uppercase text-white/40 font-mono tracking-widest">
                      <span>CLIENT SATISFACTION RATE</span>
                      <span className="text-[#D4AF37]">98% SATISFACTION</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US: Grid */}
      <section className="py-20 sm:py-24 bg-[#001133] px-5 sm:px-6 md:px-12 relative overflow-hidden">
        {/* Abstract background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7F5F2 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 flex flex-col items-center">
            <span className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-4">OUR CORE BENEFITS</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-light text-white tracking-tight">
              Engineered to deliver real growth and results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Metric Card 1 */}
            <div className="navy-glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] interactive-hover border-l-4 border-l-[#D4AF37]">
              <span className="text-xs font-mono text-[#D4AF37]/50">01 / FAST SPEED</span>
              <div className="mt-4">
                <h3 className="text-lg font-space font-medium text-white mb-2">Instant Load Times</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Near-instant loading speeds on mobile that keep your visitors happy, engaged, and buying.
                </p>
              </div>
            </div>

            {/* Metric Card 2 */}
            <div className="navy-glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] interactive-hover border-l-4 border-l-emerald-500">
              <span className="text-xs font-mono text-emerald-400/50">02 / RANKING</span>
              <div className="mt-4">
                <h3 className="text-lg font-space font-medium text-white mb-2">Google Maps & Search Ranking</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  We optimize your website so it ranks higher on Google Search and Maps to get found by local customers.
                </p>
              </div>
            </div>

            {/* Metric Card 3 */}
            <div className="navy-glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] interactive-hover border-l-4 border-l-purple-500">
              <span className="text-xs font-mono text-purple-400/50">03 / MOBILE OPTIMIZED</span>
              <div className="mt-4">
                <h3 className="text-lg font-space font-medium text-white mb-2">100% Mobile Friendly</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Your website will look beautiful and work perfectly on every mobile, tablet, and desktop screen.
                </p>
              </div>
            </div>

            {/* Metric Card 4 */}
            <div className="navy-glass-card rounded-2xl p-6 flex flex-col justify-between h-full min-h-[220px] interactive-hover border-l-4 border-l-cyan-500">
              <span className="text-xs font-mono text-cyan-400/50">04 / INTELLIGENCE</span>
              <div className="mt-4">
                <h3 className="text-lg font-space font-medium text-white mb-2">Smart AI Automation</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">
                  Automate custom customer replies, bookings, and emails to save hours of manual work every single day.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICE PREVIEW: High Impact Service Cards */}
      <section className="py-20 sm:py-32 bg-[#F7F5F2] px-5 sm:px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono tracking-[0.25em] text-[#AA7C11] uppercase">OUR SERVICES</span>
              <h2 className="text-3xl md:text-5xl font-display font-light text-[#002366] tracking-tight">
                Services that help your business scale.
              </h2>
            </div>
            <Link 
              to="/services" 
              className="text-xs font-mono tracking-widest text-[#AA7C11] hover:text-[#002366] transition-colors duration-300 flex items-center gap-1 group py-2 font-bold"
            >
              VIEW ALL SERVICES <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white border border-[#002366]/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[350px] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-[#002366]/40">01 / DEVELOPMENT</span>
                <span className="text-2xl font-space font-semibold text-[#D4AF37]/20 group-hover:text-[#D4AF37]/60 transition-colors">I</span>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <h3 className="text-2xl font-space font-medium text-[#002366]">
                  Website Development
                </h3>
                <p className="text-xs text-[#002366]/70 font-light leading-relaxed">
                  Beautiful, custom-designed websites built to attract local customers, load instantly, and help your business grow.
                </p>
                <div className="w-full h-[1px] bg-[#002366]/5 my-2" />
                <span className="text-[10px] font-mono text-[#AA7C11] tracking-widest uppercase">
                  Custom Code • Fast Loading • Mobile Friendly
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#002366]/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[350px] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-[#002366]/40">02 / LOCAL SEO</span>
                <span className="text-2xl font-space font-semibold text-emerald-400/20 group-hover:text-emerald-500/60 transition-colors">II</span>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <h3 className="text-2xl font-space font-medium text-[#002366]">
                  Google Business Profile
                </h3>
                <p className="text-xs text-[#002366]/70 font-light leading-relaxed">
                  Get discovered on Google Search and Google Maps. Bring direct calls, reviews, and visits to your physical location.
                </p>
                <div className="w-full h-[1px] bg-[#002366]/5 my-2" />
                <span className="text-[10px] font-mono text-[#AA7C11] tracking-widest uppercase">
                  Rank on Google Maps • Local Business Citations
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#002366]/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[350px] relative overflow-hidden group hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-[#002366]/40">03 / MARKETING</span>
                <span className="text-2xl font-space font-semibold text-purple-400/20 group-hover:text-purple-500/60 transition-colors">III</span>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <h3 className="text-2xl font-space font-medium text-[#002366]">
                  Digital Marketing
                </h3>
                <p className="text-xs text-[#002366]/70 font-light leading-relaxed">
                  Reach more customers with effective online marketing. Run profitable Facebook, Instagram, and Google Ad campaigns.
                </p>
                <div className="w-full h-[1px] bg-[#002366]/5 my-2" />
                <span className="text-[10px] font-mono text-[#AA7C11] tracking-widest uppercase">
                  High-Converting Ads • Target the Right Customers
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-[#001133] relative overflow-hidden border-t border-[#D4AF37]/20 px-5 sm:px-6">
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#001133] to-[#001133]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-4">GET STARTED</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-tight mb-8">
            Let’s build your <span className="italic text-[#D4AF37]">dream website</span> today.
          </h2>
          <p className="text-sm md:text-base text-white/75 font-light leading-relaxed max-w-xl mb-10">
            Get in touch with us today for a free consultation. We will analyze your online presence and show you exactly how to get more local calls and customers.
          </p>

          <Link
            to="/contact"
            className="px-10 py-4 rounded-full text-xs font-space tracking-widest text-[#001133] bg-[#D4AF37] hover:bg-white transition-all font-bold shadow-lg shadow-[#D4AF37]/15 flex items-center gap-2 group interactive-hover"
          >
            GET FREE CONSULTATION <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </motion.div>
  );
}

// 2. SERVICES VIEW
function ServicesView() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const categories = [
    {
      id: 'web-dev',
      num: '01',
      title: 'Website Development',
      icon: Code,
      desc: 'Professional websites that help your business grow. We build custom-designed, fast-loading corporate websites, e-commerce stores, and simple landing pages.',
      tags: ['Custom Design', 'Fast Loading', 'Mobile Friendly'],
      accentColor: 'border-l-4 border-[#D4AF37]',
      glowClass: 'group-hover:shadow-[#D4AF37]/15',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      longDesc: 'We build fully custom, speed-optimized websites from scratch. Using modern frameworks, we ensure your website loads instantly, ranks high on search engines, and works perfectly on mobile phones. This gives your business a trusted, premium look that converts visitors into customers.',
      subservices: [
        "Business Website", "Portfolio Website", "Landing Page", 
        "E-commerce Website", "School Website", "Hospital Website", 
        "Restaurant Website", "Website Maintenance", "Website Speed Optimization"
      ]
    },
    {
      id: 'gbp',
      num: '02',
      title: 'Google Business Profile',
      icon: MapPin,
      desc: 'Get discovered on Google Search and Google Maps. We optimize your local business profile to bring direct phone calls and customers to your shop.',
      tags: ['Google Search', 'Google Maps', 'Local Traffic'],
      accentColor: 'border-l-4 border-emerald-500',
      glowClass: 'group-hover:shadow-emerald-500/15',
      image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=600&q=80',
      longDesc: 'More than 45% of customers find local services directly through Google Maps. We make sure your Google Business Profile ranks at the top, has updated photos, shows accurate services list, and automates review generation to build instant trust with local buyers.',
      subservices: [
        "Setup", "Verification", "Optimization", 
        "Products Cataloging", "Services Mapping", "Photos Optimization", "Maps Navigation"
      ]
    },
    {
      id: 'marketing',
      num: '03',
      title: 'Digital Marketing',
      icon: Target,
      desc: 'Reach more customers with effective online marketing. We run high-converting ad campaigns on Facebook, Instagram, and Google.',
      tags: ['Facebook Ads', 'Google Ads', 'Lead Generation'],
      accentColor: 'border-l-4 border-blue-600',
      glowClass: 'group-hover:shadow-blue-600/15',
      image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&w=600&q=80',
      longDesc: 'We create high-converting marketing campaigns that target active buyers in your local area. By writing compelling ad copies and designing high-performing image/video ads, we lower your advertising costs while bringing in high-quality leads.',
      subservices: [
        "Meta Ads", "Google Ads", "Social Media Campaigns", 
        "Lead Generation", "Promotion & Ad Copy", "Content Planning"
      ]
    },
    {
      id: 'automation',
      num: '04',
      title: 'AI Automation',
      icon: Cpu,
      desc: 'Save time by automating your business tasks. We set up smart auto-replies, customer chatbots, and sync your leads automatically.',
      tags: ['AI Chatbots', 'Auto Replies', 'Workflow Sync'],
      accentColor: 'border-l-4 border-purple-500',
      glowClass: 'group-hover:shadow-purple-500/15',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      longDesc: 'Automate repetitive daily tasks in your business. We set up smart tools that automatically sync customer details, answer common questions on WhatsApp, follow up with email leads, and send instant booking notifications without you lifting a finger.',
      subservices: [
        "AI Chatbot", "Workflow Automation", "Business Automation", 
        "Email Automation", "AI Assistant"
      ]
    },
    {
      id: 'ai-assets',
      num: '05',
      title: 'AI Video & Image',
      icon: Video,
      desc: 'High-quality promotional graphics, banners, posters, and short-form video reels generated to captivate your audience.',
      tags: ['Social Media Graphic', 'Promo Videos', 'Ad Banners'],
      accentColor: 'border-l-4 border-cyan-500',
      glowClass: 'group-hover:shadow-cyan-500/15',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      longDesc: 'To grab people\'s attention online, you need eye-catching images and videos. We design professional posters, promotional social media reels, and beautiful custom graphics that stop people from scrolling and make them read your offer.',
      subservices: [
        "AI Video Generation", "AI Image Assets", "Posters", 
        "Thumbnails", "Reels", "Promotional Content"
      ]
    },
    {
      id: 'seo-branding',
      num: '06',
      title: 'Branding & SEO',
      icon: Award,
      desc: 'Build a strong online identity and improve search rankings. We design unique logos and write search-optimized content so you rank higher on Google.',
      tags: ['Logo Designing', 'Google SEO', 'Brand Identity'],
      accentColor: 'border-l-4 border-pink-500',
      glowClass: 'group-hover:shadow-pink-500/15',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      longDesc: 'To grow long-term, your business needs a strong brand and organic search traffic. We design beautiful, memorable logos, set up Google Search Console, and write search-optimized content so you rank on Google without paying for ads.',
      subservices: [
        "Logo Designing", "Brand Identity", "SEO (Search Engine Optimization)", 
        "Google Search Console Setup", "On Page SEO", "Business Branding"
      ]
    },
    {
      id: 'design',
      num: '07',
      title: 'Editing & Graphic Design',
      icon: PenTool,
      desc: 'Get professionally designed banners, visiting cards, pamphlets, posters, and edited videos to make your business look trusted.',
      tags: ['Visiting Cards', 'Flyers & Posters', 'Video Editing'],
      accentColor: 'border-l-4 border-amber-500',
      glowClass: 'group-hover:shadow-amber-500/15',
      image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=600&q=80',
      longDesc: 'Whether you need digital banners, professional visiting cards, posters, or flyer layouts to distribute locally, we design clean, modern graphics that match your business theme perfectly.',
      subservices: [
        "Poster Design", "Banner", "Thumbnail", "Social Media Post", 
        "Video Editing", "Photo Editing", "Visiting Card", "Flyer"
      ]
    }
  ];

  const faqs = [
    {
      q: "What types of websites do you develop, and what is the process?",
      a: "We develop high-performance Business Websites, Portfolios, Landing Pages, and E-commerce Stores. Our process is simple: we discuss your exact goals, design a premium custom layout, build it with fast-loading code (React + Vite), test extensively on mobile devices, and launch it on highly reliable cloud hosting servers."
    },
    {
      q: "How does Search Engine Optimization (SEO) help my website get organic customers?",
      a: "SEO structures your website content and technical code so Google can easily read and index your business. We set up meta tags, perform local keyword research, and register your business with Google Search Console. This helps your website rank higher on search results, driving free organic customer inquiries without paying for continuous ads."
    },
    {
      q: "How will digital ads and online marketing help my local business grow?",
      a: "Digital ads (such as Meta/Instagram Ads and Google Search Ads) put your services directly in front of active buyers in your specific location. We design eye-catching ad graphics and write high-converting ad copy that targets active prospects, helping you get direct phone calls and high-quality leads with a lower ad spend."
    },
    {
      q: "What is a Google Business Profile, and why does my shop need it?",
      a: "Google Business Profile is the official maps listing that appears when people search for local services near them. Over 45% of local buyers find physical locations directly via Google Maps. We set up, verify, and fully optimize your business listing with maps cataloging, keyword-rich description, and services mapping to get you on the map."
    },
    {
      q: "How can custom AI Automation save time and help my daily business?",
      a: "AI Automation replaces manual and repetitive tasks. We design and integrate smart chatbots on WhatsApp or Instagram, build auto-replies for lead forms, and set up automatic workflows that instantly sync incoming customer leads to Google Sheets or send notifications. This ensures your agency or shop responds 24/7."
    },
    {
      q: "What are your charges and pricing models for different projects?",
      a: "We believe in honest, upfront pricing with zero hidden fees. We work on fixed, clear project budgets or affordable monthly support packages depending on the services required. After our initial discussion, we provide a complete, itemized written quotation so you know exactly what value you are receiving."
    },
    {
      q: "Do you provide technical maintenance and support after the website goes live?",
      a: "Yes, every website we launch includes 30 days of free premium technical support. We also offer cost-effective monthly maintenance packages. These cover regular system backup management, speed optimizations, search ranking monitoring, copy edits, and ongoing technical assistance whenever needed."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#F7F5F2] overflow-x-hidden"
    >
      <SEO 
        title="Our Services" 
        description="Professional services crafted to grow your brand: Website Development, Google Business Profile optimization, Digital Marketing, and custom AI Automation." 
      />
      
      {/* Services Hero Section */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-6 md:px-12 overflow-hidden bg-[#001133] text-white">
        {/* Ambient background particles */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7F5F2 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001133]/50 to-[#001133] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">WHAT WE BUILD</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight mb-8">
            Bespoke digital services built to <span className="italic text-[#D4AF37]">grow your brand</span>.
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
            We help businesses grow by creating fast-loading websites, optimizing Google Business Profiles, running smart ads, and automating daily manual tasks.
          </p>
        </div>
      </section>

      {/* Services Interactive Grid Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-12">
          <span className="text-xs font-mono tracking-[0.25em] text-[#AA7C11] uppercase">CLICK ANY SERVICE TO LEARN MORE</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-light text-[#002366] tracking-tight">
            Our Core Services
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isExpanded = expandedId === cat.id;

            return (
              <motion.div
                key={cat.id}
                layout="position"
                onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                className={`bg-white border border-[#002366]/5 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm group transition-all duration-500 hover:shadow-md cursor-pointer relative overflow-hidden ${cat.accentColor}`}
                whileHover={{ scale: 1.002 }}
              >
                {/* Visual Glass Glow background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#002366]/[0.01] to-transparent transition-opacity pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-start sm:items-center gap-4 md:gap-6">
                    <span className="text-sm font-mono text-[#AA7C11] tracking-widest pt-1 sm:pt-0">{cat.num} /</span>
                    <div className="w-12 h-12 rounded-xl bg-[#001133]/5 border border-[#001133]/10 flex items-center justify-center text-[#002366] shrink-0 group-hover:bg-[#001133] group-hover:text-white transition-all duration-500">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-2xl font-space font-medium text-[#002366] tracking-wide">
                        {cat.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1.5">
                        {cat.tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-mono bg-[#001133]/5 text-[#002366]/60 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto mt-2 md:mt-0">
                    <span className="text-xs font-mono text-[#AA7C11]/80 hidden md:inline">
                      {isExpanded ? "CLOSE DETAILS" : "LEARN MORE"}
                    </span>
                    <motion.div 
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      className="w-8 h-8 rounded-full border border-[#002366]/10 flex items-center justify-center text-[#002366]"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                <div className="mt-4 md:ml-20">
                  <p className="text-sm text-[#002366]/70 font-light leading-relaxed max-w-3xl">
                    {cat.desc}
                  </p>
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden md:ml-20 mt-8"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#002366]/5">
                        {/* Column 1: Detailed Overview */}
                        <div className="lg:col-span-7 space-y-6">
                          <div>
                            <h4 className="text-xs font-mono tracking-widest text-[#AA7C11] uppercase mb-2">HOW WE HELP</h4>
                            <p className="text-xs md:text-sm text-[#002366]/80 font-light leading-relaxed">
                              {cat.longDesc}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-xs font-mono tracking-widest text-[#AA7C11] uppercase mb-3">OUR SERVICES LIST</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {cat.subservices.map((sub) => (
                                <div key={sub} className="flex items-center gap-2 text-xs font-mono text-[#002366]/80">
                                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                  <span>{sub}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4">
                            <Link
                              to="/contact"
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[10px] font-space tracking-widest text-[#F7F5F2] bg-[#001133] hover:bg-[#D4AF37] hover:text-[#001133] transition-all font-bold"
                              onClick={(e) => e.stopPropagation()}
                            >
                              START PROJECT <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Column 2: Image Illustration Block */}
                        <div className="lg:col-span-5 relative h-48 lg:h-auto rounded-xl overflow-hidden shadow-inner border border-[#002366]/5 bg-[#001133]/5">
                          <img
                            src={cat.image}
                            alt={cat.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001133]/55 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4 right-4 text-white text-[10px] font-mono tracking-wider flex justify-between">
                            <span>SERVICE COORDINATE: {cat.num}</span>
                            <span>PROFESSIONAL WORK</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FAQ SECTION: Custom Accordion */}
      <section className="py-16 sm:py-24 bg-[#001133] text-white px-5 sm:px-6 md:px-12 relative overflow-hidden border-t border-[#D4AF37]/20">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7F5F2 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">HELP & ACCORDION</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-light text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;

              return (
                <div 
                  key={index}
                  className="border border-[#D4AF37]/15 bg-white/[0.02] backdrop-blur-md rounded-xl overflow-hidden transition-colors hover:border-[#D4AF37]/35"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full text-left py-5 px-5 sm:px-6 flex justify-between items-center gap-4 focus:outline-none"
                  >
                    <span className="text-sm md:text-base font-space font-medium text-white tracking-wide">
                      {faq.q}
                    </span>
                    <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0">
                      {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs md:text-sm text-white/70 font-light leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// 3. PORTFOLIO VIEW
function PortfolioView() {
  const [selectedProjId, setSelectedProjId] = useState('surya');

  const projects = [
    {
      id: 'surya',
      title: 'Surya Chashma Ghar',
      tagline: 'Custom Eyewear Store',
      desc: 'A modern, high-speed website featuring an online eyeglasses catalog and digital appointment booking system. Fully optimized to rank on Google Maps for eyewear searches.',
      accent: 'border-l-4 border-l-[#D4AF37]',
      colorTheme: 'from-[#0A1128] to-[#1C1613]',
      tech: ['React 18', 'Google Maps API', 'Local Maps SEO', 'Framer Motion'],
      screens: {
        laptop: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
        tablet: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
        mobile: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=500&q=80'
      }
    },
    {
      id: 'dining',
      title: 'Aura Fine Dining',
      tagline: 'Gourmet Restaurant Website',
      desc: 'A beautiful restaurant website featuring automated table bookings, interactive food menus, and fully integrated Google Maps navigation for direct customer visits.',
      accent: 'border-l-4 border-l-[#AA7C11]',
      colorTheme: 'from-[#1C1613] to-[#2B231F]',
      tech: ['Vite Engine', 'Tailwind CSS', 'Auto Booking API', 'Custom Graphics'],
      screens: {
        laptop: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        tablet: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
        mobile: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80'
      }
    },
    {
      id: 'school',
      title: 'Horizon Academy',
      tagline: 'School Management Website',
      desc: 'A complete, easy-to-use school website and database dashboard connecting teachers, students, and parents with instant notifications and schedules.',
      accent: 'border-l-4 border-l-[#002366]',
      colorTheme: 'from-[#002366] to-[#001133]',
      tech: ['React/Vite', 'Database Admin', 'Secure Forms', 'Speed Optimized'],
      screens: {
        laptop: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
        tablet: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
        mobile: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80'
      }
    },
    {
      id: 'business',
      title: 'Vanguard Holdings',
      tagline: 'Corporate Business Site',
      desc: 'A high-speed corporate business website featuring clear service descriptions, team bios, and client inquiry forms optimized for loading instantly on mobile.',
      accent: 'border-l-4 border-l-emerald-500',
      colorTheme: 'from-[#0F172A] to-[#1E293B]',
      tech: ['React/Vite', 'Server Caching', 'Schema SEO', 'Perfect Lighthouse'],
      screens: {
        laptop: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        tablet: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
        mobile: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80'
      }
    },
    {
      id: 'portfolio',
      title: 'Elena Rostova Studio',
      tagline: 'Photography & Portfolio Layout',
      desc: 'A clean, modern photography and portfolio website designed to showcase professional photo galleries with beautiful, smooth animations.',
      accent: 'border-l-4 border-l-purple-500',
      colorTheme: 'from-[#1A1A1A] to-[#2D2D2D]',
      tech: ['Three.js Canvas', 'Smooth Scrolling', 'Framer Motion', 'Grid Layout'],
      screens: {
        laptop: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
        tablet: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80',
        mobile: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=500&q=80'
      }
    },
    {
      id: 'ecommerce',
      title: 'Apex Flagshop',
      tagline: 'E-commerce Online Store',
      desc: 'A high-speed e-commerce online store featuring a simplified shopping cart, clean responsive layout, and secure, instant payment gateway setup.',
      accent: 'border-l-4 border-l-cyan-500',
      colorTheme: 'from-[#111111] to-[#222222]',
      tech: ['Headless Shopify', 'Stripe Gateway', 'Pre-fetching', 'Custom Cart'],
      screens: {
        laptop: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        tablet: 'https://images.unsplash.com/photo-1472851294608-062f824d296e?auto=format&fit=crop&w=800&q=80',
        mobile: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=500&q=80'
      }
    }
  ];

  const timelineSteps = [
    {
      step: '01',
      title: 'AUDIT & DISCOVERY',
      desc: 'We analyze your competition, research what your local customers are searching for, and plan your website design.'
    },
    {
      step: '02',
      title: 'BRANDING & LAYOUT',
      desc: 'We design clean logos, choose readable typography, and create a visually beautiful layout structure for your approval.'
    },
    {
      step: '03',
      title: 'SPEEDY DEVELOPMENT',
      desc: 'We write clean, high-performance code, ensuring your website is lightweight, loads fast, and works flawlessly on mobile.'
    },
    {
      step: '04',
      title: 'LAUNCH & GOOGLE SETUP',
      desc: 'We launch your website on fast hosting servers, configure Google Search Console, and register your Google Business Profile.'
    }
  ];

  const testimonials = [
    {
      name: "Dr. Alok Chandra",
      role: "Founder, Chandra Eye Center",
      text: "Prachar Setu completely restructured our local search presence. Our local map pack listing went from position 12 to the top 3 within 4 weeks. Inbound appointment registrations have increased by 80%.",
      stat: "+80% APPOINTMENTS"
    },
    {
      name: "Shekhar Kapoor",
      role: "Operations Director, Horizon",
      text: "Our school was plagued with outdated templates. Prachar Setu consolidated our administrative dashboard and parent portals into a high-speed, secure, premium ecosystem. Absolute craftsmanship.",
      stat: "100% SECURE PORTALS"
    },
    {
      name: "Aradhana Sen",
      role: "Creative Director, Maison Sen Boutiques",
      text: "The speed of our online boutique is incredible. Pages load instantly, and the fashion WebGL layouts look incredibly expensive. Our online checkout conversion rate jumped by 3.2%.",
      stat: "3.2x CHECKOUT CR"
    }
  ];

  const activeProj = projects.find(p => p.id === selectedProjId) || projects[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-[#F7F5F2] min-h-screen overflow-x-hidden"
    >
      <SEO 
        title="Our Portfolio" 
        description="Bespoke project portfolios designed and engineered by The Prachar Setu digital growth cell." 
      />
      
      {/* Portfolio Hero */}
      <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-6 md:px-12 bg-[#001133] text-[#F7F5F2] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7F5F2 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001133]/50 to-[#001133] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <span className="text-xs font-mono tracking-[0.3em] text-[#D4AF37] uppercase mb-4 block">OUR WORK</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-tight mb-8">
            The portfolio of <span className="italic text-[#D4AF37]">completed works</span>.
          </h1>
          <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl leading-relaxed">
            Take a look at the real websites we have designed and optimized to help local and national businesses grow.
          </p>
        </div>
      </section>

      {/* Main Showcase Section */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Project Selector Panel */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono tracking-[0.25em] text-[#AA7C11] uppercase block mb-6">SELECT PROJECT</span>
            <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x">
              {projects.map((proj) => {
                const isActive = proj.id === selectedProjId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjId(proj.id)}
                    className={`w-64 lg:w-full text-left p-5 rounded-xl border transition-all shrink-0 snap-center outline-none ${
                      isActive 
                        ? 'bg-[#001133] border-[#D4AF37] text-white shadow-lg' 
                        : 'bg-white border-[#002366]/5 text-[#002366]/80 hover:bg-white/65 hover:border-[#002366]/10'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#D4AF37]">
                        {proj.id.toUpperCase()} PROJECT
                      </span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />}
                    </div>
                    <h3 className="text-base font-space font-medium tracking-wide">
                      {proj.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Mockup & Tech Summary */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="navy-glass-card rounded-2xl p-5 sm:p-6 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
              
              {/* Top border decor */}
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#D4AF37] via-[#AA7C11] to-transparent" />

              {/* Layout Mockups Showcase Grid */}
              <div className="relative py-8 md:py-12 flex flex-col items-center justify-center overflow-hidden">
                
                {/* 1. LAPTOP MOCKUP (Central Frame) */}
                <div className="w-full max-w-lg mx-auto relative z-10 shadow-2xl overflow-hidden rounded-2xl">
                  {/* Laptop Screen Bezel */}
                  <div className="border-[8px] md:border-[12px] border-slate-900 rounded-t-2xl relative bg-slate-950 aspect-[16/10] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeProj.id}-laptop`}
                        src={activeProj.screens.laptop}
                        alt="Laptop presentation"
                        referrerPolicy="no-referrer"
                        initial={{ opacity: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:brightness-100 transition-all duration-500"
                      />
                    </AnimatePresence>
                    {/* Gloss Reflection overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />
                  </div>
                  {/* Laptop base */}
                  <div className="h-3 bg-slate-800 w-[104%] -ml-[2%] rounded-b-xl relative shadow-md">
                    <div className="w-12 h-1.5 bg-slate-900 mx-auto rounded-b-md" />
                  </div>
                </div>

                {/* Left & Right floating mockups on desktop */}
                <div className="hidden md:flex justify-between w-full max-w-lg mt-6 absolute inset-x-0 bottom-0 pointer-events-none px-4 z-20">
                  
                  {/* 2. TABLET MOCKUP (Floating Left) */}
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={`${activeProj.id}-tablet-wrap`}
                    transition={{ duration: 0.6 }}
                    className="w-40 border-[6px] border-slate-900 bg-slate-950 aspect-[4/3] rounded-xl overflow-hidden shadow-xl"
                  >
                    <img 
                      src={activeProj.screens.tablet} 
                      alt="Tablet presentation" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-90"
                    />
                  </motion.div>

                  {/* 3. MOBILE MOCKUP (Floating Right) */}
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={`${activeProj.id}-mobile-wrap`}
                    transition={{ duration: 0.6 }}
                    className="w-24 border-[6px] border-slate-900 bg-slate-950 aspect-[9/19] rounded-[20px] overflow-hidden shadow-xl"
                  >
                    <img 
                      src={activeProj.screens.mobile} 
                      alt="Mobile presentation" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-90"
                    />
                  </motion.div>
                </div>

              </div>

              {/* Dynamic Information Display */}
              <div className="mt-8 border-t border-[#D4AF37]/15 pt-6 flex flex-col md:flex-row justify-between gap-6 relative z-30">
                <div className="max-w-md">
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
                    {activeProj.tagline}
                  </span>
                  <h2 className="text-xl md:text-2xl font-space font-medium text-white mb-3">
                    {activeProj.title}
                  </h2>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    {activeProj.desc}
                  </p>
                </div>

                <div className="flex flex-col gap-3 min-w-[150px]">
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37]/80 uppercase">
                    CHANNELS INTEGRATED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProj.tech.map((t) => (
                      <span key={t} className="text-[9px] font-mono bg-white/5 border border-white/10 text-white/80 px-2 py-0.5 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* PROCESS TIMELINE SECTION */}
      <section className="py-16 sm:py-24 bg-[#001133] text-white px-5 sm:px-6 md:px-12 relative overflow-hidden border-t border-[#D4AF37]/20">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F7F5F2 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-4 block">HOW WE WORK</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-light text-white tracking-tight">
              Our Working Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {timelineSteps.map((step, idx) => (
              <div 
                key={step.step}
                className="bg-white/[0.01] border border-[#D4AF37]/15 p-6 rounded-2xl relative overflow-hidden group hover:border-[#D4AF37]/45 transition-colors duration-500 h-full"
              >
                <div className="absolute -right-4 -top-4 text-6xl font-space font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors">
                  {step.step}
                </div>
                <span className="text-xs font-mono text-[#D4AF37] block mb-3">{step.step} / PHASE</span>
                <h3 className="text-lg font-space font-medium text-white mb-2">{step.title}</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 sm:py-24 px-5 sm:px-6 md:px-12 bg-[#F7F5F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <span className="text-xs font-mono tracking-[0.25em] text-[#AA7C11] uppercase mb-4 block">TESTIMONIALS</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-light text-[#002366] tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#002366]/5 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full min-h-[320px] hover:shadow-md transition-shadow relative"
              >
                {/* Gold quotation mark */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[#D4AF37]/15" />

                <div className="space-y-4">
                  <span className="text-[10px] font-mono text-[#AA7C11] uppercase tracking-widest">
                    {test.stat}
                  </span>
                  <p className="text-xs md:text-sm text-[#002366]/80 font-light leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>

                <div className="border-t border-[#002366]/5 pt-4 mt-6">
                  <h4 className="text-sm font-space font-medium text-[#002366]">
                    {test.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#002366]/50">
                    {test.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}
      <section className="py-20 sm:py-28 bg-[#001133] text-white text-center relative overflow-hidden border-t border-[#D4AF37]/20">
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#001133] to-[#001133]" />
        
        <div className="max-w-3xl mx-auto px-5 sm:px-6 relative z-10 flex flex-col items-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#D4AF37] uppercase mb-4">GET A FREE ESTIMATE</span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-tight mb-8">
            Ready to grow your <span className="italic text-[#D4AF37]">business online</span>?
          </h2>
          <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed max-w-xl mb-10">
            Get in touch with us today. We will study your business requirements and create a custom, high-speed website and optimization proposal for you.
          </p>
          <Link
            to="/contact"
            className="px-10 py-4 rounded-full text-xs font-space tracking-widest text-[#001133] bg-[#D4AF37] hover:bg-white transition-all font-bold shadow-lg shadow-[#D4AF37]/15 flex items-center gap-2 group interactive-hover"
          >
            GET FREE PROPOSAL <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}

// 4. CONTACT VIEW (Premium Contact form)
// 4. CONTACT VIEW (Premium Contact form with Schema & AJAX Validation)
function ContactView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Business Website',
    requirement: ''
  });

  const [formErrors, setFormErrors] = useState({
    phoneOrEmail: '',
    phone: '',
    email: '',
    submit: ''
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      phoneOrEmail: '',
      phone: '',
      email: '',
      submit: ''
    };

    // Clean previous errors
    setFormErrors(errors);

    // Validate name
    if (!formData.name.trim()) {
      isValid = false;
    }

    // Validate requirement
    if (!formData.requirement.trim()) {
      isValid = false;
    }

    // Validate phone or email presence
    const hasPhone = formData.phone.trim().length > 0;
    const hasEmail = formData.email.trim().length > 0;

    if (!hasPhone && !hasEmail) {
      errors.phoneOrEmail = "Either a Phone Number or an Email Address is required. Please fill in at least one.";
      isValid = false;
    } else {
      // Validate phone format if entered
      if (hasPhone) {
        const cleanedPhone = formData.phone.replace(/\D/g, ''); // strip non-digits
        if (cleanedPhone.length !== 10) {
          errors.phone = "Please enter a valid 10-digit mobile number.";
          isValid = false;
        }
      }

      // Validate email format if entered
      if (hasEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          errors.email = "Please enter a valid email address.";
          isValid = false;
        }
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/thepracharsetu@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          requirement: formData.requirement,
          _subject: "New Website Enquiry",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Business Website',
          requirement: ''
        });
      } else {
        setFormErrors(prev => ({
          ...prev,
          submit: "Failed to submit. Please try again or email hello@thepracharsetu.com directly."
        }));
      }
    } catch (err) {
      setFormErrors(prev => ({
        ...prev,
        submit: "A connection error occurred. Please check your network and try again."
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="py-24 sm:py-32 px-5 sm:px-6 md:px-12 min-h-screen bg-[#F7F5F2] relative overflow-hidden"
    >
      <SEO 
        title="Get In Touch" 
        description="Connect with The Prachar Setu. Get professional custom website development, Google maps ranking optimization, and digital marketing results."
      />
      
      {/* Absolute graphic elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full border border-black animate-slow-spin" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Info Area */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-center">
          <span className="text-xs font-mono tracking-[0.25em] text-[#AA7C11] uppercase">DIRECT CONNECT</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-[#002366] tracking-tight leading-tight">
            Let's build <span className="italic">your next project</span> together.
          </h1>
          <p className="text-sm text-[#002366]/70 font-light leading-relaxed max-w-sm">
            Whether you need a brand new high-speed website, local Google Maps ranking, or profitable ad campaigns, we are here to help you grow.
          </p>

          <div className="flex flex-col gap-4 mt-6">
            
            {/* Email Card */}
            <a 
              href="mailto:thepracharsetu@gmail.com"
              className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/10 bg-white/40 hover:bg-white/80 transition-colors backdrop-blur-sm group"
            >
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#001133] transition-colors duration-300">
                <Mail className="w-4 h-4 text-[#D4AF37] group-hover:text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#AA7C11] block font-mono">EMAIL ADDRESS</span>
                <span className="text-sm font-light text-[#002366] font-space tracking-wide">thepracharsetu@gmail.com</span>
              </div>
            </a>

            {/* Instagram Card */}
            <a 
              href="https://instagram.com/thepracharsetu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/10 bg-white/40 hover:bg-white/80 transition-colors backdrop-blur-sm group"
            >
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#001133] transition-colors duration-300">
                <Instagram className="w-4 h-4 text-[#D4AF37] group-hover:text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#AA7C11] block font-mono">INSTAGRAM HANDLE</span>
                <span className="text-sm font-light text-[#002366] font-space tracking-wide">@thepracharsetu</span>
              </div>
            </a>

            {/* YouTube Card */}
            <a 
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/10 bg-white/40 hover:bg-white/80 transition-colors backdrop-blur-sm group"
            >
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center shrink-0 group-hover:bg-[#001133] transition-colors duration-300">
                <Youtube className="w-4 h-4 text-[#D4AF37] group-hover:text-white" />
              </div>
              <div>
                <span className="text-[10px] text-[#AA7C11] block font-mono">YOUTUBE CHANNEL</span>
                <span className="text-sm font-light text-[#002366] font-space tracking-wide">The Prachar Setu</span>
              </div>
            </a>

            {/* WhatsApp Card */}
            <div className="flex items-center gap-4 p-4 rounded-xl border border-[#D4AF37]/10 bg-white/40 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-600 block font-mono font-semibold uppercase">WHATSAPP SUPPORT</span>
                <span className="text-sm font-light text-[#002366]/60 font-space tracking-wide">
                  +91 XXXXX XXXXX <span className="text-[9px] text-[#AA7C11] font-mono font-semibold ml-1.5">(COMING SOON)</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Form Panel */}
        <div className="lg:col-span-7">
          <div className="bg-[#001133] p-6 sm:p-8 md:p-10 rounded-2xl border border-[#D4AF37]/20 shadow-2xl relative">
            
            {/* Outer golden outline glow effect */}
            <div className="absolute inset-0 rounded-2xl border border-dashed border-[#D4AF37]/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="contact-form"
                  onSubmit={handleSubmit} 
                  className="flex flex-col gap-5 relative z-10"
                  noValidate
                >
                  {/* Name Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter your full name" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-xs font-light text-[#F7F5F2] focus:outline-none focus:border-[#D4AF37] transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between">
                      <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                        Phone Number
                      </label>
                      <span className="text-[9px] text-white/40 font-mono italic">Need Phone or Email</span>
                    </div>
                    <input 
                      type="tel" 
                      placeholder="10-digit mobile number (e.g. 9876543210)" 
                      className={`w-full bg-white/5 border ${formErrors.phone ? 'border-amber-500 font-semibold' : 'border-white/10'} rounded-lg py-3 px-4 text-xs font-light text-[#F7F5F2] focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    {formErrors.phone && (
                      <p className="text-[10px] text-amber-400 font-mono mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* Email Address Field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      className={`w-full bg-white/5 border ${formErrors.email ? 'border-amber-500' : 'border-white/10'} rounded-lg py-3 px-4 text-xs font-light text-[#F7F5F2] focus:outline-none focus:border-[#D4AF37] transition-colors`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {formErrors.email && (
                      <p className="text-[10px] text-amber-400 font-mono mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Combined phoneOrEmail error */}
                  {formErrors.phoneOrEmail && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <p className="text-[11px] text-amber-400 font-mono text-center">
                        {formErrors.phoneOrEmail}
                      </p>
                    </div>
                  )}

                  {/* Select Service Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                      Select Service *
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full bg-[#001133] border border-white/10 rounded-lg py-3 px-4 text-xs font-light text-[#F7F5F2] focus:outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <optgroup label="Website Development">
                          <option value="Business Website">Business Website</option>
                          <option value="Portfolio Website">Portfolio Website</option>
                          <option value="Landing Page">Landing Page</option>
                          <option value="E-commerce Website">E-commerce Website</option>
                          <option value="Website Maintenance">Website Maintenance</option>
                        </optgroup>
                        
                        <optgroup label="Google Business Profile">
                          <option value="Google Business Profile Setup & Optimization">Google Business Profile Setup & Optimization</option>
                        </optgroup>

                        <optgroup label="Digital Marketing">
                          <option value="Meta Ads">Meta Ads</option>
                          <option value="Google Ads">Google Ads</option>
                          <option value="Social Media Management">Social Media Management</option>
                        </optgroup>

                        <optgroup label="AI Automation">
                          <option value="AI Chatbot">AI Chatbot</option>
                          <option value="AI Video Generation">AI Video Generation</option>
                          <option value="AI Image Generation">AI Image Generation</option>
                        </optgroup>

                        <optgroup label="Other Professional Services">
                          <option value="Branding">Branding</option>
                          <option value="SEO">SEO</option>
                          <option value="Logo Design">Logo Design</option>
                          <option value="Graphic Design">Graphic Design</option>
                          <option value="Video Editing">Video Editing</option>
                          <option value="Photo Editing">Photo Editing</option>
                          <option value="Poster Design">Poster Design</option>
                          <option value="Thumbnail Design">Thumbnail Design</option>
                          <option value="Other">Other</option>
                        </optgroup>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                        <ChevronDown className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Requirement Textarea */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-semibold">
                      Requirement *
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Briefly describe your business and project requirements..." 
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-xs font-light text-[#F7F5F2] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      required
                    />
                  </div>

                  {formErrors.submit && (
                    <p className="text-xs text-amber-400 font-mono text-center">{formErrors.submit}</p>
                  )}

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-xs font-space tracking-widest text-[#001133] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:scale-[1.01] transition-all font-bold flex items-center justify-center gap-2 interactive-hover mt-2 shadow-lg shadow-[#D4AF37]/10 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-[#001133] border-t-transparent rounded-full"></span>
                        SUBMITTING ENQUIRY...
                      </span>
                    ) : (
                      <>
                        SUBMIT REQUIREMENT <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-6 bg-white/5 animate-pulse-gold">
                    <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl font-space font-medium text-[#F7F5F2] tracking-wide mb-2 uppercase">
                    ENQUIRY SUBMITTED SUCCESSFULLY
                  </h3>
                  <p className="text-xs text-[#F7F5F2]/60 font-light max-w-sm leading-relaxed mb-6">
                    Thank you! Your requirements have been sent to our desk. Our team will review your business details and reach out to you within 12 hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2 rounded-full border border-[#D4AF37]/35 text-xs font-mono text-[#D4AF37] hover:border-[#D4AF37] hover:text-[#F7F5F2] transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ----------------- MASTER LAYOUT WRAPPER -----------------

function LayoutWrapper() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Reset scroll on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Premium Lenis Smooth Scroll Configuration
  useEffect(() => {
    if (loading) return;

    const lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    const rafCallback = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(rafCallback);
    };

    rafId = requestAnimationFrame(rafCallback);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, [loading]);

  return (
    <>
      {/* Global Luxury Cursor */}
      <Cursor />

      {/* Luxury Loader Overlay */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Screen noise overlay for analog design texture */}
      <div className="noise-overlay" />

      <AnimatePresence mode="wait">
        {!loading && (
          <div className="min-h-screen flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#001133] overflow-x-hidden">
            
            {/* Nav Timeline & Radial Percent Indicators */}
            <ScrollProgress />

            {/* Main Luxury Header */}
            <Navbar />

            {/* Floating Quick instagram icon */}
            <FloatingInstagram />

            {/* Master Page Routing Canvas with Page Transitions */}
            <main className="flex-grow overflow-x-hidden">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Routes location={location}>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/services" element={<ServicesView />} />
                  <Route path="/portfolio" element={<PortfolioView />} />
                  <Route path="/contact" element={<ContactView />} />
                  {/* Fallback route */}
                  <Route path="*" element={<HomeView />} />
                </Routes>
              </motion.div>
            </main>

            {/* Permanent Display Footer */}
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}
