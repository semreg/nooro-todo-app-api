import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'
import prettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: { globals: globals.node },
    plugins: {
      prettier,
      unicorn,
    },
    rules: {
      ...unicorn.configs.recommended.rules, // Unicorn's recommended rules
      semi: 'off',
      'prettier/prettier': 'warn', // Prettier as a linting rule
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-top-level-await': 'off',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
