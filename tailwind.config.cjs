const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,astro}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', "Noto Sans KR", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#4c863c",
          secondary: "#4c863c",
          "base-content": "#24292e",
          "primary-content": "#24292e",
          "--header-border-bottom": "inset 0 -1px 0 0 rgba(0,0,0,.1)",
        },
      },
      {
        dark: {
          primary: "#6ab357",
          secondary: "#6ab357",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#1B1F23",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          "base-content": "#d5dce4",
          "primary-content": "#222831",
          "--header-border-bottom": "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
        },
      },
    ],
  },
};
