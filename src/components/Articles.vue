<template>
  <div class="Articles" :class="className">
    <BaseNavbar
      className="Articles-Nav"
      :navItems="navItems"
      v-on:set-value="selectActiveProp"
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
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
import BaseNavbar from "@/components/BaseNavbar.vue";
import BaseArticle from "@/components/BaseArticle.vue";

export default {
  components: {
    BaseNavbar,
    BaseArticle
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
    }
  },

  data() {
    return {
      activeProp: 0,
      articles: [],
      articlesNumber: 4,
      isLoading: true,
      isErrored: false
    };
  },

  methods: {
    selectActiveProp(value) {
      this.activeProp = value;
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
    this.isLoading = true;
    let url = `${SERVER_URL}/api/post`;

    if (this.forModeration) {
      url += "/moderation";
    } else if (this.myPosts) {
      url += "/my";
    }

    axios
      .get(url)
      .then(res => {
        if (this.forModeration) {
          this.articles = res.data.posts;
        } else this.articles = res.data;
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

    &--noborder {
      border: none;
    }
  }

  &-ArticlePreview {
    margin-bottom: 20px;
  }
}
</style>
