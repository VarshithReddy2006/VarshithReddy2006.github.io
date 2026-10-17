import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Play, Pause, X } from 'lucide-react';

interface StoryIntroProps {
  onComplete: () => void;
}

interface SceneData {
  id: number;
  numberStr: string;
  sceneTitle: string;
  headline: string;
  supporting: string;
  closingLine?: string;
  imageSrc: string;
  durationMs: number;
  cameraMotion: string; // CSS animation class or transform direction
}

const SCENES: SceneData[] = [
  {
    id: 1,
    numberStr: '01',
    sceneTitle: 'THE BEGINNING',
    headline: 'Every expert was once a beginner.',
    supporting: 'Every great journey begins before you feel ready.',
    imageSrc: '/images/story/scene-1-beginning.jpg',
    durationMs: 3800,
    cameraMotion: 'kenburns-zoom-in',
  },
  {
    id: 2,
    numberStr: '02',
    sceneTitle: 'THE STRUGGLE',
    headline: 'You will feel behind. Learn anyway.',
    supporting: 'Let what others know inspire you, not stop you.',
    imageSrc: '/images/story/scene-2-struggle.jpg',
    durationMs: 3800,
    cameraMotion: 'kenburns-pan-left',
  },
  {
    id: 3,
    numberStr: '03',
    sceneTitle: 'THE WORK',
    headline: 'Small steps. Repeated relentlessly.',
    supporting: 'One problem solved. One concept understood. One project improved.',
    imageSrc: '/images/story/scene-3-work.jpg',
    durationMs: 3800,
    cameraMotion: 'kenburns-zoom-in',
  },
  {
    id: 4,
    numberStr: '04',
    sceneTitle: 'THE FAILURES',
    headline: 'Your failures are not your final version.',
    supporting: 'Every setback can teach you something worth carrying forward.',
    imageSrc: '/images/story/scene-4-failures.jpg',
    durationMs: 3800,
    cameraMotion: 'kenburns-pan-right',
  },
  {
    id: 5,
    numberStr: '05',
    sceneTitle: 'THE POSSIBILITY',
    headline: "You don't need permission to start building.",
    supporting: 'Start with what you know. Build with what you have.',
    imageSrc: '/images/story/scene-5-possibility.jpg',
    durationMs: 3800,
    cameraMotion: 'kenburns-zoom-in',
  },
  {
    id: 6,
    numberStr: '06',
    sceneTitle: 'THE CLIMAX',
    headline: 'The person you want to become is built by what you do today.',
    supporting: 'Your next chapter starts now.',
    closingLine: 'And this is my story.',
    imageSrc: '/images/story/scene-6-climax.jpg',
    durationMs: 5200,
    cameraMotion: 'kenburns-zoom-out',
  },
];

