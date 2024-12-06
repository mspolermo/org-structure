module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    '@typescript-eslint',
    'react-refresh',
    'react-hooks',
    'unused-imports',
    'import',
    'import-newlines'
  ],
  rules: {
    'react/jsx-indent': [2,4],
    'react/jsx-indent-props': [2,4],
    indent: [2,4],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    // 'unused-imports/no-unused-imports': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.tsx'],
  }],
  'import/no-unresolved': 'off',
  'import/prefer-default-export': 'off',
  // 'no-unused-vars': 'warn',
  'react/require-default-props': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/function-component-definition': 'off',
  'no-shadow': 'off',
  'import/extensions': 'off',
  'import/no-extraneous-dependencies': 'off',
  'no-underscore-dangle': 'off',
  'max-len': ['error', {
      ignoreComments: true,
      code: 130,
  }],
  'jsx-a11y/no-static-element-interactions': 'off',
  'jsx-a11y/click-events-have-key-events': 'off',
  'no-param-reassign': 'off',
  'no-undef': 'off',
  'react/no-array-index-key': 'off',
  'arrow-body-style': 'off',
  'react/jsx-first-prop-new-line': [2, 'multiline'],
  'react/jsx-max-props-per-line': [2, { maximum: 1, when: 'multiline' }],
  'react/jsx-closing-bracket-location': [2, 'tag-aligned'],
  'react/no-unstable-nested-components': 'off',
  'import-newlines/enforce': ["error", 4, 120],
  'import/order': [
    "error",
    {
      "groups": ["builtin", "external", "internal"],
      "pathGroups": [
        {
          "pattern": "@/**",
          "group": "internal",
          "position": "after"
        }
      ],
      "pathGroupsExcludedImportTypes": ["@/**"],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }
  ]
  },
  globals: {
    __API_ORGUNIT__: true,
    __API_NAV__: true,
    __API_PERSON_DETAILS__: true,
    __API_PERSON__: true,
    __API_PERSON_WITH_DETALES_UPDATE__: true,
    __API_ORGUNIT_UPDATE__: true,
    __API_PERSON_SEARCH__: true,
    __API_LOGIN__: true,
  },
}
