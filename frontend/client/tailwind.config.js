/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', 
        secondary: '#3F51B5', 
        accent: '#B71C1C', 
        neutral: '#1A1A1A', 
        background: '#FFFFFF',
      },
      fontFamily: {
        heading: ['Work Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
    safelist: [
    {
      // Esto genera clases de fondo (`bg-`) para todas tus variables de color
      pattern: /bg-\[var\(--(primary|secondary|accent|neutral|background)\)\](\/.*)?/,
      variants: ['hover', 'focus'],
    },
    {
      // Esto genera clases de texto (`text-`) para todas tus variables de color
      pattern: /text-\[var\(--(primary|secondary|accent|neutral|background)\)\](\/.*)?/,
      variants: ['hover', 'focus'],
    },
  ],
  },
  plugins: [],
};
