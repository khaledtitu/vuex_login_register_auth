<template>
	<v-flex sm3>
		<v-navigation-drawer permanent>
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
			<v-list dense class="pt-0">
				<v-list-tile
					v-for="cat in categoryGetters"
					:key="cat.name"
					@click="productDetails(cat.id)"
				>
					<v-list-tile-action>
						<v-icon>dashboard</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ cat.name }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</v-flex>
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
			readCategoryProducts(){
				this.loading = true
				this.$store.dispatch('CategoryProductData', {
					cat_id: this.categoryId,
					current_page: this.currentProductPage
				})
				.then(response => {
					this.loading = false
				})
			},
			readCategories() {
				this.$store.dispatch('categoryData')
				.then(response => {
					this.loading = false
				})
			},
			productDetails(CatID) {
				this.categoryDataCheck = true
				this.categoryId = CatID
				this.currentProductPage = 0
				this.readCategoryProducts()
			}
		}
	}

</script>