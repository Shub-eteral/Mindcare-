/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // A deliberately non-default calm palette (deep sage, not the
        // generic AI-cream-and-terracotta look) - see docs/ARCHITECTURE.md
        calm: {
          50: '#F6F5F1',
          100: '#E6EDEA',
          200: '#C7D9D2',
          300: '#A3C0B5',
          400: '#7EA395',
          500: '#4A6B5E',
          600: '#3D564C',
          700: '#33453E',
          800: '#2C3A34',
          900: '#1F2925',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
