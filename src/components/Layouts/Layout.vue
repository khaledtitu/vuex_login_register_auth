<template>
	<v-container>
		<v-layout wrap row>
			<v-flex xs12 sm12 md3>
				<SideBar></SideBar>
				</v-flex>
				<v-flex xs12 sm12 md9>
				<router-view></router-view>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import SideBar from '../../components/Portion/Sidebar'
export default {
  components: {
      SideBar
    },
  data () {
    return {
    }
  },
}
</script>
