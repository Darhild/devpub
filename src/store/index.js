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
    years: [],
    settings: {},
    errors: [],
    viewedErrors: {}
  },

  getters: {
    years: state => state.years,
    settings: state => state.settings,
    errors: state => state.errors,
    viewedErrors: state => state.viewedErrors
  },

  mutations: {
    setYears: (state, payload) => {
      state.years = payload;
    },
    setSettings: (state, payload) => {
      state.settings = payload;
    },
    setViewedErrors: (state, payload) => {
      state.viewedErrors = { ...state.viewedErrors, ...payload };
    },
    clearViewedErrors: state => {
      state.viewedErrors = {};
    },
    pushErrors: (state, payload) => {
      state.errors = { ...state.errors, payload };
    }
  },

  actions: {
    async getYears({ commit }) {
      try {
        const res = await axios.get(`${SERVER_URL}/api/calendar`);
        if (!handleResponseErrors(res)) commit("setYears", res.data.years);
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
    }
  },

  modules: {
    articles,
    article,
    user
  }
});
