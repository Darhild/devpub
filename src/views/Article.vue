<template>
  <main class="Wrapper">
    <div v-if="isErrored" class="ServerInfo">
      Sorry, some error happened :(
    </div>
    <BaseArticle
      v-if="!isLoading && !isErrored"
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
        :authorId="comment.user.id"
        :author="comment.user.name"
        :time="comment.time"
        :text="comment.text"
        :className="'Comments-Comment'"
        @reply="onReplyComment"
      />
    </div>
    <AddComment
      v-if="!isLoading && isAuth"
      :replyTo="replyTo"
      @comment-is-send="onSendComment"
    />
  </main>
</template>

<script>
import { handleResponseErrors } from "@/utils";
import axios from "axios";
import { SERVER_URL } from "./../env";
import { formatDateTime } from "@/utils";
const BaseArticle = () =>
  import(/* webpackChunkName: "baseArticle" */ "@/components/BaseArticle.vue");
const Comment = () =>
  import(/* webpackChunkName: "comment" */ "@/components/Comment.vue");
const AddComment = () =>
  import(/* webpackChunkName: "addComment" */ "@/components/AddComment.vue");

export default {
  metaInfo() {
    return {
      title: this.article.title
        ? `${this.article.title} | DevPub - рассказы разработчиков`
        : "DevPub - рассказы разработчиков"
    };
  },

  components: {
    BaseArticle,
    Comment,
    AddComment
  },

  data() {
    return {
      article: {},
      errors: [],
      title: "",
      replyTo: "",
      isLoading: false,
      isErrored: false
    };
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },

    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    onReplyComment(name) {
      this.replyTo = name;
    },

    onSendComment(data) {
      let comment = data;
      let date = formatDateTime(new Date());

      if (typeof data !== "object") {
        comment = {
          parent_id: "",
          text: data
        };
      }

      axios
        .post(`${SERVER_URL}/api/comment`, {
          parent_id: comment.parentId || "",
          post_id: this.article.id,
          text: comment.text
        })
        .then(res => {
          handleResponseErrors(res);
          if (res.data.id) {
            if (!this.article.comments) this.article.comments = [];
            this.article.comments.push({
              id: res.data.id,
              time: date,
              user: {
                id: this.user.id,
                name: this.user.name
              },
              photo: this.user.photo,
              text: comment.text
            });
            this.$forceUpdate();
            this.$store.commit("commentIsSend");
          }
        })
        .catch(e => this.error.push(e));
    }
  },

  mounted() {
    this.isLoading = true;
    axios
      .get(`${SERVER_URL}/api/post`)
      .then(res => {
        if (!handleResponseErrors(res)) {
          this.article = res.data.posts.find(
            article => article.id == this.$route.params.id
          );
        }
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
    margin-bottom: 30px;
  }
}
</style>
