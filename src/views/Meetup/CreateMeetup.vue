<template>
  <v-container>
    <v-row v-if="error">
        <v-col cols="12" sm="6" offset-sm="3">
          <error :text="error.message" :onDismiss="onDismiss"></error>
        </v-col>
      </v-row>
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
              :rules="rules.notEmpty"
              label="Title"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-text-field
              v-model="meetup.location"
              :rules="rules.notEmpty"
              label="Location"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-btn
              color="red darken-1"
              dark
              @click="pickFile">
              Upload Image
              </v-btn>
            <input
              type="file"
              style="display: none;"
              accept="image/*"
              ref="fileInput"
              @change="onfilePicked">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <img v-if="imageURL" :src="imageURL" alt="meetup image" height="150">
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" offset-sm="3">
            <v-text-field
              v-model="meetup.description"
              :rules="rules.notEmpty"
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
import { mapActions, mapMutations, mapState } from 'vuex';
import DatePicker from '../../components/Picker/Date.vue';
import TimePicker from '../../components/Picker/Time.vue';
import error from '../../components/Alert/Error.vue';

export default {
  components: {
    DatePicker,
    TimePicker,
    error,
  },
  data() {
    return {
      valid: false,
      date: '',
      time: '',
      imageURL: '',
      meetup: {
        title: '',
        location: '',
        image: null,
        description: '',
        date: '',
      },
      rules: {
        notEmpty: [(v) => !!v || 'Required.'],
      },
    };
  },
  computed: {
    ...mapState('meetups', ['error']),
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
    ...mapMutations('meetups', ['clearError']),
    onDateChange(date) {
      this.date = date;
    },
    onTimeChange(time) {
      this.time = time;
    },
    async submitMeetup() {
      if (!this.valid || !this.meetup.image) {
        console.log('asdasd');
        return;
      }
      this.meetup.date = this.submittableDate.toISOString();
      await this.addMeetup(this.meetup);
      if (!this.error) {
        this.$router.push('/meetups');
      }
    },
    onDismiss() {
      this.clearError();
    },
    pickFile() {
      this.$refs.fileInput.click();
    },
    onfilePicked(event) {
      const [file] = event.target.files;
      const fileName = file.name;
      if (fileName.lastIndexOf('.') <= 0) {
        alert('please choose a valid image');
      } else {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageURL = fileReader.result;
        });
        fileReader.readAsDataURL(file);
        this.meetup.image = file;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
