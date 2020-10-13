<template>
  <div class="topic-search-results">
    <v-container style="width: 90%;">
      <h2>Search Results</h2>
      <v-container>
        <v-row>
          <v-col>
            <h4>Showing {{(this.currentPage * this.resultsPerPage) - 9}} to {{this.currentPage * this.resultsPerPage}} of {{this.total_count}} results</h4>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-select v-model="sortOrder" :items="sort_fields" label="Sort Page By"></v-select>
          </v-col>
        </v-row>
      </v-container>
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
import { search } from "@/components/GitHubConnector/SearchTopics.vue";

export default {
  name: "TopicResults",
  props: [],
  data() {
    return {
      searchTerm: "javascript",
      featuredOnly: false,
      currentPage: 1,
      resultsPerPage: 10,
      totalPages: 1,
      results: [],
      total_count: 1,
      sort_fields: [
        { text: "Name", value: "name" },
        { text: "Created At", value: "created_at" },
      ],
      sortOrder: "name",
      headers: [
        { text: "Name", align: "start", sortable: false, value: "display_name" },
        { text: "Description", value: "short_description", sortable: false },
        { text: "Created At", value: "created_at", sortable: false },
        { text: "Featured", value: "featured", sortable: false },
      ],
    };
  },
  components: {},
  mounted() {
    //this.searchTerm = this.$route.params.searchTerm;
    //this.featuredOnly = this.$route.params.featuredOnly;
    this.refreshData();
  },
  methods: {
    refreshData: function () {
      search(this.searchTerm, this.sortOrder, this.currentPage, this.resultsPerPage, this.featuredOnly).then(
        (res) => {
          this.results = res.topics;
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
  watch: {
    sortOrder: function () {
      this.refreshData();
    }
  }
};
</script>

<style scoped>
#results-data-table {
  padding: 10px, 25px, 25px, 25px;
}
</style>