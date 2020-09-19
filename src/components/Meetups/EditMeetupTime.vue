<template>
  <v-dialog v-model="dialog" persistent width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"

      >
        Edit Time
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup Time</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-time-picker v-model="editableTime" format="24hr"></v-time-picker>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="submitChanges">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['meetup'],
  data() {
    return {
      dialog: '',
      editableTime: null,
    };
  },
  created() {
    this.editableTime = new Date(this.meetup.date);
  },
  methods: {
    ...mapActions('meetups', ['updateMeetup']),
    async submitChanges() {
      const newDate = this.getNewDate();
      await this.updateMeetup({
        id: this.meetup.id,
        date: newDate,
      });
      this.dialog = false;
    },
    getNewDate() {
      const newDate = new Date(this.meetup.date);
      const [hours, minutes] = this.editableTime.split(':');
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      return newDate;
    },
  },
};
</script>
