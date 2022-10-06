module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', '@tinkoff/eslint-config/app'],
  rules: {
    "no-control-regex": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-this-alias": 0,
    "no-empty": 0,
    "@typescript-eslint/ban-types": 0,
    "no-prototype-builtins": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/naming-convention": 0,
    "no-param-reassign": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "prefer-promise-reject-errors": 0
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
};