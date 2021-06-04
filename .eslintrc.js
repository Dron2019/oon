module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  parser: 'babel-eslint',
  plugins: ['jest', 'react'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 0,
    camelcase: [2, { properties: 'never' }],
    'no-unused-vars': 'off',
  },
};
