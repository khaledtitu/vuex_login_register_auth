<template>


  <v-container>
      <v-layout
        text-xs-center
        wrap
      >
      <v-flex xs6 offset-xs3>

        <h2
         text-xs-center>Register
        </h2>
        <v-form ref="form">

          <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->
          <div v-if="serverErrors">
          <!--   {{serverErrors}} -->
            <div v-for="(value, key) in serverErrors" :key="key">
             <!--  {{ value.message }} -->
              <div>
              
              </div>
                <v-alert
                   v-if="value.message.email"
                  :value="true"
                  type="error"
                  >
                   {{ value.message.email[0]}}
                </v-alert>
                  
            </div> 

          </div>

          <div class="form-control">

          <v-text-field
            v-model="name"
            name="name"
            :class="{ 'input-error': errors.has('name') }"
            v-validate="'required'"
            label="Name"
          ></v-text-field>
            <span class="form-error">{{ errors.first('name') }}</span>
          </div>

          <div class="form-control">
           
            <v-text-field
            v-model="email"
            name="email"
            :class="{ 'input-error': errors.has('email') }"
            v-validate="'required|email'"
            label="Email"
          ></v-text-field>
          
            <span class="form-error">{{ errors.first('email') }}</span>
          </div>

          <div class="form-control">
            <v-text-field
              v-model="password"
              name="password"
              ref="password"
              :type="'password'"
              :class="{ 'input-error': errors.has('password') }"
              v-validate="'required|min:6'"
              label="password "
            ></v-text-field>
      
            <span class="form-error">{{ errors.first('password') }}</span>
          </div>

          <div>
            <v-text-field
              v-model="repeat_password"
              name="repeat_password"
              id="repeat_password"
              :type="'password'"
              :class="{ 'input-error': errors.has('repeat_password') }"
              v-validate="'required|confirmed:password'"
              label="Password confirmation"
            ></v-text-field>

            <span class="form-error">{{ errors.first('repeat_password') }}</span>

          </div>

          <div class="form-control">
            <v-btn
             tag
              type="submit"
              @click="validateBeforeSubmit"
              outline
              round
              color="blue"
              >Create Account</v-btn>
          </div>

        </v-form>

      </v-flex>
  
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      repeat_password: '',
      serverErrors: '',
      successMessage: '',
    }
  },
  methods: {
    validateBeforeSubmit() {
      alert()
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.register()
        }
      })
    },
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
        repeat_password: this.repeat_password,
      })
        .then(response => {
          this.successMessage = 'Registered Successfully!'
          this.$router.push({ name: 'login', params: { dataSuccessMessage: this.successMessage } })
          this.$toast.success({
            title: this.successMessage,
            message: 'You can login here'
          })
        })
        .catch(error => {
          this.serverErrors = Object.values(error.response.data)
        })
    }
  }
}
</script>

<style>




</style>
