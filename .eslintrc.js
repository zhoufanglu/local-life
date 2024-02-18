module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "plugin:prettier/recommended",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "no-extra-semi": "error",
    "prettier/prettier": "error",
    "vue/custom-event-name-casing": "off",
    "no-use-before-define": "off",
    "space-before-function-paren": "off",
    "vue/multi-word-component-names": "off",
    "vue/component-definition-name-casing": "off",
    "vue/require-valid-default-prop": "off",
    "no-console": "off",
    "vue/no-setup-props-destructure": "off",
  },
};
