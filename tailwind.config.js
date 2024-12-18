/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expandRight: {
          '0%': { opacity: '0', maxWidth: '0', maxHeight: 'none' },
          '100%': { opacity: '1', maxWidth: '100%', maxHeight: 'none' },
        },
        expandDown: {
          '0%': { opacity: '0', maxHeight: '0', maxWidth: 'none' },
          '100%': { opacity: '1', maxHeight: '100%', maxWidth: 'none' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1', display: "flex" },
          '100%': { opacity: '0', display: "flex" },
        },
      },
      animation: {
        'slide-right': 'expandRight 2s ease-out forwards',
        'slide-down': 'expandDown 2s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'loaded': 'fadeOut 1s ease-in 3s forwards',
      },
    },
  },
  plugins: [],
}