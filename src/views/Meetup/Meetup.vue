<template>
  <v-container>
    <v-row>
      <v-col>

        <v-card>
          <v-card-title class="red--text">{{ meetup.title }}</v-card-title>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="meetup.imageURL"
          >
          </v-img>

          <v-card-subtitle class="pb-0 info--text">{{ meetup.date | filterDate }}</v-card-subtitle>
          <v-card-text>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              dark
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('meetups', ['meetupsById']),
    meetup() {
      return this.meetupsById[this.$route.params.id];
    },
  },
};
</script>
