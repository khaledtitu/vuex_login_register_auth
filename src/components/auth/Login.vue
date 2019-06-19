<template>
  <v-container>
      <v-layout
        text-xs-center
        wrap
      >
    <v-flex xs6 offset-xs3>
      <h2 text-xs-center>Login</h2>
      <v-form ref="form" >
        <v-alert
          v-if="successMessage"
          :value="true"
          type="success"
        >
        {{ successMessage }}
        </v-alert>
        <div v-if="serverError">
              <v-alert
              :value="true"
              type="error"
              >
              {{ serverError.errors.message }}
            </v-alert>

        </div>
        <div class="form-control">
          <v-text-field
            v-model="email"
            name="email"
            :class="{ 'input-error': errors.has('email') }"
            v-validate="'required|email'"
            label="Email"
          ></v-text-field>
        </div>
        <div class="form-control">
          <v-text-field
              v-model="password"
              name="password"
              :type="'password'"
              :class="{ 'input-error': errors.has('password') }"
              v-validate="'required'"
              label="password "
            ></v-text-field>
        </div>
        <div class="form-control">
          <v-btn
             tag
              type="submit"
              :disabled="loading"
              @click="login"
              outline
              round
              color="green"
            >login</v-btn>
            <v-progress-circular v-if="loading" :value="20"></v-progress-circular>
        </div>
      </v-form>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
      loading: false,
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      })
        .then(() => {
          this.loading = false
          this.$router.push({ name: 'dashboard' })
        })
        .catch(error => {
          this.loading = false
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
        })
    }
  }
}
</script>

