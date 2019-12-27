import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors } from "@/utils";

export default {
  state: {
    articlesAreLoading: false,
    articlesAreErrored: false,
    articles: [],
    articlesCount: 0,
    isSearch: false,
    search: "",
    tags: [],
    tagSelected: ""
  },

  getters: {
    articlesAreLoading: state => state.articlesAreLoading,
    articlesAreErrored: state => state.articlesAreErrored,
    articles: state => state.articles,
    articlesCount: state => state.articlesCount,
    searchStatus: state => state.isSearch,
    searchQuery: state => state.search,
    tags: state => state.tags,
    tagSelected: state => state.tagSelected
  },

  mutations: {
    articlesAreLoading: state => {
      state.articlesAreLoading = true;
    },
    articlesAreLoaded: state => {
      state.articlesAreLoading = false;
    },
    articlesAreErrored: state => {
      state.articlesAreErrored = true;
    },
    setArticles: (state, payload) => {
      state.articles.push(...payload);
    },
    clearArticles: state => {
      state.articles = [];
    },
    setArticlesCount: (state, payload) => {
      state.articlesCount = payload;
    },
    clearArticlesCount: state => {
      state.articlesCount = 0;
    },
    setSearchQuery: (state, payload) => {
      state.search = payload;
    },
    clearSearchQuery: state => {
      state.search = "";
    },
    setTags: (state, payload) => {
      state.tags = payload;
    },
    clearTags: state => {
      state.tags = [];
    },
    setSelectedTag: (state, payload) => {
      state.tagSelected = payload;
    },
    clearSelectedTag: state => {
      state.tagSelected = "";
    }
  },

  actions: {
    async getArticles({ commit }, url) {
      commit("articlesAreLoading");
      try {
        const res = await axios.get(`${SERVER_URL}/api/post${url}`);
        if (!handleResponseErrors(res)) {
          commit("setArticles", res.data.posts);
          commit("setArticlesCount", res.data.count);
        }
      } catch (e) {
        commit("pushErrors", e);
        commit("articlesAreErrored");
      } finally {
        commit("articlesAreLoaded");
      }
    },

    async getTags({ commit }) {
      try {
        const res = await axios.get(`${SERVER_URL}/api/tag`);
        if (!handleResponseErrors(res)) {
          commit("setTags", res.data.tags);
        }
      } catch (e) {
        commit("pushErrors", e);
      }
    }
  }
}
