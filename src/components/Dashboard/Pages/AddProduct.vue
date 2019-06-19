<template>
    <v-layout wrap row>
        <v-flex xs12 sm12 md8 px-3>
            <v-card class="pa-3">
                <h2 class="title pb-3 pa-1">Add Product</h2>
                    <div v-if="serverErrors">
                        <div v-for="(value, key) in serverErrors" :key="key">
                        <v-alert
                            v-if="value.name"
                            :value="true"
                            type="error"
                        >

                            {{ value.name[0] }}
                         
                        </v-alert>
                         <v-alert
                            v-if="value.discount"
                            :value="true"
                            type="error"
                        >

                            {{ value.discount[0] }}
                         
                        </v-alert>
                        <v-alert 
                            v-if="value.description"
                            :value="true"
                            type="error"
                        >

                            {{ value.description[0] }}
                         
                        </v-alert>                        
                        <v-alert 
                            v-if="value.price"
                            :value="true"
                            type="error"
                        >

                            {{ value.price[0] }}
                         
                        </v-alert>
                        <v-alert 
                            v-if="value.stock"
                            :value="true"
                            type="error"
                        >

                            {{ value.stock[0] }}
                         }
                        </v-alert>
                        </div> 
                    </div>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                            v-model="productName"
                            label="Product name"
                            :rules="nameRules"
                            required
                        ></v-text-field>
                        <v-textarea
                            pb-1
                            v-model="productDetails"
                            label="Product Details"
                            value=""
                            placeholder="Product Details"
                            :rules="nameRules"
                            rows="8"
                        ></v-textarea>

                        <v-text-field
                            v-model="price"
                            label="Price"
                            :rules="nameRules"
                            type="number"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="stock"
                            label="stock"
                            :rules="nameRules"
                            type="number"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="discount"
                            label="discount"
                            type="number"
                            :rules="nameRules"
                            required
                        ></v-text-field>
                        <v-select
                            v-model="categoryId"
                            :items="categoryItems"
                            :rules="[v => !!v || 'Category Name is required']"
                            item-value='id'
                            label="Category Name"
                            item-text="name"
                            required
                        ></v-select>
                        <ImageUpload></ImageUpload>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="my-5"
                            @click="validate"
                        >
                            Save
                        </v-btn>
                    </v-form>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import axios from 'axios'
  import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
  import ImageUpload from '../ImageUpload/ImageUpload.vue'
  export default {
    data() { 
        return {
            disabled: false,
            valid: true,
            serverErrors: [],
            catName: '',
            productName: '',
            productDetails: '',
            price: '',
            stock: '',
            discount: '',
            categoryId: null,
            categoryItems: [],
            nameRules: [
                v => !!v || 'This Field is required',
            ],
        }
    },
    components: {
        ImageUpload
    },
    created() {
        this.getCategory()
    },
    methods: {
        validate () {
            if (this.$refs.form.validate()) {
                this.snackbar = true
                this.createProduct()
            }
        },
        createProduct(){
            let token_name= this.$store.state.token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token_name
            axios.post('/products', {
                'name': this.productName,
                'description': this.productDetails,
                'user_id': 5000,
                'category_id': this.categoryId,
                'price': this.price,
                'stock': this.stock,
                'discount': this.discount,
            })
            .then(()=> {
               // console.log(data);
                this.$toast.success({
                    title: 'success',
                    message: 'Created successfully'
                })
                this.resetForm()
            })
            .catch((error)=> {
                this.serverErrors = Object.values(error.response.data)
            })
        },
        getCategory(){
            axios.get('/product/categories')
            .then((data)=> {
                this.categoryItems = data.data.data
            })
            .catch(()=> {
                // console.log(error);
            })
        },
        resetForm(){
            this.productName=''
            this.productDetails=''
            this.price=''
            this.stock=''
            this.discount=''
            this.categoryId=null
            this.$refs.form.resetValidation()
        }
    }
  }
</script>
