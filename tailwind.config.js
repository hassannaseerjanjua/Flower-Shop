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
          50: '#FDFBF7',
          100: '#FAF8F5',
          200: '#F5EFEB',
          300: '#EDE4DB',
          400: '#E0D2C3',
        },
        botanical: {
          DEFAULT: '#1A2F23',
          dark: '#0E1B12',
          deep: '#112217',
          light: '#2D4837',
          sage: '#4A6B56',
          muted: '#688775',
        },
        gold: {
          light: '#F4E8C1',
          DEFAULT: '#C5A059',
          metallic: '#D4AF37',
          dark: '#9A7836',
        },
        champagne: '#F9F6EE',
        beige: {
          DEFAULT: '#EFEBE4',
          subtle: '#F4F0E8',
          warm: '#E5DDD0',
        },
        terracotta: '#C87D65',
        petal: '#F7ECE9',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Cormorant Garamond', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(26, 47, 35, 0.08)',
        'luxury-hover': '0 30px 60px -15px rgba(26, 47, 35, 0.15)',
        'soft-glow': '0 0 50px rgba(197, 160, 89, 0.2)',
      },
      animation: {
        'drift-slow': 'drift 35s linear infinite',
        'drift-medium': 'drift 25s linear infinite',
        'drift-fast': 'drift 18s linear infinite',
        'float-gentle': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(10%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
