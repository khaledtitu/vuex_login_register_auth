<template>
	<v-layout class="sidebar-menu">
	<v-layout justify-center wrap row>
		<v-flex xs12 sm12 md12 class="">
			<v-list class="pt-0 transparent white--text pt-5 pb-5 mb-5" dark>
				<v-list-tile class="pb-2">
					<v-list-tile-action class="pb-2">
					<v-icon>home</v-icon>
					</v-list-tile-action>
					<v-list-tile-title>Category</v-list-tile-title>
				</v-list-tile>
				<v-list-group
					no-action
					prepend-icon=""
					value="true"
				>
				<div class="pt-3">
					<div
					v-for="(item, i) in categoryGetters"
					:key="i"
					>
					<p class="body-1 text-sm-left pl-5"> <router-link :to="'/category-list/'+ item.id">{{ item.name }} </router-link> </p>
					<v-list-tile-action>
					</v-list-tile-action>
					</div>
				</div>
				</v-list-group>
			</v-list>
		</v-flex>
	</v-layout>
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