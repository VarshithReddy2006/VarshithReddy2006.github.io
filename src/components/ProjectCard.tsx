import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import { Project } from '../data/portfolioData';
import { GithubIcon } from './SocialLinks';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const shouldReduceMotion = useReducedMotion();

  const isFlagship = project.id === 'aria';
  const hasValidGithub = Boolean(
    project.links?.github && project.links.github !== '#' && project.links.github !== ''
  );
  const hasValidLive = Boolean(
    project.links?.live && project.links.live !== '#' && project.links.live !== ''
  );

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(project.id);
    } else {
      window.location.hash = `#project/${project.id}`;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: 'easeOut',
      }}
      className={`group relative bg-white border rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-editorial hover:shadow-2xl flex flex-col justify-between ${
        isFlagship
          ? 'border-[#202124]/30 ring-1 ring-[#202124]/10 hover:border-[#202124]/50'
          : 'border-[#E3E0D9] hover:border-[#7895B2]/70'
      }`}
    >
      <div className="flex-grow flex flex-col">
        {/* 1. Project number and category label & 2. Existing GitHub action */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E3E0D9]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-lg sm:text-xl font-serif font-semibold text-[#202124]">
              {project.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9C9D8]" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#737780] font-medium">
              {project.category}
            </span>
            {isFlagship && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#202124] text-[#F5F3EE] text-[10px] font-mono uppercase tracking-wider font-semibold ml-1">
                <Sparkles className="w-2.5 h-2.5 text-[#B9C9D8]" />
                <span>Flagship</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {hasValidGithub && (
              <a
                href={project.links!.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="p-2 text-[#737780] hover:text-[#202124] rounded-lg hover:bg-[#F5F3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                title="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {hasValidLive && (
              <a
                href={project.links!.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live deployment for ${project.title}`}
                className="p-2 text-[#737780] hover:text-[#202124] rounded-lg hover:bg-[#F5F3EE] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                title="Live Application"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* 3. Project title in editorial serif typography */}
        <div className="space-y-1.5 mb-3.5">
          <h3
            onClick={handleOpenDetail}
            className="text-2xl sm:text-3xl font-serif font-medium text-[#202124] tracking-tight hover:text-[#7895B2] transition-colors cursor-pointer leading-snug"
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono text-[#7895B2] uppercase tracking-wider font-semibold">
            {project.subtitle}
          </p>
        </div>

        {/* 4. Concise, technically credible project summary */}
        <p className="text-sm text-[#202124]/80 leading-relaxed font-sans mb-5">
          {project.description}
        </p>

        {/* 5. A compact row of relevant technology tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono text-[#202124] bg-[#F5F3EE] border border-[#E3E0D9] rounded-md tracking-tight"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 6. Two or three concise engineering highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-2 mb-6 bg-[#FAF9F6] p-4 rounded-xl border border-[#E3E0D9]/80 mt-auto">
            <span className="text-[10px] font-mono tracking-wider uppercase text-[#737780] block font-semibold">
              Engineering Highlights
            </span>
            <ul className="space-y-2">
              {project.highlights.slice(0, 3).map((highlight, hIndex) => (
                <li key={hIndex} className="text-xs text-[#202124] flex items-start gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#7895B2] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 7. Clear, keyboard-accessible "View Project Details" action */}
      <div className="pt-4 border-t border-[#E3E0D9]">
        <button
          type="button"
          onClick={handleOpenDetail}
          aria-label={`View project details and architecture for ${project.title}`}
          className="relative overflow-hidden inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-[#202124] text-[#F5F3EE] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#3C4043] transition-all shadow-sm group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
        >
          {/* Subtle button shimmer light sweep */}
          {!shouldReduceMotion && (
            <span
              className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          )}
          <span>View Project Details</span>
          <ArrowUpRight className="w-4 h-4 text-[#B9C9D8] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.article>
  );
};
