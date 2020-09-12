<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <h3 class="grey--text ">Create A New Meetup</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-form
          v-model="valid"
          ref="form"
          @submit.prevent="submitMeetup"
        >
        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-text-field
              v-model="meetup.title"
              :rules="rules.noteEmpty"
              label="Title"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-text-field
              v-model="meetup.location"
              :rules="rules.noteEmpty"
              label="Location"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-text-field
              v-model="meetup.imageURL"
              :rules="rules.noteEmpty"
              label="Image URL"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-text-field
              v-model="meetup.description"
              :rules="rules.noteEmpty"
              label="Description"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- date & time -->
        <v-row justify="center">
          <v-col cols="12" sm="6" offset-sm="3">
            <h4>Choose Date & Time</h4>
          </v-col>
        </v-row>
        <v-row justify="space-around">
          <date-picker :onDateChange="onDateChange"></date-picker>
          <time-picker :onTimeChange="onTimeChange"></time-picker>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" class="text-sm-right">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
            >Create Meetup</v-btn>
          </v-col>

          <v-col cols="12" sm="6" class="text-sm-left">
            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >Reset</v-btn>
          </v-col>

        </v-row>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import DatePicker from '../../components/Picker/Date.vue';
import TimePicker from '../../components/Picker/Time.vue';

export default {
  components: {
    DatePicker,
    TimePicker,
  },
  data() {
    return {
      valid: false,
      date: '',
      time: '',
      meetup: {
        title: '',
        location: '',
        imageURL: '',
        description: '',
        date: '',
      },
      rules: {
        noteEmpty: [(v) => !!v || 'Required.'],
      },
    };
  },
  computed: {
    submittableDate() {
      const date = new Date(this.date);
      const [hours, minutes] = this.time.split(':');
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    },
  },
  methods: {
    ...mapActions('meetups', ['addMeetup']),
    onDateChange(date) {
      this.date = date;
    },
    onTimeChange(time) {
      this.time = time;
    },
    submitMeetup() {
      this.meetup.date = this.submittableDate;
      this.addMeetup(this.meetup);
      this.$router.push('/meetups');
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
