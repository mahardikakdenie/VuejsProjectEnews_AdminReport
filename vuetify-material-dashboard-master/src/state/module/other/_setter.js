import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_DOMAIN
axios.defaults.headers.common.Authorization =
  'Bearer ' + localStorage.getItem('access')
const state = () => ({
  categories: [
    {
      meta: {},
      data: {},
    },
  ],
})
const getters = {
  categories: state => {
    return state.categories
  },
}
const mutations = {
  GET_CATEGORIES: (state, payload) => {
    state.categories = payload
  },
}
const actions = {
  getCategories: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      const params = {
        q: payload.q,
      }
      axios
        .get('api/category', { params: params })
        .then(response => {
          const data = response.data.data
          commit('GET_CATEGORIES', data)
          resolve(response)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
