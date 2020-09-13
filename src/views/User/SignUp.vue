<template>
    <v-container>
      <v-row v-if="error">
        <v-col cols="12" sm="6" offset-sm="3">
          <error :text="error.message" :onDismiss="onDismiss"></error>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-form
            ref="form"
            v-model="valid"
            @submit.prevent="onSignUp"
          >
            <v-text-field
              v-model="email"
              :rules="emialRules"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :rules="[confirmed]"
              label="Confirm Password"
              type="password"
              required
            ></v-text-field>
            <v-btn
              :disabled="!valid || loading"
              color="success"
              class="mr-4"
              type="submit"
              :loading="loading"
            >
              Sign Up
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      email: '',
      emialRules: [
        (v) => !!v || 'Email is required.',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [(v) => !!v || 'Password is required.'],
      confirmPassword: '',
    };
  },
  computed: {
    ...mapState('auth', ['user', 'loading', 'error']),
    confirmed() {
      return this.password === this.confirmPassword || 'Password doesn\'t match';
    },
  },
  methods: {
    ...mapActions('auth', ['signUp']),
    ...mapMutations('auth', ['clearError']),
    async onSignUp() {
      if (this.valid) {
        await this.signUp({ email: this.email, password: this.password });
        if (this.user) {
          this.$router.push('/');
        }
      }
    },
    onDismiss() {
      this.clearError();
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
