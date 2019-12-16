<template>
  <div class="PageWrapper">
    <div v-if="isErrored" class="ServerInfo">
      Sorry, some error happened :(
    </div>
    <div v-else-if="isLoading" class="ServerInfo">
      Loading...
    </div>
    <BaseArticle
      v-else
      :key="article.id"
      :className="'Article--full'"
      :id="article.id"
      :time="article.time"
      :author="article.user.name"
      :title="article.title"
      :text="article.text"
      :likeCount="article.likeCount"
      :dislikeCount="article.dislikeCount"
      :commentCount="article.commentCount"
      :viewCount="article.viewCount"
    />
    <div v-if="!isLoading" class="Comments">
      <div class="Title Comments-Title">
        Комментарии
      </div>
      <Comment
        v-for="comment in article.comments"
        :key="comment.id"
        :id="comment.id"
        :author="comment.user.name"
        :time="comment.time"
        :text="comment.text"
        :commentWithForm="commentWithForm"
        @comment-is-send="onSendComment"
        @form-is-opened="onShowForm"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
import BaseArticle from "@/components/BaseArticle.vue";
import Comment from "@/components/Comment.vue";

export default {
  components: {
    BaseArticle,
    Comment
  },

  data() {
    return {
      article: {},
      commentWithForm: 0,
      isLoading: true,
      isErrored: false,
      sendComment: false
    };
  },

  methods: {
    onClickButton() {
      this.sendComment = true;
    },

    onShowForm(id) {
      this.commentWithForm = id;
    },

    onSendComment({ text, parentId }) {
      axios.post(`${SERVER_URL}/api/comment`, {
        parent_id: parentId,
        post_id: this.article.id,
        text
      });
    }
  },

  mounted() {
    this.isLoading = true;
    axios
      .get(`${SERVER_URL}/api/post`)
      .then(res => {
        this.article = res.data.find(
          article => article.id == this.$route.params.id
        );
      })
      .catch(e => {
        this.errors.push(e);
        this.isErrored = true;
      })
      .finally(() => (this.isLoading = false));
  }
};
</script>

<style lang="scss">
.Comments {
  &-Title {
    margin-bottom: 25px;
  }
}
</style>
