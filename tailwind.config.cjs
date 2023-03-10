const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,astro}"],
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
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
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#444494",
          "--header-border-bottom": "inset 0 -1px 0 0 rgba(0,0,0,.1)",
        },
      },
      {
        dark: {
          primary: "#cbc3e3",
          secondary: "#f39eff",
          accent: "#1FB2A5",
          neutral: "#191D24",
          "base-100": "#222831",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
          // "base-content": "#cbd4d9",
          "primary-content": "#222831",
          "--header-border-bottom": "inset 0 -1px 0 0 hsla(0,0%,100%,.1)",
        },
      },
    ],
  },
};
