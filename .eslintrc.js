module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: [
    'prettier',
    'prettier/vue',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  plugins: ['prettier'],
  rules: {
  }
}
