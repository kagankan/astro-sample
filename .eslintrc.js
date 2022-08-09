module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['!**/*.js'],
  plugins: ['import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'import/order': [
      'error',
      {
        'alphabetize': { order: 'asc', caseInsensitive: true },
        'newlines-between': 'never',
        'pathGroups': [{ pattern: '@/**', group: 'parent', position: 'before' }],
      },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  overrides: [
    {
      files: ['*.astro'],
      rules: {
        'prettier/prettier': 'off',
        'quotes': ['warn', 'single'],
      },
    },
  ],
};
