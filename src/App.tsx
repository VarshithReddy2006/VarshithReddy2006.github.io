import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ProjectDetailView } from './components/ProjectDetailView';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { portfolioData } from './data/portfolioData';

export const App: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Synchronize active project from URL hash (#project/{id})
  const [activeProjectId, setActiveProjectId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const id = hash.replace('#project/', '');
        return portfolioData.projects.some((p) => p.id === id) ? id : null;
      }
    }
    return null;
  });

  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Track mouse coordinates for ambient desktop spotlight and scroll position for Back-to-Top
  useEffect(() => {
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 550);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const id = hash.replace('#project/', '');
        if (portfolioData.projects.some((p) => p.id === id)) {
          setActiveProjectId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }
      setActiveProjectId(null);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (id: string) => {
    window.location.hash = `#project/${id}`;
    setActiveProjectId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    window.location.hash = '#featured-work';
    setActiveProjectId(null);
    setTimeout(() => {
      const element = document.getElementById('featured-work');
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeProject = portfolioData.projects.find((p) => p.id === activeProjectId);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F3EE] text-[#202124] relative selection:bg-[#7895B2]/20">
      {/* Cinematic Ambient Mouse Spotlight (desktop only, pointer-events-none) */}
      {!shouldReduceMotion && (
        <div
          className="pointer-events-none fixed inset-0 z-30 hidden md:block transition-opacity duration-500"
          style={{
            background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 149, 178, 0.09), transparent 75%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Universal Header with Scroll Reading Indicator */}
      <Header
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content Area with Filmic Route Transitions */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {activeProject ? (
            /* Dedicated Project Detail View */
            <motion.div
              key={`project-${activeProject.id}`}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
                filter: shouldReduceMotion ? 'none' : 'blur(4px)',
              }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : -16,
                filter: shouldReduceMotion ? 'none' : 'blur(4px)',
              }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <ProjectDetailView
                project={activeProject}
                onBack={handleBackToProjects}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          ) : (
            /* Primary Portfolio Flow: Home -> About -> Projects -> Experience -> Achievements -> Contact */
            <motion.div
              key="main-portfolio-feed"
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
                filter: shouldReduceMotion ? 'none' : 'blur(4px)',
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transitionEnd: { filter: 'none' },
              }}
              exit={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : -16,
                filter: shouldReduceMotion ? 'none' : 'blur(4px)',
              }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Editorial Hero Section */}
              <Hero onOpenResume={() => setIsResumeOpen(true)} />

              {/* About & Engineering Philosophy Section with Compact Skills */}
              <AboutSection
                onOpenContact={() => setIsContactOpen(true)}
                onOpenResume={() => setIsResumeOpen(true)}
              />

              {/* Featured Projects Section with "Show More ↗" Buttons */}
              <FeaturedProjects onSelectProject={handleSelectProject} />

              {/* Evidence-Based Experience & Open Source Timeline */}
              <ExperienceSection />

              {/* Curated Milestones & Technical Recognition */}
              <AchievementsSection />

              {/* Direct Contact & Collaboration Section */}
              <ContactSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Responsive Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating Cinematic Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 12 }}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#202124]/90 text-[#F5F3EE] backdrop-blur-md border border-[#E3E0D9]/50 shadow-xl hover:bg-[#202124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] group"
          >
            <ArrowUp className="w-4 h-4 text-[#F5F3EE] group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
