import axios from 'axios'
axios.defaults.headers.common.Authorization =
  'Bearer ' + localStorage.getItem('access_token')

export default {
  namespaced: true,
  state: {
    profile: {
      name: 'MahardikaKD',
      email: 'dikamahar884@hiuu.com',
      role: {
        name: 'admin',
      },
    },
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage:
      'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  getters: {
    profileName (state) {
      return state.profile.name
    },
    profileAdmin (state) {
      return state.profile.email
    },
    profilAdminName (state) {
      return state.profile.role.name
    },
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    SET_NAME (state, payload) {
      state.profile.name = payload.name
      state.profile.email = payload.email
    },
  },
  actions: {
    setDrawer ({ commit }, payload) {
      commit('SET_DRAWER', payload)
    },
    setName ({ commit }) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/user/me')
          .then(response => {
            if (response.data.meta.status) {
              const payload = response.data.data
              commit('SET_NAME', payload)
              resolve(response)
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
  },
}
