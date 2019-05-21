import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import ProductDetails from './components/Products/ProdictDetails'
import CategoryList from './components/Categories/CategoryList'
import About from './components/About.vue'

import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from './components/auth/Register'
import PostAd from './components/post/PostAd'


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
        path: '/post-ad',
        name: 'post-ad',
        component: PostAd,
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
