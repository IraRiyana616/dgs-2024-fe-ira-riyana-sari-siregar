/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        'custom-450': '450px',
        'custom-110': '110px',
        'custom-40': '40px',
      },
      width: {
        'custom-110': '110px',
        'custom-250': '280px',
        'custom-80': '50px',
      },
      fontSize: {
        custom24: '23px',
        custom16: '14px',
      },
      colors: {
        'color-sidebar': '#EEEEF5',
        'color-main': '#A4AFC3',
      },
    },
  },
  plugins: [],
};
