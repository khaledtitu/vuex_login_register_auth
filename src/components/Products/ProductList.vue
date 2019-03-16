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
						<div>
							<h3 class="headline ">{{item.name}}</h3>
							<div>{{item.description}}</div>
						</div>
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
				divider: true,
				inset: true,
				loading: false,
				categoryDataCheck: false,
				categoryId: 0,
				currentProductPage: 0,
			}
		},
		created() {
			this.readProducts()
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
		methods:{
			readProducts(){
				this.loading = true
				this.$store.dispatch('ProductData',{
					current_page:this.currentProductPage
				})
				.then(() => {
					this.loading = false
				})
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