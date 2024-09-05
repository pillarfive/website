import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    ignores: ['dist/*', 'src/accessibility/bad-test-card.html'],
  },
  pluginJs.configs.recommended,
]
