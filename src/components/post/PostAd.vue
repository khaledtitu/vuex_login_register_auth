<template>
	<v-layout wrap row>
		<v-flex xs12 sm12 md6 pa-3>
			<v-card class="pa-3">
				<h2 class="title pb-3 pa-1">Add Category</h2>
                <v-text-field
                    v-model="catName"
                    label="Zip code"
                    required
                ></v-text-field>
                <v-btn color="success" class="my-5">Save</v-btn>
			</v-card>
		</v-flex>
		<v-flex xs12 sm12 md6 pa-3>
			<v-card class="pa-3">
				<h2 class="title pb-3 pa-1">Add Product</h2>
                <v-text-field
                    v-model="productName"
                    label="Zip code"
                    required
                ></v-text-field>
                <v-textarea
                    pb-1
                    name="place"
                    label="Product Details"
                    value=""
                    placeholder="Product Details"
                    rows="8"
                ></v-textarea>

                <v-text-field
                    v-model="price"
                    label="Price"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="stock"
                    label="stock"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="discount"
                    label="discount"
                    required
                ></v-text-field>
                     <v-select
                        v-model="categoryId"
                        :items="items"
                        label="Category Name"
                        required
                    ></v-select>
                <v-btn color="success" class="my-5">Save</v-btn>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
  export default {
    data() { 
        return {
            catName: '',
            productName: '',
            city: '',
            price: '',
            stock: '',
            discount: '',
            categoryId: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
        }
    },
  }
</script>
