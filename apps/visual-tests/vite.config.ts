import { defineConfig } from 'vite'
import { resolve } from 'path'
import twcPlugin from 'typewritingclass-compiler'

export default defineConfig({
  plugins: [twcPlugin({ strict: false })],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'spacing-twc': resolve(__dirname, 'tests/fixtures/spacing-twc.html'),
        'spacing-ref': resolve(__dirname, 'tests/fixtures/spacing-ref.html'),
        'colors-twc': resolve(__dirname, 'tests/fixtures/colors-twc.html'),
        'colors-ref': resolve(__dirname, 'tests/fixtures/colors-ref.html'),
        'typography-twc': resolve(__dirname, 'tests/fixtures/typography-twc.html'),
        'typography-ref': resolve(__dirname, 'tests/fixtures/typography-ref.html'),
        'layout-twc': resolve(__dirname, 'tests/fixtures/layout-twc.html'),
        'layout-ref': resolve(__dirname, 'tests/fixtures/layout-ref.html'),
        'borders-twc': resolve(__dirname, 'tests/fixtures/borders-twc.html'),
        'borders-ref': resolve(__dirname, 'tests/fixtures/borders-ref.html'),
        'composition-twc': resolve(__dirname, 'tests/fixtures/composition-twc.html'),
        'composition-ref': resolve(__dirname, 'tests/fixtures/composition-ref.html'),
        'dynamic-twc': resolve(__dirname, 'tests/fixtures/dynamic-twc.html'),
        'dynamic-ref': resolve(__dirname, 'tests/fixtures/dynamic-ref.html'),
        'theme-switch-twc': resolve(__dirname, 'tests/fixtures/theme-switch-twc.html'),
        'theme-switch-ref': resolve(__dirname, 'tests/fixtures/theme-switch-ref.html'),
      },
    },
  },
})
