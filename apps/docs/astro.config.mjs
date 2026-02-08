import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  integrations: [
    starlight({
      title: 'Typewriting Class',
      description: 'CSS-in-TS. Composable. Compiled. Correct.',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      social: {
        github: 'https://github.com/corysimmons/typewritingclass',
      },
      editLink: {
        baseUrl: 'https://github.com/corysimmons/typewritingclass/edit/main/apps/docs/',
      },
      sidebar: [
        {
          label: 'Getting Started',
          autogenerate: { directory: 'getting-started' },
        },
        {
          label: 'Core Concepts',
          autogenerate: { directory: 'core-concepts' },
        },
        {
          label: 'Theming',
          autogenerate: { directory: 'theming' },
        },
        {
          label: 'Dynamic Values',
          autogenerate: { directory: 'dynamic' },
        },
        {
          label: 'Plugins',
          autogenerate: { directory: 'plugins' },
        },
        {
          label: 'Integrations',
          autogenerate: { directory: 'integrations' },
        },
        {
          label: 'Compiler',
          autogenerate: { directory: 'compiler' },
        },
        {
          label: 'API Reference',
          autogenerate: { directory: 'api-reference' },
        },
      ],
    }),
  ],
})
