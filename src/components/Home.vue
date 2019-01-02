<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
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

    },
    computed: {

        productGetters() {
          return this.$store.getters.productGetters
        }

    },
    methods:{

	     readProducts(){
	        this.$store.dispatch('ProductData')
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
