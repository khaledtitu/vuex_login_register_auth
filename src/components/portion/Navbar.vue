<template>
    <v-layout align-center justify-center row>
        <v-flex xs12 sm12 md12 px-5>
          <v-toolbar dark flat app class="pl-5" color="deep-purple darken-1" >
              <v-toolbar-title class="headline text-uppercase pl-5 ml-5">
                <v-toolbar-items class="hidden-sm-and-down">
                  <v-btn :to="{ name: 'home' }" flat >home</v-btn>
                  <v-btn :to="{ name: 'about' }" flat >About</v-btn>
                  <v-btn :to="{ name: 'dashboard' }" flat >Dashboard</v-btn>
                  <v-btn v-if="!loggedIn" :to="{ name: 'login' }" flat >Login </v-btn>
                  <v-btn v-if="!loggedIn" :to="{ name: 'register' }" flat>Register</v-btn>
                  <v-btn v-if="loggedIn" :to="{ name: 'logout' }" flat>Logout</v-btn>
                </v-toolbar-items>
              </v-toolbar-title>

            <v-menu class="hidden-sm-and-up">
              <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title :to="{ name: 'home' }">home</v-list-tile-title>
                   </v-list-tile-content>
                </v-list-tile>  
                <v-list-tile>
                  <v-list-tile-content>
                      <v-list-tile-title :to="{ name: 'about' }">About</v-list-tile-title>
                    
                   </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title v-if="!loggedIn" :to="{ name: 'login' }">Login</v-list-tile-title>
                   </v-list-tile-content>
                </v-list-tile> 

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title v-if="!loggedIn" :to="{ name: 'register' }">Register</v-list-tile-title>
                    
                  </v-list-tile-content>
                </v-list-tile>  

                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title v-if="loggedIn" :to="{ name: 'logout' }">Logout</v-list-tile-title>
                    
                  </v-list-tile-content>
                </v-list-tile>   
              </v-list>
            </v-menu>
        <v-spacer></v-spacer>
        </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script type="text/javascript">
   export default {

  data () {
    return {
      //
    }
  },
  computed: {
      loggedIn() {
        return this.$store.getters.loggedIn
      }
    }
}
</script>

<style scoped="">
  .navbarColor {
      background-color: #081D26 !important;
  }
</style>