import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      'packages/typewritingclass',
      'packages/typewritingclass-react',
      'packages/typewritingclass-compiler',
      'packages/typewritingclass-next',
      'packages/typewritingclass-devtools',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'json-summary'],
      reportsDirectory: './coverage',
      include: [
        'packages/*/src/**/*.{ts,tsx}',
      ],
      exclude: [
        'packages/*/src/**/*.d.ts',
        'packages/*/src/**/index.ts',
        'packages/typewritingclass/src/types.ts',
        'packages/typewritingclass-devtools/src/extension.ts',
        'packages/typewritingclass-compiler/src/index.ts',
        'packages/typewritingclass-babel/src/**',
        'packages/typewritingclass-esbuild/src/**',
      ],
    },
  },
})
