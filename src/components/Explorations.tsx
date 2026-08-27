import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { EXPLORATIONS, type ExplorationItem } from '../data/portfolioData';
import LightboxModal from './LightboxModal';
import Magnetic from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  const col1Items = EXPLORATIONS.filter((item) => item.col === 1);
  const col2Items = EXPLORATIONS.filter((item) => item.col === 2);

  const bgVideoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4';

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedContent = pinnedContentRef.current;
    const videoContainer = videoContainerRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!section || !pinnedContent || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      // 1. Pin the center title layer
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContent,
        pinSpacing: false,
      });

      // 2. Pin the background video layer
      if (videoContainer) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: videoContainer,
          pinSpacing: false,
        });
      }

      // 3. Parallax animation for Column 1
      gsap.fromTo(
        col1,
        { y: 120 },
        {
          y: -280,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );

      // 4. Parallax animation for Column 2 (Opposite / offset speed)
      gsap.fromTo(
        col2,
        { y: 380 },
        {
          y: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[260vh] md:min-h-[300vh] bg-bg overflow-hidden py-24 select-none"
    >
      {/* ================= BACKGROUND VIDEO LAYER (PINNED) ================= */}
      <div
        ref={videoContainerRef}
        className="w-full h-screen absolute top-0 left-0 overflow-hidden pointer-events-none z-0"
      >
        <video
          src={bgVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 opacity-95 scale-105"
        />
        
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Top Fade Gradient */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-bg via-bg/60 to-transparent" />

        {/* Bottom Fade Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      {/* ================= LAYER 1: PINNED CENTER TITLE (z-10) ================= */}
      <div
        ref={pinnedContentRef}
        className="w-full h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none relative z-10"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center backdrop-blur-md bg-bg/30 p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium font-mono">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-normal tracking-tight text-text-primary mb-4">
            Labs & <span className="font-display italic text-text-primary">Visual Experiments</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted max-w-sm mx-auto mb-8 font-light leading-relaxed">
            Creative coding, cinematic prompt styling, and 3D architectural studies.
          </p>

          {/* GitHub button with Magnetic Pull */}
          <div className="pointer-events-auto">
            <Magnetic strength={0.4}>
              <a
                href="https://github.com/hasnainshaheen"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="relative group rounded-full p-[1.5px] inline-flex items-center transition-all duration-300 hover:scale-105"
              >
                <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[3px]" />
                <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface border border-stroke group-hover:border-transparent text-xs font-medium text-text-primary transition-colors shadow-lg">
                  <Code2 className="w-3.5 h-3.5 text-[#89AACC]" />
                  <span>View on GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* ================= LAYER 2: PARALLAX FLOATING COLUMNS (z-20) ================= */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 pointer-events-auto">
        <div className="grid grid-cols-2 gap-6 sm:gap-12 md:gap-40 items-start">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-20 sm:gap-32 md:gap-44 pt-12">
            {col1Items.map((item) => (
              <div
                key={item.id}
                data-cursor="explore"
                data-cursor-text="ZOOM"
                onClick={() => setActiveItem(item)}
                className={`group relative aspect-square max-w-[320px] w-full mx-auto rounded-3xl overflow-hidden border border-stroke/80 bg-surface/90 backdrop-blur-sm cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:border-white/50 hover:shadow-[0_20px_50px_rgba(78,133,191,0.3)] hover:z-30 ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#89AACC]">
                    {item.subtitle}
                  </span>
                  <h4 className="text-lg font-display italic text-text-primary">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-20 sm:gap-32 md:gap-44 pt-48 md:pt-64">
            {col2Items.map((item) => (
              <div
                key={item.id}
                data-cursor="explore"
                data-cursor-text="ZOOM"
                onClick={() => setActiveItem(item)}
                className={`group relative aspect-square max-w-[320px] w-full mx-auto rounded-3xl overflow-hidden border border-stroke/80 bg-surface/90 backdrop-blur-sm cursor-pointer shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:border-white/50 hover:shadow-[0_20px_50px_rgba(78,133,191,0.3)] hover:z-30 ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#89AACC]">
                    {item.subtitle}
                  </span>
                  <h4 className="text-lg font-display italic text-text-primary">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
};
export default Explorations;
