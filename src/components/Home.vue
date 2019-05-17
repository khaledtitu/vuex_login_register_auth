<template>
    <v-container>
        <v-layout wrap row>
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
import Category from './Categories/Category'
import ProductList from './Products/ProductList'
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
<style>
  .pagination li {
      display: inline-block;
  }
  .pagination {
      display: inline-block;
      padding-left: 10px;
      margin: 20px 0;
      border-radius: 4px;
  }

  .pagination > .active > a, .pagination > .active > span, .pagination > .active > a:hover, .pagination > .active > span:hover, .pagination > .active > a:focus, .pagination > .active > span:focus {
      z-index: 2;
      color: #fff;
      cursor: default;
      background-color: #337ab7;
      border-color: #337ab7;
  }
  .pagination > li > a, .pagination > li > span {
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #337ab7;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;
  }

  .pagination > li:last-child > a, .pagination > li:last-child > span {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
  }
</style>
