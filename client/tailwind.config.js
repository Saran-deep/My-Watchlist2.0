/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "card-gradient":
          "linear-gradient(0deg, rgb(15,15,15), 50%,transparent)",
      },
      colors: {
        "my-ebonyClay-100": "#0f102b", // Main background
        "my-ebonyClay-200": "#23243c", // For cards
        "my-ebonyClay-300": "#434459", // For Input background and for loaders
        "my-ebonyClay-400": "#0e0f25", // For Next and Prev Buttons
        "my-white-100": "#f1f1f1",
        "my-white-200": "#aaa",
        "my-white-300": "#ffffff",
        // "my-red-100": "rgba(204,0,0,0.9)",
        "my-red-100": "#d93025",
        "placeholder-ash": "#9ca3af",
      },
      boxShadow: {
        suttle: "rgba(41, 40, 52, 0.1) 0px 4px 12px;",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
