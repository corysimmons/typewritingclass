import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  shims: true,
  clean: true,
  external: ['@babel/core', '@babel/parser', 'typewritingclass-compiler', 'typewritingclass-compiler/loadTheme'],
})
