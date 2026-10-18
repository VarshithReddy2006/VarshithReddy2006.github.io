import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Copy, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // fallback
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#202124]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF9F6] border border-[#E3E0D9] rounded-2xl p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 p-2 text-[#737780] hover:text-[#202124] rounded-lg hover:bg-[#E3E0D9]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#737780] font-semibold">
                Direct Contact
              </span>
              <h3 id="contact-modal-title" className="text-2xl font-serif font-medium text-[#202124] mt-1">
                Let&apos;s build something together.
              </h3>
              <p className="text-xs sm:text-sm text-[#737780] mt-1.5 font-sans">
                Available for engineering internships, technical roles, and open-source collaborations.
              </p>
            </div>

            {/* Email Box with One-Click Copy */}
            <div className="p-4 bg-white border border-[#E3E0D9] rounded-xl mb-6 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#737780]">
                  Direct Email Address
                </span>
                {copied && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-semibold animate-fadeIn">
                    <Check className="w-3 h-3" />
                    <span>COPIED TO CLIPBOARD</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#202124] truncate">
                  {portfolioData.email}
                </span>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] hover:bg-[#202124] hover:text-[#FAF9F6] transition-all flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${portfolioData.email}?subject=Collaboration%20Inquiry%20via%20Portfolio`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#202124] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#3C4043] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
              >
                <Mail className="w-4 h-4" />
                <span>Compose Email</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-full bg-white border border-[#E3E0D9] text-[#202124] text-xs font-semibold uppercase tracking-wider hover:bg-[#FAF9F6] transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
