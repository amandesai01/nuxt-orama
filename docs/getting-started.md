# Getting Started

## Introduction

`nuxt-orama` is a powerful Nuxt3 module designed to effortlessly integrate [OramaSearch](https://oramasearch.com) into your projects. It provides access to the Orama instance throughout your application. It is even possible to create multiple schemas (instances).

## Quick Start

### Install `nuxt-orama`

::: code-group
```sh [npm]
$ npm install nuxt-orama
```
```sh [yarn]
$ yarn add nuxt-orama
```
:::

### Enable the module in your Nuxt configuration

```Js
export default defineNuxtConfig({
  modules: ['nuxt-orama'],
  orama: {
    schemas: [
      {
        schema: {
          // your schema
        },
        id: 'unique-key-to-access-later' // defaults to `default`
      }
    ]
  }
})
```
::: tip
You can find more about configuring `nuxt-orama` [here](/configuration).
:::

### Use it in your application
```vue
<script setup lang='ts'>
const { search, searchResults } = useOramaSearch('unique-key-added-before');
const searchInput = ref('');

watchEffect(() => {
  search({
    term: searchInput.value
  })
});
</script>

<template>
  <div>
    <input v-model="searchInput" type="text" />
    {{ searchResults }}
  </div>
</template>
```