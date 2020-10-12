<template>
  <div class="header">
    <img alt="GitHub logo" src="../assets/github.png" />
    <h1>GitHub Search</h1>
    <img alt="Search logo" src="../assets/search.png" />
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
</style>
