<template>
  <v-card
    width="300"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="meetup.imageURL"
    >
      <v-card-title> {{ meetup.title }} </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> {{ meetup.date | filterDate }} </v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="red darken-1"
        text
        @click="() => $router.push(`/meetups/${meetup.id}`)"
      >
        View Meetup
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['meetup'],
};
</script>
