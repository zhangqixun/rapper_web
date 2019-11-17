import * as types from '../mutation-types'
import Store from '../../utils/store.js'
import userApi from '../../api/userApi'

const state = {
  login: false,
  token: Store.fetch('token')
}

const mutations = {
  [types.LOGIN](state, token) {
    state.login = true
    state.token = token
    Store.save('token', state)
  },
  [types.LOGOUT](state) {
    state.login = false
    state.token = ''
    Store.remove('token')
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
        commit(types.LOGIN, response.data.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  doLogout({ commit }, token) {
    userApi.logout(token).then(() => {
      commit(types.LOGOUT)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
