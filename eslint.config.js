import { defineConfig } from 'eslint/config'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import babelParser from '@babel/eslint-parser'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    ignores: ['node_modules', 'dist', 'build', '.output', 'coverage', '.vercel', '.netlify'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        requireConfigFile: false,
        parser: babelParser,
      },
    },
    plugins: {
      js,
      vue: pluginVue,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...pluginVue.configs['flat/essential'].rules,
      'prettier/prettier': 'warn',
    },
  },
])
