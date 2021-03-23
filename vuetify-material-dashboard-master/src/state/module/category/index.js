import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_DOMAIN
axios.defaults.headers.common.Authorization =
  'Bearer ' + localStorage.getItem('access')

export default {
  namespaced: true,
  state: {
    category: {
      meta: {},
      data: [
        {
          id: 0,
          name: 'umum',
          status: 'publish',
          user: {},
          post: {},
        },
      ],
    },
  },
  getters: {
    categoryState (state) {
      return state.category
    },
  },
  mutations: {
    GET_CATEGORY (state, category) {
      state.category = category
    },
  },
  actions: {
    getCategory ({ commit }) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')

      return new Promise((resolve, reject) => {
        axios
          .get('api/category')
          .then(response => {
            if (response.data.meta.status) {
              const category = response.data
              commit('GET_CATEGORY', category)
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
