/** @type {import('tailwindcss').Config} */
// tailwind.config.js

// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'sakura-fall': {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        'sakura-fall': 'sakura-fall linear infinite',
      },
    },
  },
  plugins: [],
};
