<template>
  <v-alert
    border="right"
    colored-border
    type="error"
    elevation="2"
    dismissible
    @input="onDismiss"
    :value="true"
    >
      {{ text }}
    </v-alert>
</template>

<script>
export default {
  props: ['text', 'onDismiss'],
};
</script>
