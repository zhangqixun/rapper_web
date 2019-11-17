import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
Vue.use(MuseUI)
Vue.use(ElementUI)

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

const app = new Vue(Vue.util.extend({
  router,
  store
}, App))

app.$mount('#app')
