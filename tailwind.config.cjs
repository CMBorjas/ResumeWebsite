/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#ff0f4d',
          cyan: '#00ffe1'
        }
      }
    },
  },
  // Safelist classes that are only referenced via @apply or generated dynamically
  safelist: [
    'bg-slate-900',
    'bg-slate-800',
    'bg-slate-700',
    'text-slate-100',
    'text-slate-300',
    'text-white',
    'bg-brand-pink',
    'text-brand-cyan'
  ],
  plugins: [],
}
