module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,astro}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["cupcake", "halloween"],
  },
};
