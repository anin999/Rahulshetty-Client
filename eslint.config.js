// @ts-check

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const globals = require("globals");
const playwright = require("eslint-plugin-playwright");

module.exports = tseslint.config(

  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "out/**",
      "playwright-report/**",
      "test-results/**"
    ]
  },

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^err$"
        }
      ],

      "no-empty": "warn"
    }
  },

  {
    files: [
      "tests/**",
      "tests-examples/**",
      "**/*.spec.ts"
    ],
    extends: [playwright.configs["flat/recommended"]],

    rules: {
      "playwright/no-wait-for-timeout": "off",
      "playwright/no-conditional-in-test": "off",
      "playwright/no-useless-await": "off"
    }
  }

);