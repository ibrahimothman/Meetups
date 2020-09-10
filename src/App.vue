<template>
  <v-app app>
    <appbar></appbar>
    <main>
      <router-view />
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
