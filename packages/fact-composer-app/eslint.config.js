import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {ignores: ["dist"]},
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        {allowConstantExport: true},
      ],
    },
  },
  {
    rules: {
      "object-curly-spacing": "off",
      complexity: ["error", 3],
      "max-params": ["error", 4],
      "max-statements": ["error", 7],
      "max-statements-per-line": [
        "error",
        {
          max: 1,
        },
      ],
      "max-nested-callbacks": ["error", 2],
      "max-depth": [
        "error",
        {
          max: 3,
        },
      ],
      "no-useless-constructor": "off",
      "import/order": "off",
      "require-await": "off",
    },
  },
);
