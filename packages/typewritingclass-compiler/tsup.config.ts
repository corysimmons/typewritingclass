import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    loadTheme: 'src/loadTheme.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  shims: true,
  clean: true,
  external: ['typewritingclass'],
})
