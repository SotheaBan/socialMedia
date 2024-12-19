// tailwind.config.mjs (if using ES module style)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '600px',
      'md': '900px',
      'lg': '1200px',
    },
  },
  plugins: [],
};
