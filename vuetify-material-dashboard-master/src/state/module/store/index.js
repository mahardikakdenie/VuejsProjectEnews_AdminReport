export default {
  state: {
    barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
    barImage:
      'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg',
    drawer: null,
    delta: undefined,
    contents: '',
  },
  getters: {
    delta: ({ delta }) => delta,
    contents: ({ contents }) => contents,
  },
  mutations: {
    SET_BAR_IMAGE (state, payload) {
      state.barImage = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
    setDelta (state, payload) {
      state.delta = payload
    },
    setContent (state, payload) {
      state.contents = payload
    },
  },
  actions: {},
}
