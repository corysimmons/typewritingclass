import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'theme/colors': 'src/theme/colors.ts',
    'theme/typography': 'src/theme/typography.ts',
    'theme/sizes': 'src/theme/sizes.ts',
    'theme/shadows': 'src/theme/shadows.ts',
    'theme/borders': 'src/theme/borders.ts',
    'theme/createTheme': 'src/theme/createTheme.ts',
    'theme/animations': 'src/theme/animations.ts',
    'theme/filters': 'src/theme/filters.ts',
    'theme/index': 'src/theme/index.ts',
    inject: 'src/inject.ts',
    runtime: 'src/runtime.ts',
    rule: 'src/rule.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  clean: true,
})
