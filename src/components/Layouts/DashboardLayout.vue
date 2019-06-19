<template>
	<v-container>
		<v-layout wrap row>
			<v-flex xs12 sm12 md3>
				<v-navigation-drawer permanent height="500">
					<v-toolbar flat>
						<v-list>
							<v-list-tile>
								<v-list-tile-title class="title">
								Nav Bar
								</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-toolbar>
					<v-divider></v-divider>
					<v-list dense class="pt-0">
						<v-list-tile
						v-for="item in items"
						:key="item.title"
						>
							<v-list-tile-action>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-tile-action>

							<v-list-tile-content >
								<v-list-tile-title><router-link :to="{name: item.routeName}"> {{ item.title }} </router-link></v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list>
					</v-navigation-drawer>
			</v-flex>
			<v-flex xs12 sm12 md9>
				<router-view></router-view>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data () {
		return {
			items: [
				{ title: 'Home', icon: 'dashboard', routeName: 'dashboard' },
				{ title: 'Add product', icon: 'question_answer', routeName: 'addProduct' }
			],
			right: null
		}
	},
}
</script>
