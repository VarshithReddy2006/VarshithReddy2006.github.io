import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  Edit3,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodeforcesIcon } from './SocialLinks';

const ENQUIRY_OPTIONS = [
  { value: 'internship', label: 'Internship Opportunity', subject: 'Internship Opportunity' },
  { value: 'collaboration', label: 'Software Engineering Collaboration', subject: 'Engineering Collaboration' },
  { value: 'open-source', label: 'Open Source Contribution', subject: 'Open Source Discussion' },
  { value: 'project-discussion', label: 'AI & Developer Tool Discussion', subject: 'Project Discussion' },
  { value: 'other', label: 'Other Inquiries', subject: 'General Inquiry' },
] as const;

interface FormValues {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Form input state
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    enquiryType: 'internship',
    message: '',
  });

  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    enquiryType: false,
    message: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Copy feedback states
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  // Verified social profiles from portfolioData
  const githubProfile = portfolioData.socials.find((s) => s.platform === 'github');
  const linkedinProfile = portfolioData.socials.find((s) => s.platform === 'linkedin');
  const leetcodeProfile = portfolioData.socials.find((s) => s.platform === 'leetcode');
  const codeforcesProfile = portfolioData.socials.find((s) => s.platform === 'codeforces');

  const validate = (fieldValues: FormValues): FormErrors => {
    const newErrors: FormErrors = {};

    if (!fieldValues.name.trim()) {
      newErrors.name = 'Please provide your name.';
    }

    if (!fieldValues.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(fieldValues.email.trim())) {
        newErrors.email = 'Please provide a valid email format (e.g. name@domain.com).';
      }
    }

    if (!fieldValues.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (fieldValues.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    return newErrors;
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    const updated = { ...values, [field]: value };
    setValues(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Fallback
    }
  };

  const constructFormattedMessage = () => {
    const selectedOption = ENQUIRY_OPTIONS.find((opt) => opt.value === values.enquiryType);
    const enquiryLabel = selectedOption ? selectedOption.label : 'General Inquiry';

    return `Name: ${values.name}
Email: ${values.email}
Enquiry Type: ${enquiryLabel}

Message:
${values.message}

---
Sent via Varshith Portfolio Contact Section`;
  };

  const handleCopyFormattedMessage = async () => {
    try {
      await navigator.clipboard.writeText(constructFormattedMessage());
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      enquiryType: true,
      message: true,
    });

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus the first invalid field for accessibility
      if (validationErrors.name) {
        document.getElementById('contact-name')?.focus();
      } else if (validationErrors.email) {
        document.getElementById('contact-email')?.focus();
      } else if (validationErrors.message) {
        document.getElementById('contact-message')?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const selectedOption = ENQUIRY_OPTIONS.find((opt) => opt.value === values.enquiryType);
      const subject = `[Portfolio Inquiry] ${selectedOption ? selectedOption.subject : 'Message'} - ${values.name}`;
      const body = constructFormattedMessage();

      // Encode parameters safely for mailto protocol
      const mailtoUrl = `mailto:${portfolioData.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Execute safe mailto delivery
      const mailtoLink = document.createElement('a');
      mailtoLink.href = mailtoUrl;
      mailtoLink.target = '_blank';
      mailtoLink.rel = 'noopener noreferrer';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);

      // Transition to client handoff state after simulated brief preparation
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 400);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError(
        'Unable to open your email client automatically. You can copy the formatted message and send it directly.'
      );
    }
  };

  const handleReturnToEdit = () => {
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const handleResetForm = () => {
    setValues({
      name: '',
      email: '',
      enquiryType: 'internship',
      message: '',
    });
    setTouched({
      name: false,
      email: false,
      enquiryType: false,
      message: false,
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmitError(null);
  };

  const selectedOption = ENQUIRY_OPTIONS.find((opt) => opt.value === values.enquiryType);
  const currentSubject = `[Portfolio Inquiry] ${selectedOption ? selectedOption.subject : 'Message'} - ${
    values.name || 'Visitor'
  }`;
  const webmailGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${
    portfolioData.email
  }&su=${encodeURIComponent(currentSubject)}&body=${encodeURIComponent(constructFormattedMessage())}`;

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="scroll-mt-24 py-16 sm:py-24 lg:py-28 bg-[#F5F3EE] border-t border-[#E3E0D9] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 pb-8 border-b border-[#E3E0D9]">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#737780]">
              GET IN TOUCH
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, delay: 0.05 }}
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-[#202124]"
          >
            Have an interesting problem?
            <span className="block font-serif italic text-[#7895B2] mt-1 sm:mt-1.5">
              Let's build something meaningful.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-[#737780] mt-4 max-w-2xl leading-relaxed"
          >
            I am actively seeking software engineering internships, collaborative technical projects,
            open-source initiatives, and discussions on applied AI systems and developer tooling.
            Whether you have an opportunity or a complex problem to discuss, I look forward to hearing from you.
          </motion.p>
        </div>

        {/* Two-Column Desktop / Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Contact & Profiles (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
            className="lg:col-span-5 space-y-6 sm:space-y-8"
          >
            {/* Primary Email Card */}
            <div className="bg-[#FAF9F6] border border-[#E3E0D9] rounded-2xl p-5 sm:p-7 shadow-sm">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#737780] block mb-2">
                DIRECT EMAIL
              </span>
              <a
                href={`mailto:${portfolioData.email}`}
                className="font-mono text-xs sm:text-sm md:text-base text-[#202124] font-medium hover:text-[#7895B2] transition-colors break-all block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] rounded-sm"
              >
                {portfolioData.email}
              </a>

              <div className="mt-4 pt-4 border-t border-[#E3E0D9]/70 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address to clipboard"
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-1.5 text-xs font-medium rounded-full border border-[#E3E0D9] bg-white hover:border-[#202124] text-[#202124] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[44px] sm:min-h-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#7895B2]" />
                      <span>Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#737780]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${portfolioData.email}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-1.5 text-xs font-medium rounded-full bg-[#202124] text-[#F5F3EE] hover:bg-[#3C4043] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[44px] sm:min-h-0"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail Client</span>
                </a>
              </div>
            </div>

            {/* Availability & Particulars */}
            <div className="space-y-3.5 text-xs text-[#737780] px-1">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#7895B2]">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[#202124] font-medium block">Current Availability</span>
                  <span className="break-words">{portfolioData.status}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#7895B2]">
                  <MapPin className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[#202124] font-medium block">Location</span>
                  <span className="break-words">{portfolioData.location} (Open to Remote & Relocation)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] flex items-center justify-center flex-shrink-0 mt-0.5 text-[#7895B2]">
                  <Clock className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[#202124] font-medium block">Response SLA</span>
                  <span className="break-words">Direct inquiries answered typically within 24 to 48 hours.</span>
                </div>
              </div>
            </div>

            {/* Verified Profiles */}
            <div className="pt-2">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#737780] block mb-3">
                VERIFIED PROFILES
              </span>

              <div className="space-y-2.5">
                {githubProfile && (
                  <a
                    href={githubProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] hover:border-[#202124] hover:bg-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E3E0D9] flex items-center justify-center text-[#202124] group-hover:scale-105 transition-transform flex-shrink-0">
                        <GithubIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#202124] flex items-center gap-1.5 flex-wrap">
                          <span>GitHub</span>
                          <span className="text-[11px] font-mono font-normal text-[#737780] break-all">
                            {githubProfile.handle}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#737780] truncate">Open source code, repositories, & architectures</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#737780] group-hover:text-[#202124] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                  </a>
                )}

                {linkedinProfile && (
                  <a
                    href={linkedinProfile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] hover:border-[#202124] hover:bg-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E3E0D9] flex items-center justify-center text-[#202124] group-hover:scale-105 transition-transform flex-shrink-0">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#202124] flex items-center gap-1.5 flex-wrap">
                          <span>LinkedIn</span>
                          <span className="text-[11px] font-mono font-normal text-[#737780] break-all">
                            {linkedinProfile.handle}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#737780] truncate">Professional network & engineering updates</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#737780] group-hover:text-[#202124] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
                  </a>
                )}

                {/* Additional coding handles */}
                {(leetcodeProfile || codeforcesProfile) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {leetcodeProfile && (
                      <a
                        href={leetcodeProfile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] hover:border-[#202124] text-xs text-[#202124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[36px]"
                        title="LeetCode Profile"
                      >
                        <LeetCodeIcon className="w-3.5 h-3.5 text-[#737780]" />
                        <span className="font-mono text-[11px]">LeetCode</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737780]" />
                      </a>
                    )}
                    {codeforcesProfile && (
                      <a
                        href={codeforcesProfile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] hover:border-[#202124] text-xs text-[#202124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[36px]"
                        title="Codeforces Profile"
                      >
                        <CodeforcesIcon className="w-3.5 h-3.5 text-[#737780]" />
                        <span className="font-mono text-[11px]">Codeforces</span>
                        <ArrowUpRight className="w-3 h-3 text-[#737780]" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Refined Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-[#FAF9F6] border border-[#E3E0D9] rounded-2xl p-5 sm:p-8 lg:p-9 shadow-editorial">
              {/* Form Card Header */}
              <div className="flex items-center justify-between pb-5 sm:pb-6 mb-6 border-b border-[#E3E0D9]">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-[#737780] block">
                    TRANSMISSION DISPATCH
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#202124] mt-0.5">
                    Send a Message
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#F5F3EE] border border-[#E3E0D9] flex items-center justify-center text-[#7895B2] flex-shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
              </div>

              {/* State A: Submission Hand-Off Panel (Explicit instruction: must click Send in email client) */}
              {isSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="py-2 space-y-6 text-[#202124] animate-fadeIn"
                >
                  <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E3E0D9] space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F5F3EE] border border-[#A7BACB] flex items-center justify-center text-[#7895B2] flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#7895B2]" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono tracking-widest uppercase text-[#7895B2] font-semibold block">
                          ACTION REQUIRED &bull; STEP 2 OF 2
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl font-medium text-[#202124] mt-0.5">
                          Draft Created &mdash; Press "Send" in Your Mail App
                        </h4>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-xs sm:text-sm text-[#202124] leading-relaxed">
                      <p>
                        Your email draft has been generated and pre-addressed to{' '}
                        <strong className="font-mono text-[#202124] font-medium break-all">
                          {portfolioData.email}
                        </strong>
                        .
                      </p>
                      <p className="mt-2 text-[#737780]">
                        <strong className="text-[#202124]">Please note:</strong> Your email app or webmail is where the actual sending happens. Switch over to your email window and click <strong className="text-[#202124]">Send</strong> to deliver your message.
                      </p>
                    </div>

                    <p className="text-[11px] font-mono text-[#737780] leading-relaxed">
                      If your mail application did not automatically open or if you prefer using webmail, please choose from the options below:
                    </p>
                  </div>

                  {/* Immediate Alternatives & Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <a
                        href={webmailGmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-[#202124] text-[#F5F3EE] text-xs font-medium uppercase tracking-wider hover:bg-[#3C4043] transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[44px]"
                      >
                        <span>Open in Gmail Web</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyFormattedMessage}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full border border-[#E3E0D9] bg-white hover:border-[#202124] text-[#202124] text-xs font-medium uppercase tracking-wider transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[44px]"
                      >
                        {copiedMessage ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#7895B2]" />
                            <span>Message Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#737780]" />
                            <span>Copy Formatted Message</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#737780]">
                      <button
                        type="button"
                        onClick={handleReturnToEdit}
                        className="inline-flex items-center gap-1.5 hover:text-[#202124] transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit your message</span>
                      </button>

                      <span>&bull;</span>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center gap-1.5 hover:text-[#202124] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Start a new message</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* State B: Active Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Recoverable Error Banner */}
                  {submitError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-[#FFF6F6] border border-[#F0D5D5] flex items-start gap-3 text-xs text-[#8A2B2B]"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#B93838]" />
                      <div className="flex-1 space-y-2 min-w-0">
                        <p className="font-medium break-words">{submitError}</p>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={handleCopyFormattedMessage}
                            className="underline font-semibold hover:text-black"
                          >
                            Copy message to clipboard
                          </button>
                          <span>&bull;</span>
                          <button
                            type="button"
                            onClick={() => setSubmitError(null)}
                            className="underline hover:text-black"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-[#202124] mb-1.5 font-medium"
                    >
                      Your Name <span className="text-[#7895B2]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Dr. Alex Morgan"
                      aria-required="true"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-base sm:text-sm text-[#202124] placeholder:text-[#969AA3] transition-colors focus:outline-none focus:ring-1 min-h-[44px] ${
                        touched.name && errors.name
                          ? 'border-[#B93838] focus:border-[#B93838] focus:ring-[#B93838]'
                          : 'border-[#E3E0D9] hover:border-[#C9C5BC] focus:border-[#7895B2] focus:ring-[#7895B2]'
                      }`}
                    />
                    {touched.name && errors.name && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="text-xs font-mono text-[#B93838] mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-[#202124] mb-1.5 font-medium"
                    >
                      Email Address <span className="text-[#7895B2]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="alex.morgan@company.com"
                      aria-required="true"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-base sm:text-sm text-[#202124] placeholder:text-[#969AA3] transition-colors focus:outline-none focus:ring-1 min-h-[44px] ${
                        touched.email && errors.email
                          ? 'border-[#B93838] focus:border-[#B93838] focus:ring-[#B93838]'
                          : 'border-[#E3E0D9] hover:border-[#C9C5BC] focus:border-[#7895B2] focus:ring-[#7895B2]'
                      }`}
                    />
                    {touched.email && errors.email && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="text-xs font-mono text-[#B93838] mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Enquiry Type Selector */}
                  <div>
                    <label
                      htmlFor="contact-enquiry"
                      className="block text-xs font-mono uppercase tracking-wider text-[#202124] mb-1.5 font-medium"
                    >
                      Enquiry Type <span className="text-[#737780] font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-enquiry"
                        value={values.enquiryType}
                        onChange={(e) => handleChange('enquiryType', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E3E0D9] text-base sm:text-sm text-[#202124] hover:border-[#C9C5BC] focus:outline-none focus:border-[#7895B2] focus:ring-1 focus:ring-[#7895B2] transition-colors appearance-none cursor-pointer pr-10 min-h-[44px]"
                      >
                        {ENQUIRY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#737780]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono uppercase tracking-wider text-[#202124] font-medium"
                      >
                        Message <span className="text-[#7895B2]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-[#737780]">
                        {values.message.length} chars
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Describe the opportunity, engineering challenge, or ideas you'd like to collaborate on..."
                      aria-required="true"
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                      className={`w-full px-4 py-3 rounded-xl bg-white border text-base sm:text-sm text-[#202124] placeholder:text-[#969AA3] transition-colors focus:outline-none focus:ring-1 resize-y min-h-[120px] ${
                        touched.message && errors.message
                          ? 'border-[#B93838] focus:border-[#B93838] focus:ring-[#B93838]'
                          : 'border-[#E3E0D9] hover:border-[#C9C5BC] focus:border-[#7895B2] focus:ring-[#7895B2]'
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p
                        id="contact-message-error"
                        role="alert"
                        className="text-xs font-mono text-[#B93838] mt-1.5 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3 flex-shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Form Submission Button & Safety Assurance */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full bg-[#202124] text-[#F5F3EE] hover:bg-[#3C4043] disabled:opacity-60 disabled:cursor-not-allowed text-xs font-medium uppercase tracking-wider transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] min-h-[48px]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#F5F3EE] border-t-transparent rounded-full animate-spin" />
                          <span>Preparing Draft in Mail App...</span>
                        </>
                      ) : (
                        <>
                          <span>Draft & Send Message</span>
                          <Send className="w-3.5 h-3.5 text-[#F5F3EE] group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] font-mono text-center text-[#737780] leading-relaxed">
                      Launches your email client with this message pre-filled &bull; Please click <strong className="text-[#202124] font-semibold">Send</strong> in your mail app to finish delivery
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
