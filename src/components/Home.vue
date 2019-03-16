<template>
  <v-layout row>
    <Category></Category>
    <v-flex xs12 sm8>
      <v-layout>
        <v-flex xs12> 
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
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Category from './Categories/Category'
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
  components: {
    Category
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

<style  scoped>
  .imgClass{
    width:100%;
    height:100px;
  }
  .card-custom{
    border-radius: 2px;
    margin: 10px 0;
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
</style>
<style>
  .pagination li {
    display: inline-block;
  }
  .pagination {
    display: inline-block;
    padding-left: 0;
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
