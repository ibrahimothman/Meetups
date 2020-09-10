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
      <v-btn v-for="item in menuItems"
        :key="item.title"
        :to="item.link"
        text>
        <v-icon left light>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { icon: 'mdi-account-multiple', title: 'View Meetups', link: '/meetups' },
        { icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetups/create' },
        { icon: 'mdi-account', title: 'Profile', link: '/profile' },
        { icon: 'mdi-face-outline', title: 'Sign Up', link: '/signin' },
        { icon: 'mdi-lock-open-outline', title: 'Sign In', link: '/signup' },
      ],
    };
  },
};
</script>

<style scoped>
  .v-toolbar__title a {
    color: white;
    text-decoration: none;
  }
</style>
