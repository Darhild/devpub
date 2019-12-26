import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors } from "@/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    user: {},
    shouldSendComment: false,
    commentToSend: {},
    isSearch: false,
    search: "",
    authErrors: {},
    settings: {},
    errors: [],
    viewedErrors: {}
  },

  getters: {
    isAuth: state => state.isAuth,
    authErrors: state => state.authErrors,
    user: state => state.user,
    settings: state => state.settings,
    shouldSendComment: state => state.shouldSendComment,
    searchStatus: state => state.isSearch,
    searchQuery: state => state.search,
    viewedErrors: state => state.viewedErrors
  },

  mutations: {
    pushErrors: (state, payload) => {
      state.errors = { ...state.errors, payload };
    },
    login: state => {
      state.isAuth = true;
    },
    setUser: (state, payload) => {
      state.user = { ...state.user, ...payload };
    },
    logout: state => {
      state.isAuth = false;
    },
    setSettings: (state, payload) => {
      state.settings = payload;
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
    },
    setViewedErrors: (state, payload) => {
      state.viewedErrors = { ...state.viewedErrors, ...payload };
    },
    clearViewedErrors: state => {
      state.viewedErrors = {};
    }
  },

  actions: {
    setSearchQuery({ commit }, payload) {
      commit("setSearchQuery", payload);
    },

    async getUser({ commit }) {
      try {
        const res = await axios.get(`${SERVER_URL}/api/auth/check`);
        handleResponseErrors(res);

        if (res.data.result === true) {
          commit("setUser", res.data.user);
          commit("login");
        }
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async saveUser({ commit }, payload) {
      try {
        const res = await axios.post(`${SERVER_URL}/api/profile/my`, payload);
        handleResponseErrors(res);

        if (res.data.result === true) {
          commit("setUser", payload);
          commit("clearAuthErrors");
        } else commit("setAuthErrors", res.data.errors);
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async register({ commit }, { email, password, captcha, secret }) {
      try {
        const res = await axios.post(`${SERVER_URL}/api/auth/register`, {
          e_mail: email,
          password,
          captcha,
          captcha_secret: secret
        });

        handleResponseErrors(res);

        if (res.data.result === false) {
          commit("setAuthErrors", res.data.errors);
        } else commit("clearAuthErrors");
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async getSettings({ commit }) {
      try {
        const res = await axios.get(`${SERVER_URL}/api/settings`);
        if (!handleResponseErrors(res)) commit("setSettings", res.data);
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async setSettings({ commit }, payload) {
      try {
        const res = await axios.put(`${SERVER_URL}/api/settings`, payload);
        if (!handleResponseErrors(res)) commit("setSettings", payload);
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async login({ commit }, { email, password }) {
      commit("clearAuthErrors");
      try {
        const res = await axios.post(`${SERVER_URL}/api/auth/login`, {
          e_mail: email,
          password
        });
        if (!handleResponseErrors(res))
          if (res.data.result === false) {
            commit("setAuthErrors", {
              login: "Логин и/или пароль введен(ы) неверно"
            });
          } else {
            commit("clearAuthErrors");
            commit("login");
            commit("setUser", res.data.user);
          }
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async logout({ commit }) {
      try {
        const res = await axios.get(`${SERVER_URL}/api/auth/logout`);
        handleResponseErrors(res);
        if (res.data.result === true) commit("logout");
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async restorePassword({ commit }, { email }) {
      try {
        const res = await axios.post(`${SERVER_URL}/api/auth/restore`, {
          email
        });

        handleResponseErrors(res);

        if (res.data.result === false) {
          commit("setAuthErrors", {
            restoreError: "Логин не найден"
          });
        } else commit("clearAuthErrors");
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async changePassword({ commit }, { code, password, captcha, secret }) {
      try {
        const res = await axios.post(`${SERVER_URL}/api/auth/password`, {
          code,
          password,
          captcha,
          captcha_secret: secret
        });

        handleResponseErrors(res);

        if (res.data.result === false) {
          commit("setAuthErrors", res.data.errors);
        } else commit("clearAuthErrors");
      } catch (e) {
        commit("pushErrors", e);
      }
    }
  },

  modules: {}
});
