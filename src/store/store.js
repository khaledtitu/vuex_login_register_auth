import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://localhost:8000/api'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: [],
    productAll: [],
    categoryAll: [],
    imageAll: [],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    productGetters(state){
      return state.productAll
      
    },
    categoryGetters(state){
      return state.categoryAll
    }
  },
  mutations: {
    
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
    categoryData(state, categoryAll) {
      state.categoryAll = categoryAll
    },
    ProductData(state, productAll) {
      state.productAll = productAll
    },
    ProductImageInsert(state, image){

      state.imageAll.push({
         id: image.id,
         name: image.name,
      })
    },
  },
  actions: {
    retrieveName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
          repeat_password: data.repeat_password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
               console.log(response);
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    ProductData(context,credentials ){

      return new Promise((resolve, reject) => {
        axios.get('/products')
          .then(response => {
            context.commit('ProductData', response.data.data)
            console.log(response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

    },
    ProductImageInsert(context, credentials){
     return new Promise((resolve, reject) => {
        axios.post('/images',
          credentials,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
           })
          .then(response => {

            context.commit('ProductImageInsert', response.data.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })

    },
    categoryData(context,credentials ){
      return new Promise((resolve, reject) => {
        axios.get('/product/categories')
          .then(response => {
            context.commit('categoryData', response.data.data)
            console.log(response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })

    },

  }
})
