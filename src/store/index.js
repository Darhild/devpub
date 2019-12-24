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
    authErrors: {},
    settings: {},
    tagSelected: "",
    errors: []
  },

  getters: {
    isAuth: state => state.isAuth,
    authErrors: state => state.authErrors,
    user: state => state.user,
    settings: state => state.settings,
    shouldSendComment: state => state.shouldSendComment,
    searchStatus: state => state.isSearch,
    searchQuery: state => state.search,
    tagSelected: state => state.tagSelected
  },

  mutations: {
    pushErrors: (state, payload) => {
      state.errors = { ...state.errors, payload };
    },
    login: state => {
      state.isAuth = true;
    },
    setUser: (state, payload) => {
      state.user = payload;
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
    setSelectedTag: (state, payload) => {
      state.tagSelected = payload;
    },
    clearSelectedTag: state => {
      state.tagSelected = "";
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

    async getUser({ commit }) {
      try {
        const resp = await axios.get(`${SERVER_URL}/api/auth/check`);

        if (resp.data.result === true) {
          commit("setUser", resp.data.user);
          commit("login");
        }
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async saveUser({ commit }, payload) {
      try {
        const resp = await axios.post(`${SERVER_URL}/api/profile/my`, payload);

        if (resp.data.result === true) {
          commit("setUser", payload);
          commit("clearAuthErrors");
        } else commit("setAuthErrors", resp.data.errors);
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async register({ commit }, { email, password, captcha, secret }) {
      try {
        const resp = await axios.post(`${SERVER_URL}/api/auth/register`, {
          e_mail: email,
          password,
          captcha,
          captcha_secret: secret
        });

        if (resp.data.result === false) {
          commit("setAuthErrors", resp.data.errors);
        } else commit("clearAuthErrors");
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async getSettings({ commit }) {
      try {
        const resp = await axios.get(`${SERVER_URL}/api/settings`);
        commit("setSettings", resp.data);
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async setSettings({ commit }, payload) {
      try {
        await axios.put(`${SERVER_URL}/api/settings`, payload);
        commit("setSettings", payload);
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async login({ commit }, { email, password }) {
      commit("clearAuthErrors");
      try {
        const resp = await axios.post(`${SERVER_URL}/api/auth/login`, {
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
        commit("pushErrors", e);
      }
    },

    async logout({ commit }) {
      try {
        const resp = await axios.get(`${SERVER_URL}/api/auth/logout`);
        if (resp.data.result === true) commit("logout");
      } catch (e) {
        commit("pushErrors", e);
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
        } else commit("clearAuthErrors");
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async changePassword({ commit }, { code, password, captcha, secret }) {
      try {
        const resp = await axios.post(`${SERVER_URL}/api/auth/password`, {
          code,
          password,
          captcha,
          captcha_secret: secret
        });

        if (resp.data.result === false) {
          commit("setAuthErrors", resp.data.errors);
        } else commit("clearAuthErrors");
      } catch (e) {
        commit("pushErrors", e);
      }
    }
  },

  modules: {}
});
