<template>
  <v-card
    flat
    tile
  >
    <v-toolbar short color="red darken-1" dark>
      <v-toolbar-title>
        <router-link to="/">Meetups</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn v-for="item in displayNavbarItems"
        :key="item.title"
        :to="item.link"
        text>
        <v-icon left light>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn v-if="user"
        text
        @click="signOut"
      >
        <v-icon left light>mdi-lock-open-outline</v-icon>
        Sign Out
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    displayNavbarItems() {
      let menuItems = [
        { icon: 'mdi-account-multiple', title: 'View Meetups', link: '/meetups' },
        { icon: 'mdi-face-outline', title: 'Sign Up', link: '/signup' },
        { icon: 'mdi-lock-open-outline', title: 'Sign In', link: '/signin' },
      ];

      if (this.user) {
        menuItems = [
          { icon: 'mdi-account-multiple', title: 'View Meetups', link: '/meetups' },
          { icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetups/create' },
          { icon: 'mdi-account', title: 'Profile', link: '/profile' },
        ];
      }
      return menuItems;
    },
  },
  methods: {
    ...mapActions('auth', ['signOut']),
  },
};
</script>

<style scoped>
  .v-toolbar__title a {
    color: white;
    text-decoration: none;
  }
</style>
