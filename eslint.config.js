import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReactConfig.rules,
      indent: ["error", 2],
      "prefer-const": "error",
      semi: "error"
    }
  },
  pluginJs.configs.recommended,
  pluginReactConfig
];
