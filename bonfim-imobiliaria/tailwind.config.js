/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#403F3F',
        'deep-yellow': '#BF9A2C',
        'deep-yellow-accent': '#F2AE2E',
        yellow: '#F2C12E',
        'yellow-accent': '#FECF27',
        'yellow-logo': '#FECF27',
        'white-accent': '#F8F8F8',
        primary: {
          DEFAULT: '#403F3F',
          dark: '#2a2a2a',
          light: '#f5f5f5',
        },
        secondary: {
          DEFAULT: '#F2C12E',
          dark: '#BF9A2C',
          accent: '#FECF27',
        },
        accent: {
          DEFAULT: '#FECF27',
        },
        text: {
          dark: '#403F3F',
          light: '#666',
        },
        background: '#ffffff',
        card: '#ffffff',
        header: '#403F3F',
        footer: '#403F3F',
        border: '#e9ecef',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
