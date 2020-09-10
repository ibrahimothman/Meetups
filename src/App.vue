<template>
  <v-app app>
    <appbar></appbar>
    <main>
      <v-container fluid>
        <router-view />
      </v-container>
    </main>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar.vue';

export default {
  components: {
    Appbar,
  },
};
</script>
