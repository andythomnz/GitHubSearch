<template>
  <v-container>
    <br />
    <br />
    <br />
    <br />
    <br />
    <v-layout justify-center>
      <v-flex>
        <v-row no-gutters>
          <v-col>
          <v-select v-model="selectedSearchType" :items="searchTypes" label="Search Type" outlined></v-select>
          </v-col>
          <v-col :cols="8">
          <v-text-field
            outlined
            label="Search"
            v-model="searchTerm"
            @keydown.enter="onSearchBoxEnter"
            append-icon="mdi-magnify"
            @click:append="onSearchBoxEnter"
            counter="100"
          ></v-text-field>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      searchTerm: "",
      searchTypes: ["Users", "Topics", "Featured Topics"],
      selectedSearchType: "Users",
    };
  },
  methods: {
    onSearchBoxEnter() {
      if (this.searchTerm.length > 100) {
        return;
      }
      let encoded = encodeURIComponent(this.searchTerm).replaceAll("%20", "+");

      switch (this.selectedSearchType) {
        case "Users":
          this.$router.push({
            name: "User Results",
            params: {
              searchTerm: encoded,
            },
          });
          break;
        case "Topics":
          this.$router.push({
            name: "Topic Results",
            params: {
              searchTerm: encoded,
              featuredOnly: false,
            },
          });
          break;
        case "Featured Topics":
          this.$router.push({
            name: "Topic Results",
            params: {
              searchTerm: encoded,
              featuredOnly: true,
            },
          });
          break;
      }
    },
  },
};
</script>
