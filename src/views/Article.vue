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
    <div class="AddComment">
      <AddText
        :className="'AddComment-Edit'"
        :sendText="sendComment"
        v-on:comment-is-send="onCommentSend"
      />
      <div class="AddComment-Send">
        <BaseButton :onClickButton="onClickButton">
          Отправить
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
import BaseArticle from "@/components/BaseArticle.vue";
import BaseButton from "@/components/BaseButton.vue";
import AddText from "@/components/AddText.vue";

export default {
  components: {
    BaseArticle,
    AddText,
    BaseButton
  },

  data() {
    return {
      article: {},
      isLoading: true,
      isErrored: false,
      sendComment: false
    };
  },

  methods: {
    onClickButton() {
      this.sendComment = true;
    },

    onCommentSend(text) {
      this.sendComment = false;

      axios.post(`${SERVER_URL}/api/comment`, {
        parent_id: "",
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
.AddComment {
  margin-bottom: 55px;

  &-Edit {
    margin-bottom: 16px;
  }

  &-Send {
    text-align: right;
  }
}
</style>
