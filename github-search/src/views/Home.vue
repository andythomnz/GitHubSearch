<template>
    <v-container>
      <br><br><br><br><br>
      <v-layout justify-center>
        <v-flex>
          <v-text-field
            outlined
            label="Search"
            v-model="searchTerm"
            @keydown.enter="onSearchBoxEnter"
            append-icon="mdi-magnify"
            counter="100"
          ></v-text-field>
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
    };
  },
  methods: {
    onSearchBoxEnter() {
      let encoded = encodeURIComponent(this.searchTerm).replaceAll("%20","+");
      this.$router.push({
        name: "User Results",
        params: {
          searchTerm: encoded
        },
      });
    },
  }
};
</script>
