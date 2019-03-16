<template>
    <v-container>
        <v-layout row>
              <v-flex sm3 md3>
                  <Category></Category>
              </v-flex>
              <v-flex xs12 sm9 md9>
                  <ProductList></ProductList>
              </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Category from './Category'
import ProductList from './../Products/ProductList'
export default {
    data () {
        return {
        }
    },
    components: {
        Category,
        ProductList
    }
}

</script>