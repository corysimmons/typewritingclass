import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightDocSearchTypesense from 'starlight-docsearch-typesense'

export default defineConfig({
  integrations: [
    starlight({
      plugins: [
        starlightDocSearchTypesense({
          typesenseCollectionName: 'typewritingclass-docs',
          typesenseServerConfig: {
            nodes: [{ url: 'https://96vke4hzilsp2nw3p-1.a2.typesense.net' }],
            apiKey: 'OON0dh7gaz6eN9VLPDqBTHWByesdSacY',
          },
        }),
      ],
      title: 'Typewriting Class',
      description: 'CSS-in-TS. Composable. Compiled. Correct.',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      favicon: '/favicon.svg',
      customCss: ['./src/styles/themes.css'],
      components: {
        ThemeSelect: './src/components/ThemeSelect.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/corysimmons/typewritingclass' },
      ],
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
