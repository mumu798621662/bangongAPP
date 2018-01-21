// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './router/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// require('@/assets/css/bootstrap.css')


import local from '@/plugins/local'

Vue.use(ElementUI)
Vue.use(local)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App></App>',
  components: { App }
})
