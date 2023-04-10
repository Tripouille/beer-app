module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
    ignorePatterns: ["*.js"],
    extends: [
      "eslint:recommended",
      "airbnb-typescript",
      "next/core-web-vitals",
      "plugin:@typescript-eslint/strict",
      "prettier",
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@next/next/no-html-link-for-pages": "off",
      "@typescript-eslint/no-use-before-define": "off",
    },
  };
  