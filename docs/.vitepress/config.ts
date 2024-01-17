import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "NuxtOrama",
  description: "Orama Search Module for Nuxt3",
  head: [
    ['link', { rel: 'icon', href: '/nuxt-orama-logo.svg' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/getting-started' }
    ],
    logo: { src: '/nuxt-orama-logo.svg' },
    sidebar: [
      {
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Configuration', link: '/configuration' },
          { text: 'Usage', link: '/usage' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/amandesai01/nuxt-orama' }
    ]
  }
})
