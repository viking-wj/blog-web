module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    // 自定义规则
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'camelcase': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'object-curly-spacing': ['error', 'always']
  }
}
