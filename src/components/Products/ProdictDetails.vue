<template>
	<v-container>
		<v-layout row>
				<v-flex xs12 sm9 md9>
					<v-container fluid grid-list-sm>
						<div class="title mb-3 text-md-center">
							Products Details 
						</div>
						<v-divider></v-divider>
						<div class="subheading mb-1 mt-3"> <b>Product Name: </b> {{productDetails.name}}</div>
						<div class="subheading mb-3"><b>Product Description: </b>{{productDetails.description}}</div>
						<v-layout>
						<v-flex xs12 sm6 md6>
							<div class="subheading mb-1"><b>Product Price: </b>${{productDetails.totalPrice}}</div>
							<div class="subheading mb-1"><b>Product Stock: </b>{{productDetails.stock}}</div>
						</v-flex>
						<v-flex xs12 sm6 md6>
							<div class="subheading mb-1"><b>Product Discount: </b>{{productDetails.discount}}%</div>
							<div class="subheading mb-3"><b>Product Rating: </b>5 / {{productDetails.rating}}</div>
						</v-flex>
					</v-layout>
						<v-layout>
							<v-flex xs6 sm4 v-for="pro_img in productDetails.product_image" :key="pro_img.id">
								<v-img
									:src="pro_img.image.links"
									gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
								></v-img>
							</v-flex>

						</v-layout>
					</v-container>
				</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
			productDetails: []
        }
    },
	created() {
		if(this.$route.params.productId){
			this.getProductsDetails()
		}
	},
	methods: {
		getProductsDetails() {
			axios.get('/products/' +this.$route.params.productId)
			.then((data) => {
				this.productDetails = data.data.data

			})
			.catch(() => {
				
			})
		}
		
	}
}

</script>