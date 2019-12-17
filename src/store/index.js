import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: true,
    shouldSendComment: false,
    commentToSend: {}
  },

  getters: {
    authStatus: state => state.isAuth,
    shouldSendComment: state => state.shouldSendComment
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
    }
  },

  actions: {},

  modules: {}
});
