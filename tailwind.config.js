/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        expandRight: {
          '0%': { opacity: '0', maxWidth: '0' },
          '100%': { opacity: '1', maxWidth: '100%' },
        },
        expandDown: {
          '0%': { opacity: '0', maxHeight: '0' },
          '100%': { opacity: '1', maxHeight: '100%' },
        },
      },
      animation: {
        'slide-right': 'expandRight 2s ease-out forwards',
        'slide-down': 'expandDown 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}