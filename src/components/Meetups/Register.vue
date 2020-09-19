<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="red darken-1"
        dark
        v-bind="attrs"
        v-on="on"
      >
        {{ isUserRegisteredForMeetup ? 'unregister' : 'register' }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"
        v-if="isUserRegisteredForMeetup">
        UnRegister For Meetup?
      </v-card-title>
      <v-card-title class="headline" v-else>Register For Meetup?</v-card-title>
      <v-card-text>You can change your decision any time</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="green darken-1" text @click="onAgree">
          {{ isUserRegisteredForMeetup ? 'unregister' : 'register' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: ['meetup'],
  computed: {
    ...mapState('auth', ['user']),
    isUserRegisteredForMeetup() {
      if (this.user) {
        return this.user.registeredMeetups
          .findIndex((meetup) => meetup.id === this.meetup.id) >= 0;
      }
      return null;
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    ...mapActions('register', ['registerForMeetup', 'unRegisterForMeetup']),
    async onAgree() {
      if (this.isUserRegisteredForMeetup) {
        await this.unRegisterForMeetup(this.meetup.id);
      } else {
        await this.registerForMeetup(this.meetup.id);
      }
      this.dialog = false;
    },
  },
};
</script>
