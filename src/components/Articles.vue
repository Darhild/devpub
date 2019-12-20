<template>
  <div class="Articles" :class="className">
    <BaseNavbar
      className="Articles-Nav"
      :navItems="navItems"
      @set-nav-value="selectActiveNavProp"
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
        <div class="ServerInfo" v-if="isLoading">
          Loading...
        </div>
        <template v-else>
          <div v-if="postByDate" class="Title Articles-Title">
            Публикации {{ formatedDate }}
          </div>
          <BaseArticle
            v-for="item in articles"
            :key="item.id"
            :className="'Articles-ArticlePreview'"
            :isPreview="true"
            :forModeration="forModeration"
            :id="item.id"
            :time="item.time"
            :author="item.user.name"
            :title="item.title"
            :text="item.text"
            :likeCount="item.likeCount"
            :dislikeCount="item.dislikeCount"
            :commentCount="item.commentCount"
            :viewCount="item.viewCount"
            @moderated="onModerated"
          />
          <div class="Articles-Button">
            <BaseButton
              :className="'Button--mode_add-load'"
              :onClickButton="onLoadMore"
            >
              Ещё публикации ({{ moreArticles }})
            </BaseButton>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
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
      required: true
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
      required: true
    }
  },

  data() {
    return {
      activeNavProp: 0,
      articles: [],
      articlesCount: 0,
      articlesNumber: 4,
      offset: 0,
      isLoading: true,
      isErrored: false,
      errors: []
    };
  },

  computed: {
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
      this.selectMethod();
    },

    tagSelected() {
      this.getArticles("tag", "/byTag", true);
    },

    searchQuery() {
      if (this.searchQuery) {
        this.onSearch();
      }
    }
  },

  methods: {
    selectActiveNavProp(value) {
      this.articles = [];
      this.offset = 0;
      this.activeNavProp = value;
      this.selectMethod();
    },

    selectMethod() {
      if (this.forModeration) this.getArticles("status", "/moderation");
      else if (this.myPosts) this.getArticles("status", "/my");
      else if (this.postByDate) this.getArticles("date", "/byDate");
      else if (this.searchQuery) this.onSearch();
      else this.getArticles("mode");
    },

    getArticles(prop, url = "", getByTag = false) {
      this.isLoading = true;
      this.isErrored = false;
      let value;

      if (getByTag) {
        value = this.tagSelected;
      } else if (this.postByDate) {
        value = this.postByDate;
      } else if (this.searchQuery) {
        value = this.searchQuery;
      } else value = this.navItems[this.activeNavProp].value;

      axios
        .get(
          `${SERVER_URL}/api/post${url}?offset=${this.offset}&limit=${this.articlesNumber}&${prop}=${value}`
        )
        .then(res => {
          this.articles.push(...res.data.posts);
          this.articlesCount = res.data.count;
        })
        .catch(e => {
          this.errors.push(e);
          this.isErrored = true;
        })
        .finally(() => (this.isLoading = false));
    },

    onSearch() {
      this.getArticles("query", "/search", false);
      if (!this.moreArticles) {
        this.$store.commit("clearSearchQuery");
      }
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
        .then(() => {})
        .catch(e => console.log(e));
    }
  },

  mounted() {
    this.selectMethod();
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

  &-Title {
    margin-top: 75px;
    margin-bottom: 40px;
  }

  &-Content {
    padding: 50px 7px 50px 0;
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
    margin-right: 112px;
    text-align: right;
  }
}
</style>
