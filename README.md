![nuxt-orama](./docs/public/cover.png)

# Nuxt Orama

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for hassle free integration with [OramaSearch](https://oramasearch.com).

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/amandesai01/nuxt-orama?file=playground%2Fapp.vue)


## Features

<!-- Highlight some of the features your module provide here -->
- Extremely easy to configure.
- Easily access Orama instance throughout application.
- Hooks available to populate Orama instance via plugins.
- Handy composables such as `useOramaSearch()`
- Reactive search results population, say good-bye to `watch` and `watchEffect`.

## Problems Solved
- No need to wait for instance initialisation on frontend before puting items into index.
- No need to resolve promises while searching and adding items to index.
- Fix a common issue where first query fails because search function is triggered before index built.

## Usage

Edit your `nuxt.config.ts` like this
```js
export default defineNuxtConfig({
  modules: ["nuxt-orama"],
  orama: {
    schemas: [
      {
        schema: {
          id: "string",
          username: "string",
          ...
        },
        id: 'userIndex'
      },
      // other schemas here.
    ],
  },
});

```

Now on any page, simply use like this
```html
<template>
  <div>
    <input
      v-model="searchInput"
      type="text"
    >
    {{ JSON.stringify(orama.searchResults.value) }}
  </div>
</template>

<script setup>
const searchInput = ref("");

const orama = useOramaSearch('userIndex');

watchEffect(() => {
  if (searchInput.value) {
    orama.search({
      term: searchInput.value,
    })
  }
})
</script>

```


## Roadmap
- [x] Wrap around `search` and `insertMultiple`
- [x] Wrap around other functions such for `update`, `remove`
- [ ] Hooks for plugins to insert data during indexing
- [ ] Types generation for schemas.
- [ ] Separate `orama.config.ts` file to not populate Nuxt config.

... expect more within weeks.

## Quick Setup

1. Add `nuxt-orama` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-orama

# Using yarn
yarn add --dev nuxt-orama

# Using npm
npm install --save-dev nuxt-orama
```

2. Add `nuxt-orama` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-orama'
  ]
})
```

That's it! You can now use Nuxt Orama in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-orama/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-orama

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-orama.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-orama

[license-src]: https://img.shields.io/npm/l/nuxt-orama.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-orama

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
