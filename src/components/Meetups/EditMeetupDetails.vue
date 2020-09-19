<template>
  <v-dialog v-model="dialog" persistent width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        fab
      >
        <v-icon>mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Meetup</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Title*"
                :rules="notEmpty"
                required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="location"
                label="Location*"
                :rules="notEmpty"
                required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="description"
                label="Description*"
                :rules="notEmpty"
                required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
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
      title: this.meetup.title,
      location: this.meetup.location,
      description: this.meetup.description,
      notEmpty: [(v) => !!v || 'Required.'],
    };
  },
  methods: {
    ...mapActions('meetups', ['updateMeetup']),
    async submitChanges() {
      await this.updateMeetup({
        id: this.meetup.id,
        title: this.title,
        location: this.location,
        description: this.description,
      });
      this.dialog = false;
    },
  },
};
</script>
