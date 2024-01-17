---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: NuxtOrama
  text: Orama Search Module for Nuxt3
  tagline: Build type-ahead search in Nuxt3 apps within minutes.
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: View on Github
      link: https://github.com/amandesai01/nuxt-orama
  image:
    src: /nuxt-orama-logo.svg
    alt: NuxtOrama's Logo

features:
  - title: Get Started in Minutes
    icon: ⚡️
    details: It takes hardly a minute to configure nuxt-orama, and 5 minutes to integrate into your application.
  - title: Handy Composables
    icon: 💼
    details: Handy composables for all functions, wrapped with refs to seamlessly integrate with your components.
  - title: Manage Multiple Schemas
    icon: 🪢
    details: Easily manage multiple schemas and search instances throughout your application.
---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>