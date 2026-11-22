import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/"] },
  js.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["webpack.*.js"],
    languageOptions: { globals: globals.node, sourceType: "commonjs" },
  },
];