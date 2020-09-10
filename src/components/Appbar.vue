<template>
  <v-card
    flat
    tile
  >
    <v-toolbar short color="red darken-1" dark>
      <v-toolbar-title>
        Meetups
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn text v-for="item in menuItems" :key="item.title">
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
        { icon: 'mdi-account-multiple', title: 'View Meetups' },
        { icon: 'mdi-map-marker', title: 'Organize Meetup' },
        { icon: 'mdi-account', title: 'Profile' },
        { icon: 'mdi-face-outline', title: 'Sign Up' },
        { icon: 'mdi-lock-open-outline', title: 'Sign In' },
      ],
    };
  },
};
</script>
