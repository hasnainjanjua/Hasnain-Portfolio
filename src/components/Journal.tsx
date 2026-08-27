import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Clock, Calendar, X } from 'lucide-react';
import { JOURNAL_ARTICLES, type JournalArticle } from '../data/portfolioData';

export const Journal: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis:stop'));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
    }
  }, [activeArticle]);

  return (
    <section id="journal" className="bg-bg py-16 md:py-24 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium font-mono">
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
              Technical <span className="font-display italic text-text-primary">Insights & Musings</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md mt-3 font-light leading-relaxed">
              Thoughts on software architecture, team leadership, AI-driven development, and system craft.
            </p>
          </div>

          {/* "View all" Button */}
          <div className="inline-flex">
            <button
              onClick={() => setActiveArticle(JOURNAL_ARTICLES[0])}
              className="relative group rounded-full p-[1.5px] transition-all duration-300 hover:scale-105 focus:outline-none"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-stroke group-hover:border-transparent text-xs font-medium text-text-primary transition-colors">
                <span>View all articles</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* 4 Journal Entries as Horizontal Pills */}
        <div className="flex flex-col gap-4">
          {JOURNAL_ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setActiveArticle(article)}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 p-4 sm:p-5 bg-surface/30 hover:bg-surface border border-stroke hover:border-white/20 rounded-[32px] sm:rounded-full transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              {/* Left Column: Thumbnail + Title */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                {/* Round Thumbnail */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-stroke group-hover:border-white/30 transition-colors">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 halftone-overlay opacity-20 pointer-events-none" />
                </div>

                {/* Article Meta & Title */}
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted">
                    <span className="text-[#89AACC] font-medium">{article.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl text-text-primary font-medium group-hover:text-white transition-colors truncate">
                    {article.title}
                  </h3>
                </div>
              </div>

              {/* Right Column: Read Time + Action Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 sm:pr-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-muted font-mono px-3 py-1 rounded-full bg-bg border border-stroke">
                  <Clock className="w-3 h-3 text-muted" />
                  {article.readTime}
                </span>

                <div className="w-9 h-9 rounded-full bg-surface border border-stroke group-hover:border-transparent group-hover:accent-gradient flex items-center justify-center text-muted group-hover:text-bg transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              data-lenis-prevent
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto overscroll-contain bg-surface border border-stroke rounded-3xl p-6 sm:p-10 shadow-2xl z-10 custom-scrollbar"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-bg border border-stroke text-muted hover:text-text-primary transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-muted mb-4">
                <span className="text-[#89AACC] font-semibold">{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-display italic text-text-primary mb-6">
                {activeArticle.title}
              </h2>

              <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-8 border border-stroke">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none text-muted space-y-4 text-sm sm:text-base leading-relaxed">
                <p className="text-text-primary text-lg font-light">
                  {activeArticle.snippet}
                </p>
                <p>
                  Modern software development is at an inflection point. By synthesizing deterministic architecture with probabilistic AI pipelines, engineering leaders can unlock unprecedented leverage without sacrificing code quality or security.
                </p>
                <p>
                  Focusing on modularity, clear abstractions, automated pipelines, and ergonomic tooling ensures teams can deliver mission-critical software that scales gracefully over years of production load.
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-stroke flex justify-between items-center">
                <span className="text-xs font-mono text-muted">Author: Hasnain Shaheen</span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-full text-xs font-medium bg-stroke/60 text-text-primary hover:bg-stroke transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Journal;
