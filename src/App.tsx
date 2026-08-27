import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AmbientGlow from './components/AmbientGlow';
import ContactDrawer from './components/ContactDrawer';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Inertial Scrolling with GSAP integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Modal scroll lock listeners
    const handleStop = () => {
      lenis.stop();
    };
    const handleStart = () => {
      lenis.start();
    };

    window.addEventListener('lenis:stop', handleStop);
    window.addEventListener('lenis:start', handleStart);

    return () => {
      window.removeEventListener('lenis:stop', handleStop);
      window.removeEventListener('lenis:start', handleStart);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'work', 'journal', 'explorations', 'stats', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId === 'hero' ? 'hero' : sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent/20 selection:text-text-primary">
      {/* 1. Dynamic Context-Aware Fluid Cursor */}
      <CustomCursor />

      {/* 2. Global Soft Ambient Mouse Glow & Subtle Film Grain */}
      <AmbientGlow />

      {/* 3. Loading Screen Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* 4. Floating Navbar with Magnetic Elements */}
      <Navbar
        activeSection={activeSection === 'hero' ? 'home' : activeSection}
        onNavigate={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* 5. Main Portfolio Sections */}
      <main className="w-full flex flex-col relative z-10">
        {/* Section 2: Hero */}
        <Hero
          onSeeWorks={() => handleNavigate('work')}
          onReachOut={() => setIsContactOpen(true)}
        />

        {/* Section 3: Selected Works (with Filter Tabs, 3D Tilt & Spotlights) */}
        <SelectedWorks />

        {/* Section 4: Journal */}
        <Journal />

        {/* Section 5: Explorations (Visual Playground with High-Resolution Video & Parallax) */}
        <Explorations />

        {/* Section 6: Stats (with Animated CountUp & Highlights) */}
        <Stats />
      </main>

      {/* Section 7: Contact / Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Section 8: Quick Inquiry & Copy Email Modal */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

export default App;
