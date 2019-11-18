import Store from '../../utils/store.js'
import userApi from '../../api/userApi'

const state = {
  login: Store.fetch('login') != null,
  token: Store.fetch('token'),
  user_id: Store.fetch('user_id')
}

const mutations = {
  LOGIN(state, token) {
    state.login = true
    state.token = token
    Store.save('login', state.login)
    Store.save('token', state.token)
  },
  SET_ID: (state, user_id) => {
    state.user_id = user_id
    Store.save('user_id', state.user_id)
  },
  LOGOUT(state) {
    state.login = false
    state.token = null
    state.user_id = null
    Store.remove('login')
    Store.remove('token')
    Store.remove('user_id')
  }
}

// actions
const actions = {
  doLogin({ commit }, user) {
    return new Promise((resolve, reject) => {
      userApi.login(user).then(response => {
        if (response.data.code !== '200') {
          throw new Error(response.data.message)
        }
        commit('LOGIN', response.data.data.token)
        commit('SET_ID', response.data.data.user_id)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doLogout({ commit }, token) {
    userApi.logout(token).then(() => {
      commit('LOGOUT')
    })
  }
}

export default {
  state,
  mutations,
  actions
}
