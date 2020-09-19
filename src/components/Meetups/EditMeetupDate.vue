<template>
  <v-dialog v-model="dialog" persistent width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
      >
        Edit Date
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup Date</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-date-picker v-model="editableDate"></v-date-picker>
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
      editableDate: null,
    };
  },
  created() {
    this.editableDate = new Date(this.meetup.date).toISOString().substr(0, 10);
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
      const editableDate = new Date(this.editableDate);
      newDate.setUTCDate(editableDate.getUTCDate());
      newDate.setUTCMonth(editableDate.getUTCMonth());
      newDate.setUTCFullYear(editableDate.getUTCFullYear());
      return newDate;
    },
  },
};
</script>
