<template>
    <v-app>
        <v-content>
            <Navbar></Navbar>
            <Layout></Layout>
        </v-content>
    </v-app>
</template>
<script>
  import Navbar from './components/portion/Navbar.vue'
  import Layout from './components/Layouts/Layout.vue'


  export default {
    components: {
        Navbar,
        Layout
      },
    data () {
      return {
        //
      }
    },
    computed: {
        loggedIn() {
          return this.$store.getters.loggedIn
        },
        currentMetaName(){
          return this.$route.meta;
        }
      }
  }
</script>



