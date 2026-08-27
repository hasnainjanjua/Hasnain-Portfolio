import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { ArrowUpRight, Mail } from 'lucide-react';
import Magnetic from './Magnetic';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Setup HLS video background (flipped vertically)
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

  // GSAP Infinite Marquee Animation
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      gsap.to(marquee, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  const marqueeText = Array(10).fill('ARCHITECTING THE FUTURE • ').join('');

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/hasnain-shaheen/' },
    { name: 'GitHub', url: 'https://github.com/hasnainshaheen' },
    { name: 'Twitter', url: 'https://twitter.com' },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden select-none border-t border-stroke"
    >
      {/* Background Video (Flipped vertically: scale-y-[-1]) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 min-w-full min-h-full w-auto h-auto object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-50"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Heavier Overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-10 flex flex-col items-center">
        {/* Marquee Banner */}
        <div className="w-full overflow-hidden mb-16 md:mb-20 pointer-events-none py-2">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-4xl sm:text-6xl md:text-8xl font-display italic tracking-wider text-text-primary/10 select-none uppercase"
          >
            <span className="shrink-0">{marqueeText}</span>
            <span className="shrink-0">{marqueeText}</span>
          </div>
        </div>

        {/* Center Contact Action */}
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.3em] text-muted mb-4 font-mono">
            Get in touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic text-text-primary mb-8 tracking-tight">
            Let's build something exceptional together.
          </h2>

          {/* Email Button / Drawer Trigger with Magnetic */}
          <Magnetic strength={0.4}>
            <button
              onClick={onOpenContact}
              data-cursor="pointer"
              className="relative group rounded-full p-[2px] transition-all duration-300 hover:scale-105 inline-block text-left"
            >
              <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[4px]" />
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-surface/90 border border-stroke group-hover:border-transparent backdrop-blur-md transition-all shadow-xl">
                <Mail className="w-5 h-5 text-[#89AACC]" />
                <span className="font-display italic text-xl sm:text-2xl md:text-3xl text-text-primary">
                  husnainshaheen000@gmail.com
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </button>
          </Magnetic>
        </div>

        {/* Bottom Footer Bar */}
        <div className="w-full pt-8 border-t border-stroke/80 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Availability Status */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/80 border border-stroke text-xs text-text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium">Available for select engineering leadership & advisory roles</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <Magnetic key={social.name} strength={0.3}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors hover:underline underline-offset-4"
                >
                  {social.name}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted font-mono">
            © 2026 Hasnain Shaheen. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
