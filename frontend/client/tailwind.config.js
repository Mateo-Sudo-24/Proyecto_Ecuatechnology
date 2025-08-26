/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D4AF37', // Amarillo/Dorado 
        secondary: '#3F51B5', // Azul Marino/Púrpura 
        accent: '#B71C1C', // Rojo 
        neutral: '#1A1A1A', // Negro 
        background: '#FFFFFF', // Blanco
      },
      fontFamily: {
        heading: ['Work Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
  safelist: [
    "text-yellow-600",
    "text-blue-600",
    "text-red-600",
    "bg-yellow-100",
    "bg-blue-100",
    "bg-red-100",
  ],
};
