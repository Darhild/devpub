import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: true
  },

  getters: {
    authStatus: state => state.isAuth
  },

  mutations: {
    logout: state => {
      state.isAuth = false;
    }
  },

  actions: {
    logout({ commit }) {
      commit("logout");
    }
  },

  modules: {}
});
