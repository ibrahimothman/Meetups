<template>
  <v-app app>
    <appbar></appbar>
    <main>
      <router-view />
    </main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Appbar from './components/Appbar.vue';

export default {
  components: {
    Appbar,
  },
  async created() {
    await this.loadMeetups();
  },
  methods: {
    ...mapActions('meetups', ['loadMeetups']),
  },
};
</script>
