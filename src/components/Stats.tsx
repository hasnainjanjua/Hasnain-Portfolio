import React, { useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { STATS } from '../data/portfolioData';

interface CounterProps {
  value: number;
  suffix: string;
}

const AnimatedNumber: React.FC<CounterProps> = ({ value, suffix }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  return (
    <motion.span
      onViewportEnter={() => {
        const controls = animate(count, value, {
          duration: 1.8,
          ease: [0.25, 0.1, 0.25, 1],
          onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        });
        return () => controls.stop();
      }}
      viewport={{ once: true, margin: '-50px' }}
      className="tabular-nums font-display italic tracking-tight"
    >
      {displayValue}
      {suffix}
    </motion.span>
  );
};

export const Stats: React.FC = () => {
  const clientLogos = [
    'NATIONAL GAS 360',
    'CODEDROPS',
    'STARTUP SCHOOL',
    'GLOBAL REMOTE CLIENTS',
  ];

  return (
    <section id="stats" className="bg-bg py-16 md:py-24 relative border-t border-stroke/60">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* 3-Column Stats Grid with Animated Count-Up Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
          {STATS.map((stat, index) => {
            const numericVal = parseInt(stat.number.replace(/\D/g, ''), 10) || 0;
            const suffix = stat.number.replace(/[0-9]/g, '');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-surface/30 border border-stroke/80 hover:border-white/20 transition-all duration-300 group"
              >
                {/* Top accent line on hover */}
                <div className="absolute top-0 left-8 right-8 h-[2px] accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                <div>
                  {/* Animated Counter */}
                  <div className="text-5xl sm:text-6xl md:text-7xl font-display italic text-text-primary tracking-tight mb-3">
                    <AnimatedNumber value={numericVal} suffix={suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-base sm:text-lg text-text-primary font-medium mb-3">
                    {stat.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Client / Partner Logo Ribbon */}
        <div className="pt-8 border-t border-stroke/40 flex flex-col items-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted/60 mb-8">
            Featured Ventures & Highlights
          </span>
          <div className="w-full flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-16 opacity-40 hover:opacity-80 transition-opacity duration-500">
            {clientLogos.map((logo, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm font-mono tracking-widest text-text-primary select-none uppercase hover:text-white transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Stats;
