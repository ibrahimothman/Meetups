<template>
  <v-row justify="center">
    <v-date-picker color="red darken-1" v-model="date"></v-date-picker>
  </v-row>
</template>

<script>
/* eslint-disable */
export default {
  props: ['onDateChange'],
  data() {
    return {
      date: '',
    };
  },
  watch: {
    date: function (newValue) {
      console.log(newValue);
      this.onDateChange(newValue);
    },
  },
};
</script>
