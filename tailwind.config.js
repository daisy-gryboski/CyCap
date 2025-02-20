/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        text: 'rgb(var(--text))',
        card: 'rgb(var(--card))',
        'card-hover': 'rgb(var(--card-hover))',
        border: 'rgb(var(--border))',
        mint: {
          500: '#95E1D3',
        },
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
};