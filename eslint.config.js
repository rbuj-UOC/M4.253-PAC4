import globals from 'globals';
import js from '@eslint/js';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  { languageOptions: { jest: true } },
  js.configs.recommended,
  pluginReactConfig,
  {
    rules: {
      indent: ['error', 2],
      'prefer-const': 'error',
      semi: 'error'
    }
  }
];
