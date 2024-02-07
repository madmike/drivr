/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      maxWidth: {
        '1/2': '50%',
        '2/3': '66.67%',
      },
      boxShadow: {
        'sm': '0 1px 1px 0 rgb(0 0 0 / 0.05);',
      }
    },
  },
  plugins: [],
  mode: 'jit',
}

