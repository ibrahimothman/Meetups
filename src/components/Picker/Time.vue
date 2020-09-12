<template>
  <v-row justify="center">
    <v-time-picker color="red darken-1" v-model="time" format="24hr"></v-time-picker>
  </v-row>
</template>

<script>
/* eslint-disable */
export default {
  props: ['onTimeChange'],
  data() {
    return {
      time: '',
    };
  },
  watch: {
    time: function (newValue) {
      this.onTimeChange(newValue);
    },
  },
};
</script>
