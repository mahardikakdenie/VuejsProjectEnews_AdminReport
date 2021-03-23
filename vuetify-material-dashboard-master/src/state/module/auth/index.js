import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_DOMAIN
export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('access') || null,
    user: null,
  },
  getters: {
    loggedIn (state) {
      return state.token !== null
    },
    token (state) {
      return state.token
    },
  },
  mutations: {
    SET_TKN (state, token) {
      state.token = token
    },
    DESTR_TKN (state) {
      state.token = null
      state.user = null
    },
  },
  actions: {
    getToken ({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/login', {
            email: credentials.email,
            password: credentials.password,
            device_name: 'mobile',
          })
          .then(response => {
            if (response.data.meta.status) {
              const token = response.data.access_token
              localStorage.setItem('access', token)
              commit('SET_TKN', token)
              resolve(response)
            } else {
              reject(response)
            }
          })
      })
    },
    destroyToken ({ commit }, context) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')
      // if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios
          .get('api/logout')
          .then(response => {
            localStorage.removeItem('access')
            localStorage.removeItem('user')
            console.log(response)
            commit('DESTR_TKN')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access')
            localStorage.removeItem('user')
            commit('DESTR_TKN')
            reject(error)
          })
      })
      // }
    },
  },
}
