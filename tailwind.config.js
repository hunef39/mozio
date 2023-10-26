/* eslint-disable no-undef */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(
      function ({ addComponents, theme }) {
        addComponents({
          "@keyframes loading": theme("keyframes.loading"),
          ".loader": {
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            display: "block",
            margin: "15px auto",
            position: "relative",
            color: "#FFF",
            boxSizing: "border-box",
            animation: "loading 1s linear infinite alternate",
          },
        });
      },
      {
        theme: {
          extend: {
            keyframes: {
              loading: {
                "0%": {
                  boxShadow: "-38px -6px, -14px 6px,  14px -6px",
                },
                "33%": {
                  boxShadow: "-38px 6px, -14px -6px,  14px 6px",
                },
                "66%": {
                  boxShadow: "-38px -6px, -14px 6px, 14px -6px",
                },
                "100%": {
                  boxShadow: "-38px 6px, -14px -6px, 14px 6px",
                },
              },
            },
          },
        },
      }
    ),
    require("tailwindcss-animate"),
  ],
};
