<template>
  <div class="user-search-results">
    <h1>Users Search Results</h1>
    <div id="results-data-table">
      <v-data-table
        :headers="headers"
        :items="results"
        disable-pagination
        :hide-default-footer="true"
      >
      </v-data-table>

      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="handlePageChange"
        dark
        color="grey"
      >
      </v-pagination>
    </div>
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
      currentPage: 1,
      totalPages: 7,
      results: [],
      headers: [
        { text: "Login", align: "start", sortable: false, value: "login" },
        { text: "Profile", value: "html_url", sortable: false },
        { text: "User Type", value: "type", sortable: false },
      ],
    };
  },
  components: {},
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData: function () {
      search("andrew","joined",this.currentPage).then(res => {
        this.results = res;
      })
    },
    handlePageChange(destination) {
      this.currentPage = destination;
      this.refreshData();
    },
  },
};
</script>