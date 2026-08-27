import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import type { ExplorationItem } from '../data/portfolioData';

interface LightboxModalProps {
  item: ExplorationItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis:stop'));
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg/90 backdrop-blur-2xl"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            data-lenis-prevent
            className="relative z-10 max-w-4xl w-full max-h-[90vh] overflow-y-auto overscroll-contain flex flex-col items-center bg-surface border border-stroke rounded-3xl p-6 sm:p-8 shadow-2xl custom-scrollbar"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-bg/80 border border-stroke text-muted hover:text-text-primary hover:border-white/20 transition-colors z-20 focus:outline-none"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual */}
            <div className="relative w-full max-h-[60vh] aspect-[4/3] rounded-2xl overflow-hidden border border-stroke mb-6 flex items-center justify-center bg-bg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 halftone-overlay opacity-15 pointer-events-none" />
            </div>

            {/* Meta */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#89AACC] font-mono">
                  {item.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted mt-2 max-w-lg">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-muted bg-bg border border-stroke">
                  <ZoomIn className="w-3.5 h-3.5" /> High-Res Render
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default LightboxModal;
