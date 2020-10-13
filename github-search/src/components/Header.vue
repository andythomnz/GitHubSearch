<template>
  <div class="header">
    <img alt="GitHub logo" src="../assets/github.png" />
    <router-link :to="{name: 'Home'}"><h1>GitHub Search</h1></router-link>
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
    text-decoration: none;
    color: black !important;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 25px 0px 25px 0px;
}
</style>
