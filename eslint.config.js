module.exports = [
  {
    ignores: ["node_modules/**", "coverage/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        alert: "readonly",
        document: "readonly",
        QRCode: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
  },
];
