import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth'
import all from './module/all'
import post from './module/post'
import category from './module/category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    all: all,
    post: post,
    category: category,
  },
  state: {
    drawer: null,
  },
  mutations: {
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
})
