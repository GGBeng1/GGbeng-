import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nackName: '',
    showLogin: true
  },
  mutations: {
    changeNackName (state, name) {
      state.nackName = name;
      state.showLogin = false;
    },
    loginOut (state) {
      state.nackName = "";
      state.showLogin = true;
    }
  },
  actions: {

  }
})
