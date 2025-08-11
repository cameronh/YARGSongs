import google from 'eslint-config-google';
import reactPlugin from 'eslint-plugin-react';

export default [
  google,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    plugins: {
      react: reactPlugin,
    },
    rules: {
      'max-len': ['error', {code: 120}],
      'require-jsdoc': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];

