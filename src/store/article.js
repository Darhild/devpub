import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors, formatDateTime } from "@/utils";

export default {
  state: {
    articleIsLoading: false,
    articleIsErrored: false,
    article: null,
    articleTags: [],
    shouldGetEditorText: false,
    editorContent: "",
    nameToReply: "",
    commentParent: ""
  },

  getters: {
    articleIsLoading: state => state.articleIsLoading,
    articleIsErrored: state => state.articleIsErrored,
    article: state => state.article,
    editorContent: state => state.editorContent,
    shouldGetEditorText: state => state.shouldGetEditorText,
    nameToReply: state => state.nameToReply,
    commentParent: state => state.commentParent
  },

  mutations: {
    articleIsLoading: state => {
      state.articleIsLoading = true;
    },
    articleIsLoaded: state => {
      state.articleIsLoading = false;
    },
    articleIsErrored: state => {
      state.articleIsErrored = true;
    },
    setArticle: (state, payload) => {
      state.article = payload;
    },
    clearArticle: state => {
      state.article = {};
    },
    setArticleTags: (state, payload) => {
      state.articleTags = payload;
    },
    clearArticleTags: state => {
      state.articleTags = [];
    },
    getEditorContent: state => {
      state.shouldGetEditorText = true;
    },
    clearEditorContent: state => {
      state.editorContent = "";
      state.shouldGetEditorText = false;
    },
    setEditorContent: (state, payload) => {
      state.editorContent = payload;
    },
    setNametoReply: (state, payload) => {
      state.nameToReply = payload;
    },
    clearNameToReply: state => {
      state.nameToReply = "";
    },
    setCommentParent: (state, payload) => {
      state.commentParent = payload;
    },
    clearCommentParent: state => {
      state.commentParent = "";
    },
    addComment: (state, payload) => {
      if (!state.article.comments) state.article.comments = [];
      state.article.comments.push(payload);
    }
  },

  actions: {
    async getArticle({ commit }, id) {
      commit("articleIsLoading");
      try {
        const res = await axios.get(`${SERVER_URL}/api/post/${id}`);
        if (!handleResponseErrors(res)) {
          commit("setArticle", { ...res.data });
        }
      } catch (e) {
        commit("pushErrors", e);
        commit("articleIsErrored");
      } finally {
        commit("articleIsLoaded");
      }
    },

    async sendComment({ commit, rootGetters }, payload) {
      let date = formatDateTime(new Date());

      try {
        const res = await axios.post(`${SERVER_URL}/api/comment`, payload);
        handleResponseErrors(res);

        if (res.data.id) {
          const comment = {
            id: res.data.id,
            time: date,
            user: {
              id: rootGetters.user.id,
              name: rootGetters.user.name
            },
            photo: rootGetters.user.photo,
            text: rootGetters.editorContent
          };

          commit("addComment", comment);
        }

        commit("clearEditorContent");
        commit("clearNameToReply");
        commit("clearCommentParent");
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async addPost({ commit }, payload) {
      try {
        const res = await axios.post(`${SERVER_URL}/api/post`, payload);
        handleResponseErrors(res);
        if (res.data.result === true) return true;
      } catch (e) {
        commit("pushErrors", e);
      }
    },

    async editPost({ commit }, { post, url }) {
      try {
        const res = await axios.put(`${SERVER_URL}/api/post/${url}`, post);
        handleResponseErrors(res);
        if (res.data.result === true) return true;
      } catch (e) {
        commit("pushErrors", e);
      }
    }
  }
};
