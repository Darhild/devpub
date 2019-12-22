import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { SERVER_URL } from "./../env";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    user: {},
    shouldSendComment: false,
    commentToSend: {},
    isSearch: false,
    search: "",
    authErrors: {}
  },

  getters: {
    isAuth: state => state.isAuth,
    authErrors: state => state.authErrors,
    user: state => state.user,
    shouldSendComment: state => state.shouldSendComment,
    searchStatus: state => state.isSearch,
    searchQuery: state => state.search
  },

  mutations: {
    login: state => {
      state.isAuth = true;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
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
    },
    setAuthErrors: (state, payload) => {
      state.authErrors = payload;
    },
    clearAuthErrors: state => {
      state.authErrors = {};
    }
  },

  actions: {
    setSearchQuery({ commit }, payload) {
      commit("setSearchQuery", payload);
    },

    async register({ commit }, { email, password, captcha, captchaSecret }) {
      try {
        const resp = await axios.post(`${SERVER_URL}/api/auth/register`, {
          e_mail: email,
          password,
          captcha,
          captcha_secret: captchaSecret
        });

        if (resp.data.result === false) {
          commit("setAuthErrors", resp.data.errors);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async login({ commit }, { email, password }) {
      try {
        const resp = await axios.post(`${SERVER_URL}/api/auth/auth`, {
          e_mail: email,
          password
        });

        if (resp.data.result === false) {
          commit("setAuthErrors", {
            login: "Логин и/или пароль введен(ы) неверно"
          });
        } else {
          commit("clearAuthErrors");
          commit("login");
          commit("setUser", resp.data.user);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async logout({ commit }) {
      try {
        const resp = await axios.get(`${SERVER_URL}/api/auth/logout`);
        if (resp.data.result === true) commit("logout");
      } catch (e) {
        console.log(e);
      }
    },

    async restorePassword({ commit }, { email }) {
      try {
        const resp = await axios.post(`${SERVER_URL}/api/auth/restore`, {
          email
        });

        if (resp.data.result === false) {
          commit("setAuthErrors", {
            restoreError: "Логин не найден"
          });
        }
      } catch (e) {
        console.log(e);
        commit("setAuthErrors", {
          restoreError: "Логин не найден"
        });
      }
    }
  },

  modules: {}
});
