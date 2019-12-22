<template>
  <main class="Wrapper">
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
      :tags="article.tags"
    />
    <div v-if="!isLoading && article.comments" class="Comments">
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
        :className="'Comments-Comment'"
        :commentWithForm="commentWithForm"
        @comment-is-send="onSendComment"
        @form-is-opened="onShowForm"
      />
    </div>
    <AddComment
      v-if="!isLoading && !article.comments"
      @comment-is-send="onSendComment"
    />
  </main>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
const BaseArticle = () =>
  import(/* webpackChunkName: "baseArticle" */ "@/components/BaseArticle.vue");
const Comment = () =>
  import(/* webpackChunkName: "comment" */ "@/components/Comment.vue");
const AddComment = () =>
  import(/* webpackChunkName: "addComment" */ "@/components/AddComment.vue");

export default {
  components: {
    BaseArticle,
    Comment,
    AddComment
  },

  data() {
    return {
      article: {},
      commentWithForm: 0,
      isLoading: true,
      isErrored: false
    };
  },

  methods: {
    onShowForm(id) {
      this.commentWithForm = id;
    },

    onSendComment(data) {
      let comment = data;

      if (typeof data !== "object") {
        comment = {
          parent_id: "",
          text: data
        };
      }

      axios.post(`${SERVER_URL}/api/comment`, {
        parent_id: comment.parentId,
        post_id: this.article.id,
        text: comment.text
      });

      this.$store.commit("commentIsSend");
    }
  },

  mounted() {
    this.isLoading = true;
    axios
      .get(`${SERVER_URL}/api/post`)
      .then(res => {
        this.article = res.data.posts.find(
          article => article.id == this.$route.params.id
        );
        this.commentWithForm = this.article.comments
          ? this.article.comments[this.article.comments.length - 1].id
          : 0;
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
.Article {
  margin-top: 15px;
}

.Comments {
  &-Title {
    margin-bottom: 25px;
  }

  &-Comment {
    margin-bottom: 16px;
  }
}
</style>
