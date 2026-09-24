/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fit: {
          bg: '#0e0f12',
          card: '#16181d',
          accent: '#ccff00',
          border: '#232730',
          muted: '#8b94a5',
        },
      },
    },
  },
  plugins: [],
}
