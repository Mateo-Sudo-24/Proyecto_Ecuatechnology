/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores principales basados en variables CSS originales
        primary: {
          DEFAULT: '#B8860B',
          dark: '#8B6914',
          light: '#DAA520',
        },
        secondary: {
          DEFAULT: '#3B5998',
          dark: '#2D4373',
          light: '#5A7BC8',
        },
        accent: {
          DEFAULT: '#DC3545',
          dark: '#C82333',
          light: '#E4606D',
        },
        neutral: {
          DEFAULT: '#333333',
          50: '#F8F9FA',
          100: '#E5E7EB',
          200: '#CCCCCC',
          400: '#999999',
          600: '#666666',
          800: '#1A1A1A',
        },
        // Colores de fondo
        background: '#FFFFFF',
        'peach-light': '#FFF5E6',
        darkbackground: '#FFFFFF',
        // Colores de estado
        success: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
          dark: '#065F46',
        },
        warning: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#92400E',
        },
        error: {
          DEFAULT: '#EF4444',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
        info: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
          dark: '#1E40AF',
        },
      },
      fontFamily: {
        'heading': ['Work Sans', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'md': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
}