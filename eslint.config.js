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
      // JS, Vue 권장 규칙 적용
      ...js.configs.recommended.rules,
      ...pluginVue.configs['flat/essential'].rules,

      // prettier 포맷 규칙과 충돌 방지
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          useTabs: false,
          endOfLine: 'auto',
        },
      ],
    },
  },
])
