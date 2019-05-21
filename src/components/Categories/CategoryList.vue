<template>
    <v-container>
        <v-layout row>
              <v-flex xs12 sm6 md12>
                  <ProductList></ProductList>
              </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProductList from './../Products/ProductList'
export default {
    data () {
        return {
        }
    },
    components: {
        ProductList
    }
}

</script>