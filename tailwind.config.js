/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'blog': 'repeat(auto-fill, minmax(20.3125rem, 1fr))',
      },
      maxWidth: { '25rem': '25rem' }
    },
  },
  plugins: [],
}

