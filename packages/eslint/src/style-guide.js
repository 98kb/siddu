import tseslint from "typescript-eslint";
import {flatConfigs as importEslint} from "eslint-plugin-import";
import jsxA11yEslint from "eslint-plugin-jsx-a11y";
import promiseEslint from "eslint-plugin-promise";
import reactEslint from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import stylistic from "@stylistic/eslint-plugin";
import nodePlugin from "eslint-plugin-n";

/**
 * @type {import("typescript-eslint").ConfigWithExtends}
 */
export const styleGuide = {
  extends: [
    ...tseslint.configs.recommended,
    importEslint.errors,
    jsxA11yEslint.flatConfigs.recommended,
    promiseEslint.configs["flat/recommended"],
    reactEslint.configs.flat.recommended,
  ],
  files: ["**/*.{ts,tsx}"],
  name: "style-guide",
  plugins: {
    "react-hooks": reactHooks,
    "@stylistic": stylistic,
    n: nodePlugin,
  },
  rules: {
    "@stylistic/indent": "warn",
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
    " no-new-native-nonconstructor": "error",
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
    "no-unused-expressions": "error",
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
    "no-else-return": "warn",
    "no-lonely-if": "error",
    "no-multi-assign": "warn",
    "no-object-constructor": "warn",
    "no-underscore-dangle": "warn",
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

    // react
    // override recomended
    "react/no-unsafe": "error",
    "react/prop-types": "off", // turn off prop types validation, better use ts ;)

    // not in recomended
    "react/button-has-type": "error",
    "react/jsx-no-script-url": "error",
    "react/jsx-boolean-value": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-fragments": "error",
    "react/jsx-curly-spacing": ["error", {when: "never", allowMultiline: true}],
    "react/jsx-curly-brace-presence": [
      "error",
      {props: "never", children: "ignore"},
    ],
    "react/no-access-state-in-setstate": "error",
    "react/no-this-in-sfc": "error",
    "react/no-typos": "error",
    "react/no-unused-state": "error",
    "react/no-redundant-should-component-update": "error",
    "react/no-will-update-set-state": "error",
    "react/no-adjacent-inline-elements": "error",
    "react/no-unused-prop-types": "error",
    "react/self-closing-comp": "error",
    "react/sort-comp": [
      "error",
      {
        order: [
          "type-annotations",
          "instance-variables",
          "static-methods",
          "lifecycle",
          "everything-else",
          "rendering",
        ],
        groups: {rendering: ["/^render.+$/", "render"]},
      },
    ],
    "react/sort-default-props": "error",
    "react/style-prop-object": "error",
    "react/void-dom-elements-no-children": "error",
    "react/hook-use-state": "error",
    "react/no-arrow-function-lifecycle": "error",
    "react/no-namespace": "error",

    // turn all remaining rules to "error" eventually
    "react/jsx-no-useless-fragment": ["warn", {allowExpressions: true}],
    "react/no-danger": "warn",
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "function-expression",
      },
    ],

    // could be activated at some point, but too many issues currently
    "react/jsx-handler-names": "off",
    "react/jsx-no-leaked-render": "off", // too many false positives right now

    // react hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

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
};
