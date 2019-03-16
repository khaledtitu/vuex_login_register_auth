<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
     <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

import Navbar from './components//portion/Navbar'

export default {
  components: {
      Navbar
    },
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



