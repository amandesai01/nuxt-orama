<template>
  <div>
    <input type="text" v-model="searchInput">
    {{ JSON.stringify(orama.searchResults.value) }}
  </div>
</template>

<script setup>
const searchInput = ref("");

const orama = useOramaSearch();

watchEffect(() => {
  if(searchInput.value) {
    orama.search({
      term: searchInput.value,
    })
  }
})
</script>
