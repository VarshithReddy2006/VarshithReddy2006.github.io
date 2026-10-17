import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SocialLink } from '../data/portfolioData';

interface SocialLinksProps {
  socials: SocialLink[];
  variant?: 'minimal' | 'pills' | 'editorial' | 'cards';
  className?: string;
  email?: string;
}

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45 1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45m1.37 9.74v-8.37H5.09v8.37h2.74z" />
  </svg>
);

export const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 7.614l4.35-4.657c.528-.564.511-1.453-.038-1.996A1.365 1.365 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z" />
  </svg>
);

export const CodeforcesIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-3 0V9a1.5 1.5 0 0 1 1.5-1.5zM12 3a1.5 1.5 0 0 1 1.5 1.5v16.5a1.5 1.5 0 0 1-3 0V4.5A1.5 1.5 0 0 1 12 3zm7.5 7.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-3 0v-9a1.5 1.5 0 0 1 1.5-1.5z" />
  </svg>
);

export const getPlatformIcon = (platform: SocialLink['platform'], className = 'w-4 h-4') => {
  switch (platform) {
    case 'github':
      return <GithubIcon className={className} />;
    case 'linkedin':
      return <LinkedinIcon className={className} />;
    case 'leetcode':
      return <LeetCodeIcon className={className} />;
    case 'codeforces':
      return <CodeforcesIcon className={className} />;
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  socials,
  variant = 'cards',
  className = '',
  email,
}) => {
  if (variant === 'cards') {
    // Exact cards style as shown in the hero mockup: rounded square cards
    const items = [...socials.filter(s => s.platform !== 'codeforces')];

    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {items.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} profile (${social.handle})`}
            className="w-11 h-11 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] flex items-center justify-center text-[#202124] hover:bg-white hover:border-[#202124] hover:scale-105 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            {getPlatformIcon(social.platform, 'w-4 h-4 text-[#202124]')}
          </a>
        ))}
        {email && (
          <a
            href={`mailto:${email}`}
            aria-label={`Send email to ${email}`}
            className="w-11 h-11 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] flex items-center justify-center text-[#202124] hover:bg-white hover:border-[#202124] hover:scale-105 transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            <Mail className="w-4 h-4 text-[#202124]" />
          </a>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} profile (${social.handle})`}
            className="p-2 text-[#737780] hover:text-[#202124] transition-colors rounded-full hover:bg-[#E3E0D9]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            {getPlatformIcon(social.platform)}
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'editorial') {
    return (
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} profile`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#737780] hover:text-[#202124] transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
          >
            <span className="text-[#202124]/70 group-hover:text-[#202124] transition-colors">
              {getPlatformIcon(social.platform)}
            </span>
            <span>{social.name}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        ))}
      </div>
    );
  }

  // Default pills variant
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social.name} profile`}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 text-xs tracking-wider uppercase font-semibold text-[#202124] bg-[#FAF9F6] border border-[#E3E0D9] rounded-full hover:border-[#202124] hover:bg-white transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
        >
          <span className="text-[#737780] group-hover:text-[#202124] transition-colors">
            {getPlatformIcon(social.platform)}
          </span>
          <span>{social.name}</span>
          <ArrowUpRight className="w-3 h-3 text-[#737780] group-hover:text-[#202124] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      ))}
    </div>
  );
};
