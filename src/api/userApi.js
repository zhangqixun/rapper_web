import http from '../utils/http'

export default {
  login(data) {
    return http({
      method: 'post',
      url: '/api/login',
      data: data,
      withCredentials: true
    }
    )
  },
  register(data) {
    return http({
      method: 'post',
      url: '/api/register',
      data: data,
      withCredentials: true
    }
    )
  },
  logout(data) {
    return http({
      method: 'post',
      url: '/api/logout',
      data: data,
      withCredentials: true
    }
    )
  },
  getProfile(data) {
    return http({
      method: 'post',
      url: 'api/userquery',
      headers: { 'showLoading': false },
      data: data,
      withCredentials: true
    }
    )
  },
  updateProfile(data) {
    return http({
      method: 'post',
      url: '/api/editor',
      data: data,
      headers: { 'showLoading': false },
      withCredentials: true
    }
    )
  },
  updatePassword(data) {
    return http({
      method: 'post',
      url: '/api/passwdmodi',
      data: data,
      withCredentials: true
    })
  },
  insertRecord(data) {
    return http({
      method: 'post',
      url: '/api/user/footprint/new',
      data: data,
      headers: { 'showLoading': false },
      withCredentials: true
    })
  },
  getRecord(data) {
    return http({
      method: 'post',
      url: '/api/user/footprints',
      data: data,
      headers: { 'showLoading': false },
      withCredentials: true
    })
  }
}
