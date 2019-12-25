<template>
  <div class="Article" :class="className">
    <div class="Article-Header" :class="{ 'ArticlePreview-Header': isPreview }">
      <div class="Article-Time" :class="{ 'ArticlePreview-Time': isPreview }">
        {{ time }}
      </div>
      <div
        class="Article-Author"
        :class="{ 'ArticlePreview-Author': isPreview }"
      >
        {{ author }}
      </div>
    </div>
    <router-link
      v-if="isPreview"
      :to="{ name: 'article', params: { id: `${id}` } }"
      class="ArticlePreview-Title"
    >
      {{ title }}
    </router-link>
    <div v-else class="Article-Title">
      {{ title }}
    </div>
    <div class="Article-Text">
      <template v-if="isPreview">
        {{ text | formatText }}
      </template>
      <span v-else v-html="htmlText"></span>
    </div>
    <ModerationBlock
      v-if="forModeration || myPosts"
      className="ArticlePreview-Moderation"
      :id="id"
      :myPosts="myPosts"
      @moderated="onModerated"
    />
    <div v-else class="Article-Footer">
      <SocialBlock
        className="Article-Social ArticlePreview-Social"
        :isPreview="isPreview"
        :likeCount="likes"
        :dislikeCount="dislikes"
        :commentCount="commentCount"
        :viewCount="viewCount"
        @like="onLike"
        @dislike="onDislike"
      />
      <div v-if="!isPreview" class="Article-Tags">
        <div
          v-for="(tag, index) in tags"
          :key="index"
          class="Tag Article-Tag"
          @click="onSelectTag(tag)"
        >
          #{{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "../env";
import { formatToHtml } from "@/utils";
const SocialBlock = () =>
  import(/* webpackChunkName: "socialBlock" */ "@/components/SocialBlock.vue");
const ModerationBlock = () =>
  import(
    /* webpackChunkName: "moderationBlock" */ "@/components/ModerationBlock.vue"
  );

export default {
  components: {
    SocialBlock,
    ModerationBlock
  },

  props: {
    className: {
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
    isPreview: {
      type: Boolean,
      required: false
    },
    id: {
      type: Number,
      required: true,
      default: 0
    },
    time: {
      type: String,
      required: true,
      default: ""
    },
    author: {
      type: String,
      required: true,
      default: ""
    },
    title: {
      type: String,
      required: true,
      default: ""
    },
    text: {
      type: String,
      required: true,
      default: ""
    },
    likeCount: {
      type: Number,
      required: true,
      default: 0
    },
    dislikeCount: {
      type: Number,
      required: true,
      default: 0
    },
    commentCount: {
      type: Number,
      required: true,
      default: 0
    },
    viewCount: {
      type: Number,
      required: true,
      default: 0
    },
    tags: {
      type: Array,
      required: false
    }
  },

  data() {
    return {
      likes: 0,
      dislikes: 0
    };
  },

  computed: {
    htmlText() {
      return formatToHtml(this.text);
    }
  },

  filters: {
    formatText(str) {
      const regex = /&lt;.*?&gt;/gi;
      return str.replace(regex, "");
    }
  },

  methods: {
    onModerated(status) {
      this.$emit("moderated", {
        id: this.id,
        status
      });
    },

    onLike() {
      axios
        .post(`${SERVER_URL}/api/post/like`, {
          post_id: this.id
        })
        .then(res => {
          if (res.data.result) this.likes++;
        })
        .catch(e => this.errors.push(e));
    },

    onDislike() {
      axios
        .post(`${SERVER_URL}/api/post/dislike`, {
          post_id: this.id
        })
        .then(res => {
          if (res.data.result) this.dislikes++;
        })
        .catch(e => this.errors.push(e));
    },

    onSelectTag(tag) {
      this.$router.push({
        name: "mainPage",
        params: { tag }
      });
    }
  },

  mounted() {
    this.likes = this.likeCount;
    this.dislikes = this.dislikeCount;
  }
};
</script>

<style lang="scss">
.Article {
  padding: 15px 15px;
  background-color: var(--color-layout-primary);
  border-radius: 10px;

  &-Header {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 8px;
    font-size: 1.4rem;
  }

  &-Time {
    order: 2;
  }

  &-Author {
    order: 1;
    margin-right: 15px;
    font-weight: 700;
  }

  &-Title {
    margin-bottom: 10px;
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--color-darkest);
  }

  &-Text {
    margin-bottom: 17px;
    font-size: 1.4rem;
  }

  &-Tags {
    margin-left: 15px;

    @media (max-width: $screen-tablet) {
      margin-left: 0;
    }
  }

  &-Tag {
    margin-right: 15px;
    margin-bottom: 5px;
  }

  &-Social {
    @media (max-width: $screen-tablet) {
      margin-bottom: 20px;
    }
  }

  &-Footer {
    display: flex;
    align-self: flex-start;

    @media (max-width: $screen-tablet) {
      display: block;
    }
  }

  &--full {
    margin-bottom: 100px;
  }
}

.ArticlePreview {
  &-Header {
    justify-content: space-between;
  }

  &-Title {
    display: block;
    margin-bottom: 10px;
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--color-darkest);
  }
}
</style>
