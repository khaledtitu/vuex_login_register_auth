import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import Paginate from 'vuejs-paginate'

import VeeValidate from 'vee-validate'
import CxltToastr from 'cxlt-vue2-toastr'

Vue.config.productionTip = false

const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}

Vue.use(VeeValidate)
Vue.use(CxltToastr, toastrConfigs)

Vue.component('paginate', Paginate)




router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'post-ad',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
