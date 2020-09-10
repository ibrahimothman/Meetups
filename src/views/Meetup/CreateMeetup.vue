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

        <v-row>
          <v-col cols="12" sm="6" class="text-sm-right">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
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
export default {
  data() {
    return {
      valid: false,
      meetup: {
        title: '',
        location: '',
        imageURL: '',
        description: '',
      },
      rules: {
        noteEmpty: [(v) => !!v || 'Required.'],
      },
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
