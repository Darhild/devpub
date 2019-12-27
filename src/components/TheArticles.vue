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
      <div class="ServerInfo" v-if="articlesAreErrored">
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
        <div v-if="moreArticles && !articlesAreLoading" class="Articles-Button">
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
import { mapGetters, mapActions, mapMutations } from "vuex";
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
      articlesNumber: 10,
      offset: 0
    };
  },

  computed: {
    ...mapGetters([
      "articles",
      "articlesCount",
      "articlesAreLoading",
      "articlesAreErrored",
      "tagSelected",
      "searchQuery"
    ]),

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
        this.clearArticles();
        this.$store.commit("clearSearchQuery");
        this.offset = 0;
        let query = this.makeQuery("tag", "/byTag");
        this.getArticles(query);
      }
    },

    searchQuery() {
      if (this.searchQuery) {
        this.clearArticles();
        this.clearSelectedTag();
        this.offset = 0;
        let query = this.makeQuery("query", "/search");
        this.getArticles(query);
      }
    }
  },

  methods: {
    ...mapMutations(["clearArticles", "clearSelectedTag", "clearSearchQuery"]),
    ...mapActions(["getArticles"]),

    clearProps() {
      this.clearArticles();
      this.clearSelectedTag();
      this.clearSearchQuery();
      this.offset = 0;
    },

    selectActiveNavIndex(value) {
      this.clearProps();
      this.activeNavIndex = value;
      this.selectMethod();
    },

    selectMethod() {
      let query;

      if (this.forModeration) query = this.makeQuery("status", "/moderation");
      else if (this.myPosts) query = this.makeQuery("status", "/my");
      else if (this.postByDate) query = this.makeQuery("date", "/byDate");
      else if (this.tagSelected) query = this.makeQuery("tag", "/byTag");
      else if (this.searchQuery) query = this.makeQuery("query", "/search");
      else query = this.makeQuery("mode");

      this.getArticles(query);
    },

    getValue() {
      if (this.tagSelected) return this.tagSelected;
      if (this.postByDate) return this.postByDate;
      if (this.searchQuery) return this.searchQuery;
      return this.navItems[this.activeNavIndex].value;
    },

    makeQuery(prop, url = "") {
      const value = this.getValue();
      return `${url}?offset=${this.offset}&limit=${this.articlesNumber}&${prop}=${value}`;
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
