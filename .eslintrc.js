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
        printWidth: 80,
        tabWidth: 2,
        bracketSpacing: true,
        arrowParens: "always",
      },
    ],
    "import/no-anonymous-default-export": "off",
    "react/display-name": "off",
  },
};
