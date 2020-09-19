<template>
  <v-container>
    <v-row wrap>
      <v-col cols="12" sm="6" class="text-xs-left text-sm-right">
        <v-btn to="/meetups" dark class="indigo darken-1">Explore Meetups</v-btn>
      </v-col>
      <v-col  cols="12" sm="6" class="text-xs-center text-sm-left">
        <v-btn to="/meetups/create" dark class="indigo darken-1">Organize Meetup</v-btn>
      </v-col>
    </v-row>

    <!-- meetups -->
    <v-row>
      <v-col>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageURL"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click.native="$router.push(`/meetups/${meetup.id}`);"
          >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="display-3 title">{{ meetup.title }}</div>
          </v-row>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-row justify="center">
          <p>Join Our Meetup Now</p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  computed: {
    ...mapState('meetups', ['meetups']),
  },
  methods: {
    loadMeetup() {
      console.log('load meetup');
      this.$router.push('/meetups/1');
    },
  },

};
</script>

<style scoped>
  .title {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
