<template>
  <div class="Articles" :class="className">
    <BaseNavbar className="Articles-Nav" :navItems="navItems" />
    <div class="Articles-Content">
      <div class="ServerInfo" v-if="isErrored">
        Sorry, some error happened :(
      </div>
      <template v-else>
        <div class="ServerInfo" v-if="isLoading">
          Loading...
        </div>
        <template v-else>
          <ArticlePreview
            v-for="item in articles"
            :key="item.id"
            :className="'Articles-ArticlePreview'"
            :time="item.time"
            :author="item.user.name"
            :title="item.title"
            :text="item.text"
            :likeCount="item.likeCount"
            :dislikeCount="item.dislikeCount"
            :commentCount="item.commentCount"
            :viewCount="item.viewCount"
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
import BaseNavbar from "@/components/BaseNavbar.vue";
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  components: {
    BaseNavbar,
    ArticlePreview
  },

  props: {
    className: String
  },

  data() {
    return {
      navItems: ["Новые", "Самые обсуждаемые", "Лучшие", "Старые"],
      articles: [],
      articlesNumber: 4,
      isLoading: true,
      isErrored: false
    };
  },

  mounted() {
    this.isLoading = true;
    axios
      .get(`${SERVER_URL}/api/post?mode=recent&limit=${this.articlesNumber}`)
      .then(res => {
        this.articles = res.data;
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
.Articles {
  padding: 14px 20px 0 0;

  @media (max-width: $screen-tablet) {
    padding-left: 20px;
  }

  &-Nav {
    padding: 0 34px 23px 16px;
  }

  &-Content {
    padding: 50px 7px 50px 0;
    border-right: 1px solid var(--color-layout-primary);

    @media (max-width: $screen-tablet) {
      padding-top: 0;
      padding-right: 0;
      border-right: none;
    }
  }

  &-ArticlePreview {
    margin-bottom: 20px;
  }
}
</style>
