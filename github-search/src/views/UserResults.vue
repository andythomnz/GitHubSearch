<template>
  <div class="user-search-results">
    <v-container style="width: 90%;">
      <v-container ma-0 pa-0>
        <v-row no-gutters>
          <p class="font-weight-black">Search Results</p>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <br />
            <p
              class="font-weight-light"
            >Showing {{this.firstResultOfPage}} to {{this.lastResultOfPage}} of {{this.total_count}} results</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-select v-model="sortOrder" :items="sort_fields" label="Sort By"></v-select>
          </v-col>
        </v-row>
      </v-container>
      <v-card elevation="2" :loading="loading">
        <v-alert v-if="this.error" prominent type="error">
          <v-row align="center">
            <v-col class="grow">
              <p class="font-weight-black">{{this.errorDetails.name}}</p>
              {{this.errorDetails.description}}
            </v-col>
            <v-col
              v-if="this.errorDetails.reference && this.errorDetails.reference.length > 0"
              class="shrink"
            >
              <v-btn :href="this.errorDetails.reference">More Information</v-btn>
            </v-col>
          </v-row>
        </v-alert>
        <v-data-table
          :headers="headers"
          :items="results"
          disable-pagination
          :hide-default-footer="true"
        >
          <template #item.avatar_url="{ item }">
            <a target="_blank" :href="item.html_url" style="text-decoration: none;">
              <v-avatar size="35">
                <img :src="item.avatar_url" :alt="item.login" />
              </v-avatar>
            </a>
          </template>
          <template #item.html_url="{ item }">
            <a target="_blank" :href="item.html_url" style="text-decoration: none;">
              <v-icon>mdi-open-in-new</v-icon>
            </a>
          </template>
        </v-data-table>
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
import { search } from "@/components/GitHubConnector/SearchUsers.vue";

export default {
  name: "UserResults",
  props: [],
  data() {
    return {
      searchTerm: "",
      loading: true,
      error: false,
      errorDetails: {},
      currentPage: 1,
      resultsPerPage: 10,
      firstResultOfPage: 0,
      lastResultOfPage: 0,
      totalPages: 1,
      results: [],
      total_count: 0,
      sort_fields: [
        { text: "Join Date", value: "joined" },
        { text: "Followers", value: "followers" },
        { text: "Repositories", value: "repositories" },
      ],
      sortOrder: "joined",
      headers: [
        {
          text: "Avatar",
          align: "start",
          sortable: false,
          value: "avatar_url",
        },
        { text: "Login", sortable: false, value: "login" },
        { text: "User Type", value: "type", sortable: false },
        { text: "Profile", value: "html_url", sortable: false },
      ],
    };
  },
  components: {},
  mounted() {
    this.searchTerm = this.$route.params.searchTerm;
    this.refreshData();
  },
  methods: {
    refreshData: function () {
      // if there is no search query, redirect to the search box
      if (!this.searchTerm) {
        this.$router.push({ name: "Home" });
      }
      this.loading = true;
      search(
        this.searchTerm,
        this.sortOrder,
        this.currentPage,
        this.resultsPerPage
      )
        .then((res) => {
          this.results = res.users;
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
        })
        .catch((err) => {
          this.handleDataError(err);
        });
    },
    handlePageChange(destination) {
      this.currentPage = destination;
      this.refreshData();
    },
    handleDataError(err) {
      this.errorDetails = err;
      this.loading = false;
      this.error = true;
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