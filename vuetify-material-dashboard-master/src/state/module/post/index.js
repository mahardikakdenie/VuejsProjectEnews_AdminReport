import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_DOMAIN
axios.defaults.headers.common.Authorization =
  'Bearer ' + localStorage.getItem('access')
export default {
  namespaced: true,
  state: {
    post: [
      {
        data: {
          id: null,
          title: null,
          status: null,
          views: null,
          created_at: null,
          updated_at: null,
          isLoading: false,
          category: [
            {
              name: null,
            },
          ],
          user: [
            {
              name: null,
            },
          ],
          thumbnail: [
            {
              name_thumbnail: '',
              url: '',
            },
          ],
        },
      },
    ],
  },
  getters: {
    post (state) {
      return state.post
    },
  },
  mutations: {
    GET_POST (state, payload) {
      state.post = payload
    },
    DEL_POST (state, id) {
      const post = state.post.data.filter(x => x.id !== id)
      state.post.data.id = post
    },
  },
  actions: {
    getPost ({ commit }, payload) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')
      return new Promise((resolve, reject) => {
        const params = {
          id: '-id',
          limit: 10,
          page: payload.page,
          q: payload.q,
          // category: 'komunitas',
        }
        axios
          .get('api/post', { params: params })
          .then(response => {
            if (response.data.meta.status) {
              const post = response.data
              commit('GET_POST', post)
              resolve(response)
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    delPost (context, payload) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')
      return new Promise((resolve, reject) => {
        axios
          .delete('api/post/' + payload.id)
          .then(response => {
            if (response.data.meta.status) {
              resolve(response)
              // update
              context.commit('DEL_POST', payload.id)
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    searchPost ({ commit }, payload) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')
      const params = {
        q: payload.q,
      }
      return new Promise((resolve, reject) => {
        axios
          .get('api/post', {
            params: params,
          })
          .then(response => {
            if (response.data.meta.status) {
              const post = response.data.data
              commit('GET_POST', post)
              resolve(response)
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    UploadNews ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/post', {
            title: payload.title,
            category_id: payload.category_id,
            status: payload.status,
            post: payload.post,
            thumbnail_id: payload.thumbnail_id,
          })
          .then(response => {
            if (response.data.meta.status) {
              const post = response.data.data
              commit('GET_POST', post)
              resolve()
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    editShow ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(`api/post/${payload.id}`, {
            title: payload.title,
            category_id: payload.category_id,
            status: payload.status,
            post: payload.post,
            thumbnail_id: payload.thumbnail_id,
          })
          .then(response => {
            if (response.data.meta.status) {
              const post = response.data.data
              commit('GET_POST', post)
              resolve(response)
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    showListNews ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`api/post/${payload.id}`)
          .then(response => {
            if (response.data.meta.status) {
              const post = response.data.data
              commit('GET_POST', post)
              resolve(response)
            }
          })
          .catch(e => {
            reject(e)
          })
      })
    },
    approvePostNews ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`api/post/${payload.id}/approve`)
          .then(response => {
            if (response.data.meta.status) {
              const post = response.data.data
              commit('GET_POST', post)
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
