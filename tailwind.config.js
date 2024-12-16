/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        wrapper: "#F6EEE0",
      },
      boxShadow: {
        "3xl": "8px 0px 20px 4px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
