<template>
  <div>
    <p>Search Query</p>
    <input v-model="searchInput" type="text">
    <hr>
    <p>Search Results:</p>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody id="userTableBody" v-if="searchResults">
        <tr v-for="result in searchResults.hits">
          <td>{{ result.document.id }}</td>
          <td>{{ result.document.username }}</td>
          <td>{{ result.document.user.firstName }}</td>
          <td>{{ result.document.user.lastName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const searchInput = ref("");

const { search, searchResults, clearSearchResults } = useOramaSearch();

watchEffect(() => {
  if (searchInput.value) {
    search({
      term: searchInput.value,
    })
  } else {
    clearSearchResults();
  }
})
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>