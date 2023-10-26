/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'name-skeleton': 'name-shine 1.2s linear infinite',
        'power-skeleton': 'power-shine 1.2s linear infinite',
        'fade-in-one': 'fade-in-one 3s linear infinite',
        'fade-in-two': 'fade-in-two 3s linear infinite',
        'fade-in-three': 'fade-in-three 3s linear infinite',
        'modal-bg-fade': 'modal-bg-fade .1s linear',
        'modal-appear': 'modal-appear .2s ease-out',
      },
      colors: {
        'power-level': '#ffda88',
        'legendary-purple': '#522f65',
      },
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      keyframes: {
        'name-shine': {
          '0%': { 'background-position': '-200px' },
          '45%, 100%': { 'background-position': '200px' },
        },
        'power-shine': {
          '0%': { 'background-position': '-260px' },
          '45%, 100%': { 'background-position': '100px' },
        },
        'fade-in-one': {
          '0%, 100%': { opacity: '0' },
          '33%, 90%': { opacity: '1' },
        },
        'fade-in-two': {
          '0%, 30%, 100%': { opacity: '0' },
          '60%, 90%': { opacity: '1' },
        },
        'fade-in-three': {
          '0%, 60%, 100%': { opacity: '0' },
          '90%': { opacity: '1' },
        },
        'modal-bg-fade': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'modal-appear': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
