import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors } from "@/utils";

export default {
  state: {
    isAuth: false,
    authErrors: {},
    user: {}
  },

  getters: {
    isAuth: state => state.isAuth,
    authErrors: state => state.authErrors,
    user: state => state.user
  },

  mutations: {
    login: state => {
      state.isAuth = true;
    },
    logout: state => {
      state.isAuth = false;
      state.user = {};
    },
    setAuthErrors: (state, payload) => {
      state.authErrors = payload;
    },
    clearAuthErrors: state => {
      state.authErrors = {};
    },
    setUser: (state, payload) => {
      state.user = { ...state.user, ...payload };
    }
  },

  actions: {
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
  }
}
