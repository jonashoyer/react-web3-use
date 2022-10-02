module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ['.eslintrc.cjs'],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
  }
}
