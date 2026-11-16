export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        beige: '#EFE7DA',
        sand: '#DCCFB9',
        gold: { DEFAULT: '#C6A664', dark: '#A5883F', light: '#E6D5AC' },
        charcoal: '#2B2A28',
        espresso: '#3A2A20',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { luxe: '0.22em' },
    },
  },
  plugins: [],
};
