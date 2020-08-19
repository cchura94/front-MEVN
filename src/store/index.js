import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { //data
    url: "//localhost:3000",
    numero: 10
  },
  mutations: { // 
    incrementar(state) {
      return state.numero++;
    }
  },
  actions: { //methods
  },
  modules: {}
})