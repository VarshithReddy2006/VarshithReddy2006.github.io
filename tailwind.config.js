/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F3EE',
          50: '#FDFDFB',
          100: '#FAF9F6',
          200: '#F5F3EE',
          300: '#ECE9E1',
          400: '#DDD9CF',
        },
        charcoal: {
          DEFAULT: '#202124',
          subtle: '#3C4043',
          deep: '#141517',
        },
        muted: {
          DEFAULT: '#737780',
          dark: '#52555D',
          light: '#969AA3',
        },
        accent: {
          DEFAULT: '#B9C9D8',
          soft: 'rgba(185, 201, 216, 0.22)',
          border: '#A7BACB',
          deep: '#7895B2',
        },
        border: {
          DEFAULT: '#E3E0D9',
          light: '#EFECE6',
          dark: '#D2CEC4',
        },
      },
      fontFamily: {
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        script: ['Caveat', 'cursive'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        'display-xl': ['clamp(2.5rem, 5.5vw, 4.75rem)', { lineHeight: '1.06', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
        editorial: '0.04em',
        caps: '0.12em',
      },
      boxShadow: {
        'editorial': '0 1px 3px rgba(32, 33, 36, 0.04), 0 10px 24px -8px rgba(32, 33, 36, 0.06)',
        'editorial-hover': '0 8px 30px -4px rgba(32, 33, 36, 0.08), 0 20px 40px -12px rgba(32, 33, 36, 0.06)',
      },
    },
  },
  plugins: [],
}
