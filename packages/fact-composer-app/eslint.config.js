const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../eslint.config.js");
const {reactStyleGuide} = require("@repo/eslint");

module.exports = [
  ...baseConfig,
  ...nx.configs["flat/react"],
  ...reactStyleGuide,
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    ignores: [
      "**/dist",
      "**/node_modules",
      "**/coverage",
      "**/playwright-report",
      "**/test-results",
    ],
    // Override or add rules here
    rules: {},
  },
];
