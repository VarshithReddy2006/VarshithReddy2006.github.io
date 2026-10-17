import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Check, Copy, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  return (
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
            className="absolute inset-0 bg-[#202124]/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FAF9F6] border border-[#E3E0D9] rounded-2xl p-6 sm:p-8 shadow-2xl z-10"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#E3E0D9]">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#737780]">
                  Direct Inquiries
                </span>
                <h3 id="contact-modal-title" className="text-2xl font-serif font-medium text-[#202124] mt-1">
                  Let's Connect
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 -mr-2 text-[#737780] hover:text-[#202124] rounded-lg hover:bg-[#E3E0D9]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="py-6 space-y-4">
              <p className="text-sm text-[#737780] leading-relaxed">
                Whether you have an engineering role, collaborative project, or would like to discuss AI systems and software architecture, feel free to reach out directly.
              </p>

              {/* Email Card */}
              <div className="p-4 bg-[#F5F3EE] border border-[#E3E0D9] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E3E0D9] flex items-center justify-center flex-shrink-0 text-[#202124]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-[#737780]">Email</p>
                    <p className="text-sm font-mono text-[#202124] truncate">{portfolioData.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E3E0D9] bg-white hover:border-[#202124] text-[#202124] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#737780]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#202124] text-[#F5F3EE] hover:bg-[#3C4043] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  >
                    <span>Send</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#E3E0D9] flex items-center justify-between text-xs text-[#737780]">
              <span>Status: <strong className="font-medium text-[#202124]">{portfolioData.status}</strong></span>
              <button
                type="button"
                onClick={onClose}
                className="font-medium text-[#202124] hover:underline"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
