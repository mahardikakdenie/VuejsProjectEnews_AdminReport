import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_DOMAIN
axios.defaults.headers.common.Authorization =
  'Bearer ' + localStorage.getItem('access')
export default {
  namespaced: true,
  state: {
    comments: [
      {
        meta: {},
        data: {},
      },
    ],
  },
  getters: {
    comment: state => {
      return state.comments
    },
  },
  mutations: {
    GET_COMMENTS: (state, payload) => {
      state.comments = payload
    },
  },
  actions: {
    getComments: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        const params = {
          q: payload.q,
        }
        axios
          .get('api/response/frontend', { params: params })
          .then(response => {
            const data = response.data.data
            commit('GET_COMMENTS', data)
            resolve(response)
          })
          .catch(e => {
            reject(e)
          })
      })
    },
  },
}
