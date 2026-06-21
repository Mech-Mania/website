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
      colors: {
        "m-accent":"var(--m-accent)",
        "m-accent-dark":"var(--m-accent-dark)",
        "m-accent-light":"var(--m-accent-light)",
        "m-black":"var(--m-black)",
        "m-gray-6":"var(--m-gray-6)",
        "m-gray-5":"var(--m-gray-5)",
        "m-gray-4":"var(--m-gray-4)",
        "m-gray-3":"var(--m-gray-3)",
        "m-gray-2":"var(--m-gray-2)",
        "m-gray-1":"var(--m-gray-1)",
        "m-white":"var(--m-white)"
      }
    },
  },
  plugins: [],
}
