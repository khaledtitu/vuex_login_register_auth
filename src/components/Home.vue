<template>
  <v-layout row>
  	<v-flax sm4>

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
		        @click=""
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

  	</v-flax>
    <v-flex xs12 sm8>
      <v-card>


	        <v-list two-line>

	        <template v-for="(item, index) in productGetters">
	           	
	            <v-list-tile
	              @click="productDetails"
	            >
	              <v-list-tile-avatar v-if="item.product_image" v-for="proImage in item.product_image.slice(0,1)" >
	                <img :src="proImage.image.links">
	              </v-list-tile-avatar>

	              <v-list-tile-content>
	                <v-list-tile-title> {{item.name}}</v-list-tile-title>
	                <v-list-tile-sub-title >{{item.description}}</v-list-tile-sub-title>
	              </v-list-tile-content>

	            </v-list-tile>
	            <v-divider
	              v-if="divider"
	              :inset="inset"
	              :key="index"
	            ></v-divider>

	        </template>

	        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {

    	return {
         divider:true,
         inset:true
    	}

    },
    created(){

     this.readProducts()
     this.readCategories()

    },
    computed: {

        productGetters() {
          return this.$store.getters.productGetters
        },
        categoryGetters() {
          return this.$store.getters.categoryGetters
        }

    },
    methods:{

	     readProducts(){
	        this.$store.dispatch('ProductData')
	        .then(response => {
	           this.loading = false

	        })

	     },
	     readCategories(){
	        this.$store.dispatch('categoryData')
	        .then(response => {
	           this.loading = false

	        })

	     },
	     productDetails(){
	     	alert();
	     }

    }


    
  }
</script>
