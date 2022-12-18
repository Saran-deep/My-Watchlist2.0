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
        "my-black-100": "#0f0f0f",
        "my-black-200": "#242331",
        "my-black-300": "#292834",
        "my-white-100": "#f1f1f1",
        "my-white-200": "#aaa",
        "my-white-300": "#ffffff",
        "my-red-100": "rgba(204,0,0,0.9)",
      },
    },
  },
  plugins: [],
};
