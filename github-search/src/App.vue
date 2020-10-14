<template>
  <v-app>
    <v-main>
      <Header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header";

export default {
  name: "App",

  created() {
    document.title = "GitHub Search";
  },

  components: {
    Header,
  },

  data: () => ({
  }),
};
</script>