export const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  // Steps 0-5 are the 6 cinematic scenes
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  const startTimeRef = useRef<number>(Date.now());
  const animationFrameRef = useRef<number | null>(null);

  const totalScenes = SCENES.length; // 6
  const currentScene = SCENES[currentStep];

  // Preload upcoming images in the background to guarantee zero flicker
  useEffect(() => {
    SCENES.forEach((scene) => {
      const img = new Image();
      img.src = scene.imageSrc;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < totalScenes - 1) {
      setCurrentStep((prev) => prev + 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    } else {
      onComplete();
    }
  }, [currentStep, totalScenes, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setProgress(0);
      startTimeRef.current = Date.now();
    }
  }, [currentStep]);

  // Keyboard navigation: Space/Arrows/Enter/Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onComplete();
      } else if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onComplete]);

  // Cinematic timer loop for scenes
  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentDuration = currentScene.durationMs;
    startTimeRef.current = Date.now() - (progress / 100) * currentDuration;

    const tick = () => {
      if (isPaused) return;

      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / currentDuration) * 100);
      setProgress(pct);

      if (pct >= 100) {
        if (currentStep < totalScenes - 1) {
          setCurrentStep((prev) => prev + 1);
          setProgress(0);
          startTimeRef.current = Date.now();
        } else {
          onComplete();
        }
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentStep, isPaused, currentScene, totalScenes, onComplete, shouldReduceMotion]);

  return (
    <motion.div
      role="region"
      aria-label="Cinematic Storytelling Sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden select-none bg-[#0E0F12] text-white"
    >
      {/* ========================================================= */}
      {/* 4K CINEMATIC BACKGROUND LAYER                             */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 w-full h-full"
          >
            <motion.img
              src={currentScene.imageSrc}
              alt=""
              aria-hidden="true"
              initial={
                shouldReduceMotion
                  ? { scale: 1, x: 0 }
                  : currentScene.cameraMotion === 'kenburns-zoom-in'
                  ? { scale: 1.02, x: 0 }
                  : currentScene.cameraMotion === 'kenburns-pan-left'
                  ? { scale: 1.08, x: '1%' }
                  : currentScene.cameraMotion === 'kenburns-pan-right'
                  ? { scale: 1.08, x: '-1%' }
                  : { scale: 1.12, x: 0 }
              }
              animate={
                shouldReduceMotion
                  ? { scale: 1, x: 0 }
                  : currentScene.cameraMotion === 'kenburns-zoom-in'
                  ? { scale: 1.1, x: '-0.5%' }
                  : currentScene.cameraMotion === 'kenburns-pan-left'
                  ? { scale: 1.06, x: '-1.5%' }
                  : currentScene.cameraMotion === 'kenburns-pan-right'
                  ? { scale: 1.06, x: '1.5%' }
                  : { scale: 1.02, x: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0.01 : currentScene.durationMs / 1000 + 0.8,
                ease: 'linear',
              }}
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.04]"
            />

            {/* Atmospheric Cinema Gradient Overlays for High-Contrast Typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E0F12]/90 via-[#0E0F12]/40 to-transparent" />

            {/* Subtle Film Grain Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ========================================================= */}
      {/* TOP BAR: Monogram, Scene Tracker, Controls & Skip Button   */}
      {/* ========================================================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white flex items-center justify-center font-serif text-xs font-semibold tracking-wider">
            VR
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Scene Counter */}
          <div className="text-xs font-mono tracking-widest font-semibold text-[#B9C9D8]">
            SCENE {currentScene.numberStr} / 06
          </div>

          {/* Autoplay Pause / Play Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume sequence' : 'Pause sequence'}
            className="hidden sm:inline-flex p-1.5 rounded-full border border-white/20 hover:border-white/60 text-white/80 transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Always Visible Skip Button */}
          <button
            type="button"
            onClick={onComplete}
            aria-label="Skip story and enter portfolio"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-[#202124] text-xs font-mono tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Skip intro</span>
            <X className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN STAGE: Typography & Scene Dialogue                   */}
      {/* ========================================================= */}
      <main className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-12 py-10 flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.id}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, filter: shouldReduceMotion ? 'none' : 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16, filter: shouldReduceMotion ? 'none' : 'blur(3px)' }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="space-y-6 sm:space-y-8 max-w-3xl"
          >
            {/* Scene Eyebrow Tag */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#B9C9D8] shadow-[0_0_10px_#B9C9D8]" />
              <span className="text-xs font-mono tracking-[0.25em] uppercase font-bold text-[#B9C9D8]">
                {currentScene.numberStr} &bull; {currentScene.sceneTitle}
              </span>
            </div>

            {/* Cinematic Editorial Serif Headline */}
            <h1 className="font-serif font-normal text-[clamp(2.4rem,5.6vw,5rem)] leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)]">
              {currentScene.headline}
            </h1>

            {/* Supporting Thought / Sentence */}
            <p className="font-sans text-base sm:text-xl lg:text-2xl leading-relaxed text-[#D5D2C8] font-light max-w-2xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
              {currentScene.supporting}
            </p>

            {/* Scene 06 Climax Closing Line & Direct Enter Portfolio Action */}
            {currentScene.closingLine && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="pt-4 border-t border-white/20 space-y-4"
              >
                <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#B9C9D8] tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {currentScene.closingLine}
                </p>
                <div>
                  <button
                    type="button"
                    onClick={onComplete}
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-[#202124] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-[#F5F3EE] transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Enter Portfolio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ========================================================= */}
      {/* BOTTOM BAR: Film Timeline Progress Rail & Scene Navigation */}
      {/* ========================================================= */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-6 sm:pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Segmented 6-Scene Film Timeline Rail */}
        <div className="w-full sm:w-80 flex items-center gap-1.5" aria-hidden="true">
          {SCENES.map((scene, idx) => {
            const isCompleted = currentStep > idx;
            const isCurrent = currentStep === idx;
            const segmentProgress = isCompleted ? 100 : isCurrent ? progress : 0;

            return (
              <div
                key={scene.id}
                onClick={() => {
                  setCurrentStep(idx);
                  setProgress(0);
                  startTimeRef.current = Date.now();
                }}
                className="relative h-1 flex-1 rounded-full overflow-hidden cursor-pointer transition-colors bg-white/20"
                title={`Jump to Scene ${scene.numberStr}`}
              >
                <div
                  style={{ width: `${segmentProgress}%` }}
                  className="h-full transition-all duration-100 bg-[#B9C9D8]"
                />
              </div>
            );
          })}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="hidden md:inline-block text-[11px] font-mono mr-2 text-white/60">
            Space / Arrows to navigate
          </span>

          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            aria-label="Previous scene"
            className={`inline-flex items-center justify-center p-2 rounded-full border transition-all ${
              currentStep === 0
                ? 'opacity-30 cursor-not-allowed border-transparent'
                : 'border-white/20 text-white hover:bg-white/10'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all bg-white text-[#202124] hover:bg-[#F5F3EE]"
          >
            <span>{currentStep === totalScenes - 1 ? 'Enter Portfolio' : 'Next Scene'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </motion.div>
  );
};
