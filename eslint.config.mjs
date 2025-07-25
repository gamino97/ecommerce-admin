import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}']},
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-tabs': ['error'],
      '@stylistic/max-len': ['error', { 'code': 80, 'ignoreStrings': true, 'tabWidth': 2 }],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/no-multi-spaces': ['error'],
      '@stylistic/curly-newline': ['error', { 'consistent': true }]
    }
  }
];

export default eslintConfig;
