import axios from 'axios'
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
          caegory: [
            {
              name: '',
            },
          ],
          user: [
            {
              name: '',
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
      const post = state.post.data.filter(x => x.id === id)
      state.post.data.id = post
    },
  },
  actions: {
    getPost ({ commit, state }) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/post')
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
    delPost (context, payload) {
      axios.defaults.headers.common.Authorization =
        'Bearer ' + localStorage.getItem('access')
      return new Promise((resolve, reject) => {
        axios
          .delete('http://127.0.0.1:8000/api/post/' + payload.id)
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
          .get('http://127.0.0.1:8000/api/post', {
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
          .post('http://127.0.0.1:8000/api/post', {
            title: payload.title,
            category_id: payload.category_id,
            status: payload.status,
            post: payload.post,
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
          .put(`http://127.0.0.1:8000/api/post/${payload.id}`, {
            title: payload.title,
            category_id: payload.category_id,
            status: payload.status,
            post: payload.post,
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
  },
}
