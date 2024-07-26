/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      gridTemplateColumns: {
        '70/30': '70% 28%'
      },
      animation: {
        fadeInSlide: 'fadeInSlide 1s ease-in-out',
        fadeOutSlide: 'fadeOutSlide 1s ease-in-out',
        fadeInMenu: 'fadeInMenu 0.5s ease-in-out',
        fadeOutMenu: 'fadeOutMenu 0.5s ease-in-out',
      },
      keyframes: {
        fadeInSlide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeOutSlide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeInMenu: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeOutMenu: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}