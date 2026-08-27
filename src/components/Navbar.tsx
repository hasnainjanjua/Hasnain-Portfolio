import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

interface NavbarProps {
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection = 'home',
  onNavigate,
  onOpenContact,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLetTalk = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      scrollTo('contact');
    }
  };

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Work', target: 'work' },
    { label: 'Journal', target: 'journal' },
    { label: 'Explorations', target: 'explorations' },
  ];

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-1.5 sm:px-2.5 sm:py-2 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/40 border-white/15 bg-surface/95' : 'shadow-md shadow-black/10'
        }`}
      >
        {/* 1. Logo with Magnetic Physics & HS Monogram */}
        <Magnetic strength={0.45}>
          <button
            onClick={() => scrollTo('hero')}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            data-cursor="pointer"
            className="relative group p-0.5 rounded-full transition-transform duration-300 hover:scale-110 focus:outline-none"
            aria-label="Home logo"
          >
            {/* Accent gradient ring */}
            <div
              className={`w-9 h-9 rounded-full p-[1.5px] transition-all duration-500 ${
                logoHovered ? 'accent-gradient-reverse rotate-180' : 'accent-gradient'
              }`}
            >
              <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
                <span className="font-display italic text-[13px] text-text-primary tracking-tight font-normal">
                  HS
                </span>
              </div>
            </div>
          </button>
        </Magnetic>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection.toLowerCase() === item.target.toLowerCase();
            return (
              <Magnetic key={item.target} strength={0.25}>
                <button
                  onClick={() => scrollTo(item.target)}
                  data-cursor="pointer"
                  className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-medium ${
                    isActive
                      ? 'text-text-primary bg-stroke/50 shadow-sm'
                      : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                  }`}
                >
                  {item.label}
                </button>
              </Magnetic>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* 5. "Let's Talk" button with Magnetic & gradient hover border */}
        <Magnetic strength={0.4}>
          <button
            onClick={handleLetTalk}
            data-cursor="pointer"
            className="relative group text-xs sm:text-sm rounded-full p-[1.5px] transition-all duration-300 hover:scale-105 focus:outline-none"
          >
            {/* Behind gradient glow on hover */}
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-surface border border-stroke group-hover:border-transparent backdrop-blur-md text-text-primary transition-colors duration-200">
              <span>Let's Talk</span>
              <span className="text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 text-xs">
                ↗
              </span>
            </div>
          </button>
        </Magnetic>
      </nav>
    </motion.header>
  );
};
export default Navbar;
