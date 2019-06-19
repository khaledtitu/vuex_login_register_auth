<template>
    <v-app>
        <v-content>
            <Navbar></Navbar>
            <span v-if="currentMetaName=='dashboard'">
                <DashboardLayout></DashboardLayout>
            </span>
            <span v-else>
                <Layout></Layout>
            </span>
        </v-content>
    </v-app>
</template>
<script>
  import Navbar from './components/Portion/Navbar.vue'
  import Layout from './components/Layouts/Layout.vue'
  import DashboardLayout from './components/Layouts/DashboardLayout.vue'

  export default {
    components: {
        Navbar,
        Layout,
        DashboardLayout
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
          return this.$route.meta.name;
        }
      }
  }
</script>



