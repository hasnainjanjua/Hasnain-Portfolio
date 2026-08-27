import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { MapPin } from 'lucide-react';
import Magnetic from './Magnetic';

interface HeroProps {
  onSeeWorks?: () => void;
  onReachOut?: () => void;
}

const roles = ['Senior Developer', 'Team Lead', 'Founder', 'Engineer'];

export const Hero: React.FC<HeroProps> = ({ onSeeWorks, onReachOut }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [lahoreTime, setLahoreTime] = useState<string>('');

  // Live Lahore Local Time Clock (PKT / Asia/Karachi)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        setLahoreTime(formatter.format(now));
      } catch {
        setLahoreTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Setup HLS video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';
    let hlsInstance: Hls | null = null;

    if (Hls.isSupported()) {
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsInstance.loadSource(hlsUrl);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
    };
  }, []);

  // GSAP Entrance Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.1 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Roles cycling every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleWorksClick = () => {
    if (onSeeWorks) {
      onSeeWorks();
    } else {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReachOutClick = () => {
    if (onReachOut) {
      onReachOut();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[720px] flex flex-col items-center justify-center overflow-hidden bg-bg"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-70"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/25" />
        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/80 to-transparent" />
      </div>

      {/* Hero Content (Centered, z-10) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-16 sm:pt-20">
        {/* Eyebrow + Live Lahore Clock Pill */}
        <div className="blur-in flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium font-mono">
              COLLECTION '26
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          {/* Live Lahore Ticking Clock */}
          {lahoreTime && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/70 backdrop-blur-md border border-stroke text-[11px] font-mono text-muted shadow-sm">
              <MapPin className="w-3 h-3 text-[#89AACC]" />
              <span>LAHORE</span>
              <span className="text-stroke">•</span>
              <span className="text-text-primary tabular-nums font-semibold">{lahoreTime}</span>
              <span className="relative flex h-1.5 w-1.5 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 selection:bg-text-primary selection:text-bg">
          Hasnain Shaheen
        </h1>

        {/* Role line with dynamic animation */}
        <p className="blur-in text-lg sm:text-xl md:text-2xl text-text-primary/90 font-light mb-4 flex items-center justify-center flex-wrap gap-x-2">
          <span>A</span>
          <span
            key={roleIndex}
            className="font-display italic text-text-primary text-xl sm:text-2xl md:text-3xl animate-role-fade-in inline-block border-b border-stroke/40 px-1"
          >
            {roles[roleIndex]}
          </span>
          <span>based in Lahore.</span>
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-lg mx-auto mb-10 md:mb-12 font-normal leading-relaxed text-balance">
          Engineering scalable architectures, intuitive interfaces, and AI-driven solutions from concept to production.
        </p>

        {/* CTA Buttons with Magnetic Pull */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* "View Projects" Solid Button */}
          <Magnetic strength={0.35}>
            <button
              onClick={handleWorksClick}
              data-cursor="pointer"
              className="relative group rounded-full p-[2px] transition-all duration-300 hover:scale-105 focus:outline-none"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]" />
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-full text-sm font-medium px-7 py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-all duration-300 shadow-md">
                View Projects
              </div>
            </button>
          </Magnetic>

          {/* "Get in Touch" Outlined Button */}
          <Magnetic strength={0.35}>
            <button
              onClick={handleReachOutClick}
              data-cursor="pointer"
              className="relative group rounded-full p-[2px] transition-all duration-300 hover:scale-105 focus:outline-none"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative rounded-full text-sm font-medium px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent transition-all duration-300">
                Get in Touch
              </div>
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] sm:text-xs text-muted uppercase tracking-[0.2em] font-medium font-mono">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden rounded-full">
          <div className="w-full h-1/2 accent-gradient rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
export default Hero;
