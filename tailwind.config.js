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
        skeleton: 'shine 1.5s linear infinite',
      },
      colors: {
        'power-level': '#ffda88',
      },
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '-400px' },
          '60%, 100%': { 'background-position': '600px' },
        },
      },
    },
  },
  plugins: [],
};
