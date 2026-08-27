import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis:stop'));
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg/80 backdrop-blur-xl transition-all"
          />

          {/* Modal Card with scroll isolation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto overscroll-contain bg-surface border border-stroke rounded-3xl p-6 sm:p-10 shadow-2xl z-10 custom-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-bg/80 border border-stroke text-muted hover:text-text-primary hover:border-white/20 transition-all duration-200 z-20 focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                {project.year}
              </span>
              <span className="text-stroke">•</span>
              <span className="text-xs uppercase tracking-wider text-accent font-medium px-2.5 py-0.5 rounded-full bg-stroke/60">
                {project.category}
              </span>
              {project.client && (
                <>
                  <span className="text-stroke">•</span>
                  <span className="text-xs text-muted">Role: {project.client}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display italic text-text-primary mb-6">
              {project.title}
            </h2>

            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-stroke">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
            </div>

            {/* Description */}
            <div className="space-y-6 text-muted text-sm sm:text-base leading-relaxed mb-8">
              <p className="text-text-primary text-base sm:text-lg font-light leading-relaxed">
                {project.fullDescription || project.description}
              </p>
              <p>
                Engineered with modern web standards, rigorous attention to micro-interactions, responsive ergonomics, and high-performance system architecture.
              </p>
            </div>

            {/* Deliverables & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stroke mb-8">
              {project.deliverables && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">
                    Key Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {project.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-text-primary">
                        <CheckCircle2 className="w-4 h-4 text-[#89AACC] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted mb-3 font-semibold">
                  Technologies & Disciplines
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1.5 rounded-full bg-bg border border-stroke text-text-primary font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stroke">
              <span className="text-xs text-muted font-mono">
                Collection '26 Project Overview
              </span>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium bg-text-primary text-bg hover:bg-white transition-all shadow-md"
              >
                <span>Done Viewing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default ProjectModal;
