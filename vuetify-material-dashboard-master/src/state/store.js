import Vue from 'vue'
import Vuex from 'vuex'
import auth from './module/auth/index'
import all from './module/all/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: auth,
    all: all,
  },
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage:
      'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {},
})
