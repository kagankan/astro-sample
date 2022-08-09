module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-recommended-scss', 'stylelint-prettier/recommended'],
  ignoreFiles: ['**/*.js', '**/*.ts'],
  rules: {
    'declaration-property-unit-disallowed-list': [
      {
        'font-size': ['px'],
        'line-height': ['px'],
      },
    ],
    'selector-pseudo-element-colon-notation': 'double',
    'scss/selector-no-union-class-name': true,
  },
};
