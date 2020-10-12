<template>
  <div class="user-search-results">
    <h1>Users Search Results</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { search } from "@/components/GitHubConnector/SearchUsers.vue";

export default {
  name: "UserResults",
  props: ["searchTerm"],
  data() {
    return {
      foo: "bar",
    };
  },
  components: {},
  created: function () {
    this.refreshData();
  },
  methods: {
    refreshData: function () {
      search();
    },
  },
};
</script>