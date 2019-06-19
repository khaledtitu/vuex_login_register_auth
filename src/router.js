import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Pages/Home.vue'
import ProductDetails from './components/Products/ProdictDetails'
import CategoryList from './components/Categories/CategoryList'
import About from './components/Pages/About.vue'

import Login from './components/Auth/Login'
import Logout from './components/Auth/Logout'
import Register from './components/Auth/Register'
import Dashboard from './components/Dashboard/Pages/Dashboard'
import AddProduct from './components/Dashboard/Pages/AddProduct'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/prouct-details/:productId',
        name: 'prouct-details',
        component: ProductDetails
    },
    {
        path: '/category-list/:catId',
        name: 'category-list',
        component: CategoryList
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        props: true,
        meta: {
          requiresVisitor: true,
      }
    },
    {
        path: '/Dashboard/home',
        name: 'dashboard',
        component: Dashboard,
        props: true,
        meta: {
          requiresAuth: true,
          name: 'dashboard'
        }
    },
    {
        path: '/Dashboard/add-product',
        name: 'addProduct',
        component: AddProduct,
        props: true,
        meta: {
          requiresAuth: true,
          name: 'dashboard'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requiresVisitor: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
  ]
})
