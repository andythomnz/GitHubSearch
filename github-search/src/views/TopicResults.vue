<template>
  <div class="topic-search-results">
    <v-container style="width: 90%;">
      <v-container ma-0 pa-0>
        <v-row no-gutters>
          <p class="font-weight-black">Search Results</p>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <p class="font-weight-light">Showing {{this.firstResultOfPage}} to {{this.lastResultOfPage}} of {{this.total_count}} results</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-select v-model="sortOrder" :items="sort_fields" label="Sort Page By"></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-card elevation="2" :loading="loading">
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
      </v-card>
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
      searchTerm: "",
      loading: true,
      featuredOnly: false,
      currentPage: 1,
      resultsPerPage: 10,
      lastResultOfPage: 0,
      firstResultOfPage: 0,
      totalPages: 1,
      results: [],
      total_count: 0,
      sort_fields: [
        { text: "Name", value: "name" },
        { text: "Created At", value: "created_at" },
      ],
      sortOrder: "name",
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "display_name",
        },
        { text: "Description", value: "short_description", sortable: false },
        { text: "Created At", value: "created_at", sortable: false },
        { text: "Featured", value: "featured", sortable: false },
      ],
    };
  },
  components: {},
  mounted() {
    this.searchTerm = this.$route.params.searchTerm;
    this.featuredOnly = this.$route.params.featuredOnly;
    this.refreshData();
  },
  methods: {
    refreshData: function () {
      // if there is no search query, redirect to the search box
      if (!this.searchTerm) {
        this.$router.push({name: "Home"});
      }
      this.loading = true;
      search(
        this.searchTerm,
        this.sortOrder,
        this.currentPage,
        this.resultsPerPage,
        this.featuredOnly
      ).then((res) => {
        this.results = res.topics;
        this.total_count = res.total_count;

        //account for partially filled pages during pagination and 'showing X to Z of Y results'
        this.totalPages = parseInt(this.total_count / this.resultsPerPage);
        if (this.total_count % this.resultsPerPage !== 0) {
          this.totalPages++;
        }
        this.firstResultOfPage = this.currentPage * this.resultsPerPage - 9;
        if (this.firstResultOfPage > this.total_count) {
          this.firstResultOfPage = this.total_count;
        }
        this.lastResultOfPage = this.currentPage * this.resultsPerPage;
        if (this.lastResultOfPage > this.total_count) {
          this.lastResultOfPage = this.total_count;
        }
        this.loading = false;
      });
    },
    handlePageChange(destination) {
      this.currentPage = destination;
      this.refreshData();
    },
  },
  watch: {
    sortOrder: function () {
      this.currentPage = 1; // If sort by changes, return user to first page of results
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