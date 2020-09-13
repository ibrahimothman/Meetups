<template>
    <v-container>
      <v-row v-if="error">
        <v-col cols="12" sm="6" offset-sm="3">
          <error :text="error.message" :onDismiss="onDismiss"></error>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" offset-sm="3">
          <v-card>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
                @submit.prevent="onSignIn"
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
                <v-btn
                  :disabled="!valid || loading"
                  color="success"
                  class="mr-4"
                  type="submit"
                  :loading="loading"
                >
                  Sign In
                </v-btn>

                <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Reset
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
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
    };
  },
  computed: {
    ...mapState('auth', ['user', 'error', 'loading']),
  },
  methods: {
    ...mapActions('auth', ['signIn']),
    ...mapMutations('auth', ['clearError']),
    async onSignIn() {
      if (this.valid) {
        await this.signIn({ email: this.email, password: this.password });
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
