import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import NotFoundView from '../views/NotFoundView.vue'
import IndexView from '../views/IndexView.vue'
import AccountsView from '../views/AccountsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MovieView from '../views/MovieView.vue'
import HistoryView from '../views/HistoryView.vue'
import SearchView from '../views/SearchView.vue'
import UserInfo from '../components/accounts/UserInfo.vue'
import UserPassword from '../components/accounts/UserPassword.vue'
import BrowsingHistory from '../components/history/BrowsingHistory.vue'
import FindView from '../views/FindView'

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/', component: IndexView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    {
      path: '/accounts',
      component: AccountsView,
      children: [
        {
          path: 'user-info',
          components: {
            accountsView: UserInfo
          }
        },
        {
          path: 'user-password',
          components: {
            accountsView: UserPassword
          }
        }
      ]
    },
    {
      path: '/history',
      component: HistoryView,
      children: [
        {
          path: 'browsing-history',
          components: {
            historyView: BrowsingHistory
          }
        }
      ]
    },
    { path: '/search', component: SearchView },
    { path: '/find', component: FindView },
    { path: '/movie/:id', component: MovieView },
    { path: '/*', component: NotFoundView }
  ]
})
