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
      mask: {
        "half-circle": "linear-gradient(to right, black 50%, transparent 50%)",
      },
      content: {
        link: "url(/src/assets/horizontal_edge_logo.png)",
        link2: "url(/src/assets/spark_fragment_logo.png)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
