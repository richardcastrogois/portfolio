/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
    },
    textShadow: {
      neonGreen: '0 0 5px ##e0ffe0, 0 0 10px #e0ffe0, 0 0 20px #e0ffe0, 0 0 40px #e0ffe0',
    },
    animation: {
      pulseNeon: 'pulseNeon 1.5s ease-in-out infinite',
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('/images/hero-bg.png')",
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      boxShadow: {
        button: '0px 0px 68px 7px rgba(5, 150, 105, 0.4)',
      },
    },
    keyframes: {
      pulseNeon: {
        '0%, 100%': {
          textShadow: '0 0 5px rgba(224, 255, 224, 0.2), 0 0 10px rgba(224, 255, 224, 0.2), 0 0 20px rgba(224, 255, 224, 0.2), 0 0 40px rgba(224, 255, 224, 0.2)',
        },
        '50%': {
          textShadow: '0 0 10px rgba(224, 255, 224, 0.2), 0 0 20px rgba(224, 255, 224, 0.2), 0 0 30px rgba(224, 255, 224, 0.2), 0 0 50px rgba(224, 255, 224, 0.2)',
        },
      },
    },
  },
  plugins: [],
}
