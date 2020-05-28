<template>
  <v-app>
    <viewer-page />
  </v-app>
</template>

<script>
import ViewerPage from "./components/ViewerPage";

export default {
  name: "App",

  components: {
    ViewerPage
  },

  data: () => ({
    //
  })
};
</script>
