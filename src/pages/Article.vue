<template>
  <main class="Wrapper">
    <div v-if="articleIsErrored" class="ServerInfo">
      Sorry, some error happened :(
    </div>
    <BaseArticle
      v-if="!articleIsLoading && !articleIsErrored"
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
    <div
      v-if="!articleIsLoading && !articleIsErrored && article.comments"
      class="Comments"
    >
      <div class="Title Comments-Title">
        Комментарии
      </div>
      <Comment
        v-for="comment in article.comments"
        :key="comment.id"
        :id="comment.id"
        :authorId="comment.user.id"
        :author="comment.user.name"
        :photo="comment.user.photo"
        :time="comment.time"
        :text="comment.text"
        :className="'Comments-Comment'"
      />
    </div>
    <AddComment v-if="!articleIsLoading && !articleIsErrored && isAuth" />
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const BaseArticle = () =>
  import(/* webpackChunkName: "baseArticle" */ "@/components/BaseArticle.vue");
const Comment = () =>
  import(/* webpackChunkName: "comment" */ "@/components/BaseComment.vue");
const AddComment = () =>
  import(/* webpackChunkName: "addComment" */ "@/components/AddComment.vue");

export default {
  name: "Article",

  components: {
    BaseArticle,
    Comment,
    AddComment
  },

  computed: {
    ...mapGetters([
      "blogInfo",
      "isAuth",
      "article",
      "articleIsLoading",
      "articleIsErrored"
    ])
  },

  methods: {
    ...mapActions(["getArticle"])
  },

  created() {
    this.getArticle(this.$route.params.id);
  },

  metaInfo() {
    return {
      title:
        this.article && this.article.title
          ? `${this.article.title} | ${this.blogInfo.title} - ${this.blogInfo.subtitle}`
          : `${this.blogInfo.title} - ${this.blogInfo.subtitle}`
    };
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
