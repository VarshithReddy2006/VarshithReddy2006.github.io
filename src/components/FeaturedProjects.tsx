import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

interface FeaturedProjectsProps {
  onSelectProject?: (id: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="featured-work"
      aria-label="Featured Projects"
      className="scroll-mt-24 py-20 sm:py-28 bg-[#F5F3EE] relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header with Editorial Meta */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E3E0D9]">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
              className="flex items-center gap-2 mb-3"
            >
              <Layers className="w-3.5 h-3.5 text-[#737780]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#737780]">
                Index of Selected Systems
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#202124]"
            >
              Featured Work
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 md:mt-0 text-xs font-mono text-[#737780] flex items-center gap-2"
          >
            <span>Showing 4 Core Systems</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9C9D8]" />
            <span>2024 &mdash; Present</span>
          </motion.div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {portfolioData.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {/* Section Footer */}
        <div className="mt-16 pt-8 border-t border-[#E3E0D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#737780]">
          <div className="flex items-center gap-2 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#7895B2]" />
            <span>Repository intelligence, trade compliance, developer OS & AI security</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#737780]">
            Click <strong className="text-[#202124]">View Project Details ↗</strong> for architectural breakdowns
          </span>
        </div>
      </div>
    </section>
  );
};
