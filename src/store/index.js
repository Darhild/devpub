import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors } from "@/utils";
import articles from "@/store/articles";
import article from "@/store/article";
import user from "@/store/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {},
    errors: [],
    viewedErrors: {}
  },

  getters: {
    settings: state => state.settings,
    viewedErrors: state => state.viewedErrors
  },

  mutations: {
    pushErrors: (state, payload) => {
      state.errors = { ...state.errors, payload };
    },
    setSettings: (state, payload) => {
      state.settings = payload;
    },
    setViewedErrors: (state, payload) => {
      state.viewedErrors = { ...state.viewedErrors, ...payload };
    },
    clearViewedErrors: state => {
      state.viewedErrors = {};
    }
  },

  actions: {
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
    }
  },

  modules: {
    articles,
    article,
    user
  }
});
