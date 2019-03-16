<template>
	<div>
		<v-progress-circular v-if="loading" :value="20"></v-progress-circular>
		<div class="card-custom" v-for="item in productGetters" :key="item.id">
			<v-layout>
				<v-flex xs4>
					<div v-if="item.product_image">
						<div v-for="proImage in item.product_image.slice(0,1)" :key="proImage.id">
							<v-img
							:src="proImage.image.links" class="imgClass"
							aspect-ratio="2.75"
							></v-img>
						</div>
					</div>
				</v-flex>
				<v-flex xs8>
					<v-card-title>
						<a :href="'/prouct-details/'+item.id" class="list-data">
							<h3 class="headline ">{{item.name}}</h3>
							<div>{{item.description}}</div>
						</a>
					</v-card-title>
				</v-flex>
			</v-layout>
		</div>
		<paginate
			:disabled="loading"
			v-model="productPaginationGetters.current_page || 0"
			:page-count="productPaginationGetters.last_page || 0"
			:click-handler="clickCallback"
			:prev-text="'Prev'"
			:next-text="'Next'"
			:container-class="'pagination'"
			:page-class="'page-item'"
		>
		</paginate>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				loading: false,
				categoryDataCheck: false,
				categoryId: 0,
				currentProductPage: 0,
			}
		},
		created() {
			if(this.$route.params.catId){
				this.productDetails(this.$route.params.catId)
			}else{
				this.readProducts()
			}
		},
		watch: {
			'$route.params.catId': function () {
			}
		},
		computed: {
			productGetters() {
				return this.$store.getters.productGetters
			},
			productPaginationGetters: {
				get: function() {
				return this.$store.getters.productPaginationGetters
				},
				set: function() {
				}
			},
			categoryGetters() {
				return this.$store.getters.categoryGetters
			}
		},
		methods: {
			readProducts() {
				this.loading = true
				this.$store.dispatch('ProductData',{
					current_page:this.currentProductPage
				})
				.then(() => {
					this.loading = false
				})
			},
			readCategoryProducts() {
				this.loading = true
				this.$store.dispatch('CategoryProductData', {
					cat_id: this.categoryId,
					current_page: this.currentProductPage
				})
				.then(() => {

					this.loading = false
				})
			},
			productDetails(CatID) {
				this.categoryDataCheck = true
				this.categoryId = CatID
				this.currentProductPage = 0
				this.readCategoryProducts()
			},
			clickCallback (pageNum) {
				this.currentProductPage = pageNum
				if(this.categoryDataCheck){
					this.readCategoryProducts()
				}else{
					this.readProducts()
				}
			}
		}
	}

</script>
<style  scoped>
	.imgClass{
		width:100%;
		height:100px;
	}
	.card-custom{
		border-radius: 2px;
		margin: 10px;
		padding: 10px 0;
		position: relative;
		text-decoration: none;
		-webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		-webkit-box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
		box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
	}
	.v-list__tile {
		height: 120px !important;
	}
	a.list-data {
		color: #555;
		font-family: sans-serif;
		text-decoration: none;
	}
</style>