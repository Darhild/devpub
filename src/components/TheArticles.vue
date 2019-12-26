<template>
  <div :class="classObject">
    <BaseNavbar
      v-if="!postByDate"
      className="Articles-Nav"
      :navItems="navItems"
      @set-nav-value="selectActiveNavIndex"
    />
    <div
      :class="[
        forModeration || myPosts
          ? 'Articles-Content Articles-Content--noborder'
          : 'Articles-Content'
      ]"
    >
      <div class="ServerInfo" v-if="isErrored">
        Sorry, some error happened :(
      </div>
      <template v-else>
        <div v-if="postByDate" class="Title Articles-Title">
          Публикации {{ formatedDate }}
        </div>
        <div v-if="tagSelected" class="Title Articles-Title">
          Публикации по тэгу #{{ tagSelected.toUpperCase() }}
        </div>
        <BaseArticle
          v-for="item in articles"
          :key="item.id"
          :className="'Articles-ArticlePreview'"
          :isPreview="true"
          :forModeration="forModeration"
          :myPosts="myPosts"
          :id="item.id"
          :time="item.time"
          :author="item.user.name"
          :title="item.title"
          :text="item.announce"
          :likeCount="item.likeCount"
          :dislikeCount="item.dislikeCount"
          :commentCount="item.commentCount"
          :viewCount="item.viewCount"
          @moderated="onModerated"
        />
        <div v-if="moreArticles && !isLoading" class="Articles-Button">
          <BaseButton
            :className="'Button--mode_add-load'"
            :onClickButton="onLoadMore"
          >
            Ещё публикации ({{ moreArticles }})
          </BaseButton>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { handleResponseErrors } from "@/utils";
import axios from "axios";
import { SERVER_URL } from "./../env";
const BaseNavbar = () =>
  import(/* webpackChunkName: "baseNavbar" */ "@/components/BaseNavbar.vue");
const BaseArticle = () =>
  import(/* webpackChunkName: "baseArticle" */ "@/components/BaseArticle.vue");
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

export default {
  components: {
    BaseNavbar,
    BaseArticle,
    BaseButton
  },

  props: {
    className: {
      type: String,
      required: false
    },
    navItems: {
      type: Array,
      required: true
    },
    tagSelected: {
      type: String,
      required: false
    },
    forModeration: {
      type: Boolean,
      required: false,
      default: false
    },
    myPosts: {
      type: Boolean,
      required: false,
      default: false
    },
    postByDate: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      activeNavIndex: 0,
      articles: [],
      articlesCount: 0,
      articlesNumber: 10,
      offset: 0,
      isLoading: true,
      isErrored: false,
      errors: []
    };
  },

  computed: {
    classObject() {
      let str = "Articles";

      if (this.className) {
        str += ` ${this.className}`;
      }

      if (this.myPosts || this.forModeration) {
        str += " Wrapper";
      }

      return str;
    },

    isSearch() {
      return this.$store.getters.searchStatus;
    },

    searchQuery() {
      return this.$store.getters.searchQuery;
    },

    moreArticles() {
      let dif = this.articlesCount - this.offset - this.articlesNumber;
      return dif > 0 ? dif : 0;
    },

    formatedDate() {
      if (this.postByDate) {
        return new Date(this.postByDate).toLocaleString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        });
      }

      return false;
    }
  },

  watch: {
    $route() {
      this.clearProps();
      this.selectMethod();
    },

    tagSelected() {
      if (this.tagSelected) {
        this.articles = [];
        this.offset = 0;
        this.$store.commit("clearSearchQuery");
        this.getArticles("tag", "/byTag", true);
      }
    },

    searchQuery() {
      if (this.searchQuery) {
        this.articles = [];
        this.tagSelected = "";
        this.offset = 0;
        this.getArticles("query", "/search", false);
      }
    }
  },

  methods: {
    clearProps() {
      this.articles = [];
      this.offset = 0;
      this.tagSelected = "";
      this.$store.commit("clearSearchQuery");
    },

    selectActiveNavIndex(value) {
      this.clearProps();
      this.activeNavIndex = value;
      this.selectMethod();
    },

    selectMethod() {
      if (this.forModeration) this.getArticles("status", "/moderation");
      else if (this.myPosts) this.getArticles("status", "/my");
      else if (this.postByDate) this.getArticles("date", "/byDate");
      else if (this.tagSelected) this.getArticles("tag", "/byTag", true);
      else if (this.searchQuery) this.getArticles("query", "/search", false);
      else this.getArticles("mode");
    },

    getValue() {
      if (this.tagSelected) return this.tagSelected;
      if (this.postByDate) return this.postByDate;
      if (this.searchQuery) return this.searchQuery;
      return this.navItems[this.activeNavIndex].value;
    },

    getArticles(prop, url = "") {
      this.isLoading = true;
      this.isErrored = false;
      const value = this.getValue();

      axios
        .get(
          `${SERVER_URL}/api/post${url}?offset=${this.offset}&limit=${this.articlesNumber}&${prop}=${value}`
        )
        .then(res => {
          if (!handleResponseErrors(res)) {
            this.articles.push(...res.data.posts);
            this.articlesCount = res.data.count;
          }
        })
        .catch(e => {
          this.errors.push(e);
          this.isErrored = true;
        })
        .finally(() => (this.isLoading = false));
    },

    onLoadMore() {
      if (this.articlesCount > this.offset + this.articlesNumber) {
        this.offset += this.articlesNumber;
        this.selectMethod();
      }
    },

    onModerated(post) {
      axios
        .post(`${SERVER_URL}/api/moderation`, {
          post_id: post.id,
          decision: post.status
        })
        .then(res => {
          handleResponseErrors(res);
          if (res.status === 401) this.$router.push("/");
        })
        .catch(e => this.errors.push(e));
    }
  },

  mounted() {
    this.clearProps();
    this.selectMethod();
  },

  metaInfo() {
    let value;

    if (this.tagSelected) value = `Публикации по тэгу #${this.tagSelected}`;
    else if (this.forModeration) value = "Модерирование публикаций";
    else if (this.myPosts) value = "Мои публикации";
    else if (this.postByDate) value = `Публикации за ${this.formatedDate}`;
    else if (this.searchQuery) value = `Искать "${this.searchQuery}"`;
    else return "DevPub - рассказы разработчиков";

    return {
      title: `${value} | DevPub - рассказы разработчиков`
    };
  }
};
</script>

<style lang="scss">
.Articles {
  .Nav {
    margin-bottom: 25px;

    @media (max-width: $screen-mobile) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      margin-bottom: 10px;
    }

    &-Item {
      @media (max-width: $screen-tablet) {
        margin-right: 10px;
      }

      @media (max-width: $screen-mobile) {
        margin-bottom: 5px;
      }
    }
  }

  &-Title {
    margin-top: 5px;
    margin-bottom: 40px;
  }

  &-Content {
    height: 100%;
    padding: 10px 7px 50px 0;
    border-right: 1px solid var(--color-layout-primary);

    @media (max-width: $screen-tablet) {
      padding-top: 0;
      padding-right: 0;
      border-right: none;
    }

    &--noborder {
      border: none;
    }
  }

  &-ArticlePreview {
    margin-bottom: 20px;
  }

  &-Button {
    text-align: center;
  }
}
</style>
