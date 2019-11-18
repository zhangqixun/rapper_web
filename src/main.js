import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(MuseUI)
Vue.use(ElementUI)

sync(store, router)

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

app.$mount('#app')
