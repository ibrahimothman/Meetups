<template>
    <v-container>
      <v-row>
        <v-col v-for="(meetup, index) in meetups"
          :key="index"
          cols="12"
          md="4"
          :meetup="meetup"
        >
          <single-meetup :meetup="meetup"></single-meetup>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import SingleMeetup from '../../components/Meetups/SingleMeetup.vue';

export default {
  components: {
    SingleMeetup,
  },
  computed: {
    ...mapState('meetups', ['meetups']),
  },
};
</script>
