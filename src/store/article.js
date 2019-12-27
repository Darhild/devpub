import axios from "axios";
import { SERVER_URL } from "./../env";
import { handleResponseErrors, formatDateTime } from "@/utils";

export default {
  state: {
    articleIsLoading: false,
    articleIsErrored: false,
    article: {},
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
      state.replyTo = payload;
    },
    clearNameToReply: state => {
      state.replyTo = "";
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
          commit("setArticle", res.data);
        }
      } catch (e) {
        commit("pushErrors", e);
        commit("articleIsErrored");
      } finally {
        commit("articleIsLoaded");
      }
    },

    async sendComment({ commit, state }, payload) {
      let date = formatDateTime(new Date());

      try {
        const res = await axios.post(`${SERVER_URL}/api/comment`, payload);
        handleResponseErrors(res);

        if (res.data.id) {
          commit("addComment", {
            id: res.data.id,
            time: date,
            user: {
              id: state.user.id,
              name: state.user.name
            },
            photo: this.user.photo,
            text: state.editorContent
          });
        }

        commit("clearEditorContent");
        commit("clearNameToReply");
        commit("clearCommentParent");
      } catch (e) {
        commit("pushErrors", e);
      }
    }
  }
}
