const tseslint = require("typescript-eslint");
const importEslint = require("eslint-plugin-import").flatConfigs;
const jsxA11yEslint = require("eslint-plugin-jsx-a11y");
const promiseEslint = require("eslint-plugin-promise");
const stylistic = require("@stylistic/eslint-plugin");
const nodePlugin = require("eslint-plugin-n");

module.exports = tseslint.config({
  extends: [
    // ...tseslint.configs.recommended,
    // importEslint.errors,
    // jsxA11yEslint.flatConfigs.recommended,
    promiseEslint.configs["flat/recommended"],
  ],
  files: ["**/*.{ts,tsx}"],
  name: "style-guide",
  plugins: {
    "@stylistic/js": stylistic,
    n: nodePlugin,
  },
  rules: {
    "@typescript-eslint/no-empty-function": "error",
    "@stylistic/js/indent": "off",
    "block-scoped-var": "error",
    curly: "error",
    eqeqeq: ["error", "smart"],
    "guard-for-in": "error",
    "n/handle-callback-err": "error",
    "no-alert": "error",
    "no-await-in-loop": "error",
    "no-caller": "error",
    "no-console": "error",
    "no-constructor-return": "error",
    "no-continue": "error",
    "no-div-regex": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "@stylistic/js/no-floating-decimal": "error",
    "no-implied-eval": "error",
    "no-iterator": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-loop-func": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-new-native-nonconstructor": "error",
    "no-promise-executor-return": "error",
    "no-proto": "error",
    "no-restricted-properties": "error",
    "no-return-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-unmodified-loop-condition": "error",
    "no-unsafe-optional-chaining": "error",
    // "no-unused-expressions": "error",
    "no-useless-call": "error",
    "no-useless-concat": "error",
    "no-useless-return": "error",
    "no-void": "error",
    radix: "error",
    "require-atomic-updates": "error",
    "@stylistic/js/wrap-iife": "error",
    yoda: "error",

    // stylistic
    camelcase: "warn",
    "consistent-this": ["warn", "that"],
    "func-name-matching": "error",
    "func-style": ["error", "declaration", {allowArrowFunctions: true}],
    "@stylistic/js/lines-between-class-members": [
      "error",
      "always",
      {exceptAfterSingleLine: true},
    ],
    "no-else-return": "off",
    "no-lonely-if": "error",
    "no-multi-assign": "warn",
    "no-object-constructor": "warn",
    "no-underscore-dangle": "off",
    "no-unneeded-ternary": "warn",
    "one-var": ["warn", "never"],
    "operator-assignment": "warn",
    "@stylistic/js/padding-line-between-statements": [
      "error",
      {blankLine: "always", prev: "*", next: ["class", "function"]},
      {blankLine: "always", prev: ["class", "function"], next: "*"},
    ],

    // es2015
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-useless-rename": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-destructuring": ["warn", {object: true, array: false}],
    "prefer-numeric-literals": "warn",

    // override @typescript-eslint/eslint-recommended
    "no-unused-vars": "off",
    "no-array-constructor": "off",
    "@stylistic/js/no-extra-semi": "off",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",

    // @typescript-eslint

    // import
    "import/extensions": ["error", "never", {json: "always", md: "always"}],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-absolute-path": "error",
    "import/no-amd": "error",
    "import/no-deprecated": "error",
    "import/no-duplicates": "error",
    "import/no-dynamic-require": "error",
    "import/no-extraneous-dependencies": "error",
    "import/no-mutable-exports": "error",
    "import/no-named-as-default": "error",
    "import/no-named-as-default-member": "error",
    "import/no-named-default": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-useless-path-segments": ["error", {noUselessIndex: true}],

    // does not properly work with ts
    "import/no-unresolved": "off",

    // disabled because it's way too slow
    /* "import/no-unused-modules": [
      "error",
      { missingExports: false, unusedExports: true }
    ], */

    // jsx-a11y
    // error in recomended
    "jsx-a11y/anchor-has-content": "warn",
    "jsx-a11y/label-has-associated-control": "warn",
    "jsx-a11y/no-noninteractive-tabindex": "warn",
    "jsx-a11y/no-redundant-roles": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/accessible-emoji": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-autofocus": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/label-has-for": "off", // has FPs

    // not in recomended
    "jsx-a11y/control-has-associated-label": "warn",

    // promise
    "promise/catch-or-return": ["warn", {allowThen: true}],
    "promise/no-return-wrap": ["error", {allowReject: true}],
    "promise/always-return": "off",
    "promise/avoid-new": "off",
    "object-curly-spacing": "off",
    complexity: ["error", 3],
    "max-params": ["error", 4],
    "max-statements": ["error", 7],
    "@stylistic/js/max-statements-per-line": [
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

  settings: {
    "import/ignore": ["node_modules"],
  },
});
