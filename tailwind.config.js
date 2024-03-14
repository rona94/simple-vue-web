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
      colors: {
        purple: {
          300: "#7077A1",
          400: "#424769",
          700: "#2D3250"
        },
        blue: "#265073",
        aqua: {
          300: "#9AD0C2",
          400: "#2D9596"
        },
        green: {
          300: "#ECF4D6"
        },
        red: "#EB4034"
      },
    },
  },
  plugins: [],
}

