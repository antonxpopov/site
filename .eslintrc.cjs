/**
 * ESLint конфигурация для проекта
 * Включает правила для React, TypeScript и Astro
 */

module.exports = {
  root: true,
  ignorePatterns: ['dist/', '.astro/', 'node_modules/', 'coverage/', 'src/env.d.ts'],
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    // React
    'react/react-in-jsx-scope': 'off', // Не нужен в React 17+
    'react/prop-types': 'off', // Используем TypeScript для типизации
    'react/display-name': 'off',
    
    // TypeScript
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Общие
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      // Astro templates use HTML attributes (class, stroke-width) and need no keys in .map()
      rules: {
        'react/no-unknown-property': 'off',
        'react/jsx-key': 'off',
      },
    },
  ],
};



