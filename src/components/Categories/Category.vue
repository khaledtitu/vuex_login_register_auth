<template>
	<v-layout wrap row>
		<v-flex xs12 sm12 md12 class="">
			<v-navigation-drawer
			permanent
			>
			<v-toolbar flat>
				<v-list>
					<v-list-tile>
						<v-list-tile-title class="title">
						Category
						</v-list-tile-title>
					</v-list-tile>
				</v-list>
			</v-toolbar>
			<v-divider></v-divider>
			<v-list>
				<v-list-tile
					v-for="(item, i) in categoryGetters"
					:key="i"
					:to="'/category-list/'+ item.id"
				>
				<v-list-tile-content>
					<v-list-tile-title>{{ item.name }}</v-list-tile-title>
				</v-list-tile-content>
				</v-list-tile>
			</v-list>
			</v-navigation-drawer>
		</v-flex>
	</v-layout>
</template>
<script>
	export default {
		data() {
			return {
				categoryDataCheck: false,
				categoryId: 0,
				currentProductPage:0,
			}
		},
		created() {
			this.readCategories()
		},
		computed: {
			categoryGetters() {
				return this.$store.getters.categoryGetters
			}
		},
		methods: {
			readCategories() {
				this.$store.dispatch('categoryData')
				.then(() => {
					this.loading = false
				})
			}
		}
	}

</script>

<style scoped>
	.sidebar-menu {
		background-color: #081D26;
	}
	.sidebar-menu a {
        color: #e8e8e8;
        text-decoration: none;
    }
    .sidebar-menu a:hover {
        color: #fff;
        text-decoration: none;
    }
</style>