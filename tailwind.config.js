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
        "name-skeleton": 'name-shine 1.2s linear infinite',
      },
      colors: {
        'power-level': '#ffda88',
      },
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      keyframes: {
        "name-shine": {
          '0%': { 'background-position': '-200px' },
          '60%, 100%': { 'background-position': '200px' },
        },
      },
    },
  },
  plugins: [],
};
