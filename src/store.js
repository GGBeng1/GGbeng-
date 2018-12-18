import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		//leftbar
		nackName: '',
		showLogin: true
  },
  mutations: {
		changeNackName(state,name) {
			state.nackName = name;
			state.showLogin = false;
		},
		loginOut(state,name) {
			state.nackName = "";
			state.showLogin = true;
		}
  },
  actions: {

  }
})
