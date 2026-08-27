import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorType, setCursorType] = useState<string>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouch, setIsTouch] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer follower ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const activeElementRef = useRef<Element | null>(null);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check hovered element cursor data attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      
      if (cursorTarget !== activeElementRef.current) {
        activeElementRef.current = cursorTarget;
        if (cursorTarget) {
          const type = cursorTarget.getAttribute('data-cursor') || 'hover';
          const text = cursorTarget.getAttribute('data-cursor-text') || '';
          setCursorType(type);
          setCursorText(text);
        } else {
          // Check if hovering standard buttons or links
          const isClickable = target.closest('button, a, input, textarea, select, [role="button"]');
          if (isClickable) {
            setCursorType('pointer');
            setCursorText('');
          } else {
            setCursorType('default');
            setCursorText('');
          }
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* Central Sharp Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Dynamic Outer Follower Ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center transition-[background-color,border-color] duration-200 ${
          cursorType === 'view'
            ? 'w-20 h-20 bg-white text-bg border border-white font-semibold text-xs tracking-wider shadow-2xl backdrop-blur-md'
            : cursorType === 'explore'
            ? 'w-24 h-24 accent-gradient text-white font-display italic text-sm tracking-wide shadow-2xl shadow-[#4E85BF]/30'
            : cursorType === 'pointer'
            ? 'w-12 h-12 border border-[#89AACC]/80 bg-[#89AACC]/10 backdrop-blur-xs'
            : 'w-8 h-8 border border-white/30 bg-white/5'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorType === 'default' ? 1 : cursorType === 'pointer' ? 1.2 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        {/* Context text when hovering cards */}
        {cursorType === 'view' && (
          <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-bg">
            {cursorText || 'VIEW'}
          </span>
        )}
        {cursorType === 'explore' && (
          <span className="font-display italic text-sm tracking-normal">
            {cursorText || 'Expand ↗'}
          </span>
        )}
      </motion.div>
    </div>
  );
};
export default CustomCursor;
