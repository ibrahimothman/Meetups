<template>
    <v-container>
      <v-row>
        <v-col v-for="i in n"
          :key="i"
          cols="12"
          md="4"
        >
          <single-meetup></single-meetup>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import SingleMeetup from '../../components/SingleMeetup.vue';

export default {
  components: {
    SingleMeetup,
  },
  data() {
    return {
      n: 4,
    };
  },
};
</script>
