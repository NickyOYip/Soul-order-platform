/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink': {
          '50': '#fdf2f8',
          '100': '#fce7f3',
          '200': '#fbcfe8',
          '300': '#f9a8d4',
          '400': '#f472b6',
          '500': '#ec4899',
          '600': '#db2777',
          '700': '#be185d',
          '800': '#9d174d',
          '900': '#831843',
          'primary': '#ff5c8d',
          'light': '#ff8ab5',
          'dark': '#d44070',
        },
        'background': '#ffeef3',
      },
      fontFamily: {
        'sans': ['Noto Sans TC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}