/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3fb',
          100: '#d7deef',
          200: '#aebde0',
          300: '#7d92ca',
          400: '#4f6cb5',
          500: '#2f4f9c',
          600: '#1f3b7e',
          700: '#152b60',
          800: '#0d1e47',
          900: '#0a1a3d',
          950: '#070f29',
        },
        gold: {
          50: '#fdf9ed',
          100: '#faf0c8',
          200: '#f4df8e',
          300: '#edc857',
          400: '#e6b633',
          500: '#c9a227', // primary royal gold
          600: '#a87f1d',
          700: '#825e1a',
          800: '#5f441b',
          900: '#3e2c14',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f4df8e 0%, #c9a227 45%, #825e1a 100%)',
        'gold-shine': 'linear-gradient(90deg, #c9a227 0%, #f4df8e 25%, #e6b633 50%, #f4df8e 75%, #c9a227 100%)',
        'navy-gradient': 'linear-gradient(135deg, #0a1a3d 0%, #152b60 60%, #0a1a3d 100%)',
        'hero-vignette': 'radial-gradient(ellipse at center, rgba(10,26,61,0.55) 0%, rgba(7,15,41,0.9) 100%)',
      },
      boxShadow: {
        gold: '0 10px 40px -10px rgba(201,162,39,0.45)',
        'gold-soft': '0 4px 20px -4px rgba(201,162,39,0.35)',
        navy: '0 10px 40px -10px rgba(10,26,61,0.55)',
        glass: '0 8px 32px rgba(10,26,61,0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};
