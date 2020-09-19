<template>
  <v-container>
    <v-row v-if="!meetup">
      <v-col class="text-md-center" >
        <v-progress-circular
          size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-card>
          <v-card-title>
            <h3 class="red--text">{{ meetup.title }}</h3>
            <v-spacer></v-spacer>
            <edit-meetup-details v-if="user && meetup.creatorId === user.id"
              :meetup="meetup">
            </edit-meetup-details>
          </v-card-title>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="meetup.imageURL"
          >
          </v-img>

          <v-card-subtitle class="pb-0 info--text">
            {{ meetup.date | filterDate }} - {{ meetup.location }}
            <div class="my-3" v-if="user && meetup.creatorId === user.id">
              <edit-meetup-date
                :meetup="meetup">
              </edit-meetup-date>
              <edit-meetup-time
                :meetup="meetup">
              </edit-meetup-time>
            </div>
          </v-card-subtitle>
          <v-card-text>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <register v-if="user && meetup.creatorId !== user.id" :meetup="meetup"></register>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import EditMeetupDetails from '../../components/Meetups/EditMeetupDetails.vue';
import EditMeetupDate from '../../components/Meetups/EditMeetupDate.vue';
import EditMeetupTime from '../../components/Meetups/EditMeetupTime.vue';
import Register from '../../components/Meetups/Register.vue';

export default {
  components: {
    EditMeetupDetails,
    EditMeetupDate,
    EditMeetupTime,
    Register,
  },
  computed: {
    ...mapGetters('meetups', ['meetupsById']),
    ...mapState('auth', ['user']),
    meetup() {
      return this.meetupsById[this.$route.params.id];
    },
  },
};
</script>
