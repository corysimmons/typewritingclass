import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    plugin: 'src/plugin.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  shims: true,
  clean: true,
  external: [
    'react',
    'next',
    'typewritingclass',
    'typewritingclass-react',
    'typewritingclass-babel',
  ],
})
