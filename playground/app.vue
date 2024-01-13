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

const orama = useOramaSearch();

watchEffect(() => {
  if (searchInput.value) {
    orama.search({
      term: searchInput.value,
    })
  }
})
</script>
