module.exports = {
  root: true,
  extends: ["next", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: false,
        trailingComma: "all",
        printWidth: 110,
        tabWidth: 2,
        bracketSpacing: true,
        arrowParens: "always",
      },
    ],
    "import/no-anonymous-default-export": "off",
    "react/display-name": "off",
    "no-undef": "error",
    "no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
