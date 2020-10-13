<template>
  <div class="user-search-results">
    <v-container style="width: 90%;">
      <h1>Search Results</h1>
      <h3>Showing {{(this.currentPage * this.resultsPerPage) - 9}} to {{this.currentPage * this.resultsPerPage}} of {{this.total_count}} results</h3>
      <v-data-table
        :headers="headers"
        :items="results"
        disable-pagination
        :hide-default-footer="true"
      ></v-data-table>
      <v-container style="width: 60%;">
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          @input="handlePageChange"
          dark
          color="grey"
        ></v-pagination>
      </v-container>
    </v-container>
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
      resultsPerPage: 10,
      totalPages: 1,
      results: [],
      total_count: 1,
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
      search("andrew", "joined", this.currentPage, this.resultsPerPage).then(
        (res) => {
          this.results = res.users;
          this.total_count = res.total_count;

          this.totalPages = parseInt(this.total_count / this.resultsPerPage);
          if (this.total_count % this.resultsPerPage !== 0) {
            this.totalPages++; //account for partially filled pages
          }
        }
      );
    },
    handlePageChange(destination) {
      this.currentPage = destination;
      this.refreshData();
    },
  },
};
</script>

<style scoped>
#results-data-table {
  padding: 10px, 25px, 25px, 25px;
}
</style>