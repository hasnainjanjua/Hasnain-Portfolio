import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PROJECTS, type Project } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import Magnetic from './Magnetic';

interface BentoCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number; opacity: number }>({
    x: 0,
    y: 0,
    opacity: 0,
  });
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const getColSpanClass = (span: number) => {
    return span === 7 ? 'md:col-span-7' : 'md:col-span-5';
  };

  const aspectClass =
    project.span === 7
      ? 'aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/10]'
      : 'aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3]';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlightPos({ x, y, opacity: 1 });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`${getColSpanClass(
        project.span
      )} group relative rounded-3xl overflow-hidden cursor-pointer perspective-1000`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project)}
        data-cursor="view"
        data-cursor-text="VIEW"
        className={`relative w-full ${aspectClass} rounded-3xl overflow-hidden bg-surface border border-stroke shadow-lg transition-all duration-300 ease-out group-hover:border-white/20`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1), border-color 0.3s',
        }}
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(550px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(137, 170, 204, 0.16), transparent 50%)`,
          }}
        />

        {/* Background Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Halftone Overlay */}
        <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />

        {/* Bottom Ambient Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/25 to-transparent pointer-events-none" />

        {/* Top-Right Pill Tag */}
        <div className="absolute top-5 right-5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-bg/70 backdrop-blur-md border border-stroke text-muted">
            {project.year}
          </span>
        </div>

        {/* Bottom Info Always Visible */}
        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col gap-1.5 transition-transform duration-300 group-hover:-translate-y-2">
          <span className="text-xs uppercase tracking-widest text-[#89AACC] font-medium font-mono">
            {project.category}
          </span>
          <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary">
            {project.title}
          </h3>
        </div>

        {/* Hover Backdrop Overlay */}
        <div className="absolute inset-0 bg-bg/75 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 sm:p-8 z-20">
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono uppercase tracking-wider text-muted">
              {project.tags.join(' • ')}
            </span>
            <div className="w-8 h-8 rounded-full bg-surface border border-stroke flex items-center justify-center text-text-primary">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center my-auto text-center px-4">
            {/* Hover Pill Label with animated gradient border */}
            <div className="relative p-[1.5px] rounded-full accent-gradient-border shadow-xl">
              <div className="px-5 py-2.5 rounded-full bg-white text-bg flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold tracking-wide">
                  View —
                </span>
                <span className="font-display italic text-base sm:text-lg">
                  {project.title}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted mt-4 max-w-sm line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex justify-between items-center text-xs text-muted/80 font-mono">
            <span>Interactive Preview</span>
            <span>Click to explore</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SelectedWorks: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterTabs = [
    { id: 'All', label: 'All Projects' },
    { id: 'Enterprise', label: 'Enterprise & Cloud' },
    { id: 'MobileAI', label: 'Mobile & AI' },
    { id: 'Design', label: 'Design & Architecture' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Enterprise') return p.tags.includes('Enterprise Logistics') || p.tags.includes('System Architecture');
    if (activeFilter === 'MobileAI') return p.tags.includes('Mobile App') || p.tags.includes('AI Workflows') || p.tags.includes('Cursor AI');
    if (activeFilter === 'Design') return p.category.includes('Spatial') || p.tags.includes('3D Rendering');
    return true;
  });

  return (
    <section id="work" className="bg-bg py-12 md:py-16 relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with Framer Motion whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium font-mono">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary font-normal tracking-tight">
              Featured <span className="font-display italic text-text-primary">Projects & Ventures</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-md mt-3 font-light leading-relaxed">
              End-to-end engineering, scalable platforms, and technical leadership.
            </p>
          </div>

          {/* Desktop "View all work" button with Magnetic */}
          <div className="hidden md:inline-flex">
            <Magnetic strength={0.35}>
              <button
                onClick={() => setSelectedProject(PROJECTS[0])}
                data-cursor="pointer"
                className="relative group rounded-full p-[1.5px] transition-all duration-300 hover:scale-105 focus:outline-none"
              >
                <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-stroke group-hover:border-transparent text-xs font-medium text-text-primary transition-colors">
                  <span>View all work</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            </Magnetic>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                data-cursor="pointer"
                className={`relative px-4 py-2 rounded-full text-xs font-medium transition-colors shrink-0 ${
                  isActive ? 'text-text-primary' : 'text-muted hover:text-text-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-surface border border-white/20 shadow-sm"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid: 7 / 5 / 5 / 7 with 3D Tilt and Cursor Spotlight */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <BentoCard
                key={project.id}
                project={project}
                index={index}
                onSelect={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
export default SelectedWorks;
