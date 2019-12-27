import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors } from "@/utils";

export default {
  state: {
    articles: [],
    articlesCount: 0,
    article: {},
    isSearch: false,
    search: "",
    tags: [],
    articleTags: [],
    tagSelected: ""
  },

  getters: {
    articles: state => state.articles,
    articlesCount: state => state.articlesCount,
    article: state => state.article,
    searchStatus: state => state.isSearch,
    searchQuery: state => state.search,
    tags: state => state.tags,
    selectedTag: state => state.selected.tag
  },

  mutations: {
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
    }
  },

  actions: {
    async getArticles({ commit }, url) {
      try {
        const res = await axios.get(`${SERVER_URL}/${url}`);
        if (!handleResponseErrors(res)) {
          commit("setArticles", res.data.posts);
          commit("setArticlesCount", res.data.count);
        }
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    setSearchQuery({ commit }, payload) {
      commit("setSearchQuery", payload);
    }
  }
}
