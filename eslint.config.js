import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react'; // ✅ Added react plugin
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react': react, // ✅ Added react plugin
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // ✅ Apply recommended React rules
      ...reactHooks.configs.recommended.rules,

      // ✅ Fix "no-unused-vars" issue with JSX components
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',

      // ✅ Throw an error if a variable is declared but not used
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],

      // ✅ Disable "React must be in scope" error for React 17+
      'react/react-in-jsx-scope': 'off',

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
       // ❌ Disable prop validation
       'react/prop-types': 'off',
    },
  },
];