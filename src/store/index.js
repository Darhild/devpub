import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: true,
    shouldSendComment: false,
    commentToSend: {},
    isSearch: false,
    search: ""
  },

  getters: {
    authStatus: state => state.isAuth,
    shouldSendComment: state => state.shouldSendComment,
    searchStatus: state => state.isSearch,
    searchQuery: state => state.search
  },

  mutations: {
    logout: state => {
      state.isAuth = false;
    },
    sendComment: state => {
      state.shouldSendComment = true;
    },
    commentIsSend: state => {
      state.shouldSendComment = false;
    },
    setSearchQuery: (state, payload) => {
      state.search = payload;
    },
    clearSearchQuery: state => {
      state.search = "";
    }
  },

  actions: {
    setSearchQuery({ commit }, payload) {
      commit("setSearchQuery", payload);
    }
  },

  modules: {}
});
