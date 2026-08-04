import type { Config } from "tailwindcss";

/**
 * Broadsheet tokens. Every color, type size and radius the design uses lives here —
 * components only ever reference these names, never raw hex values.
 */
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        paper2: "var(--paper-2)",
        ink: "var(--ink)",
        ink2: "var(--ink-2)",
        ink3: "var(--ink-3)",
        rule: "var(--rule)",
        hairline: "var(--hairline)",
        spot: "var(--spot)",
        spot2: "var(--spot-2)",
      },
      fontFamily: {
        serif: ['"Source Serif 4"', "ui-serif", "Georgia", "serif"],
      },
      borderRadius: { sm: "1px", DEFAULT: "2px", lg: "4px" },
      letterSpacing: { kicker: "0.18em", nav: "0.06em", label: "0.16em" },
      maxWidth: { measure: "34em", dek: "30em" },
    },
  },
  plugins: [],
};
export default config;
