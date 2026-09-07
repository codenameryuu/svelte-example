/** @type {import("prettier").Config} */
const config = {
  bracketSameLine: true,
  printWidth: 160,
  singleQuote: false,
  semi: true,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: ["prettier-plugin-svelte"],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};

export default config;
