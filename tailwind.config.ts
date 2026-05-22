import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hellcore: {
          bg: "#EDE5CE",       // creme — cor do fundo da logo
          surface: "#F5EDD8",  // creme claro — cards
          border: "#C9BFA8",   // borda warm
          text: "#111109",     // tinta preta
          red: "#7A2215",      // vermelho enferrujado da logo
        },
      },
    },
  },
  plugins: [],
};
export default config;
