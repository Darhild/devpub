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
        <span v-if="!isPreview">&nbsp;-&nbsp;</span>
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
      v-if="forModeration"
      className="ArticlePreview-Moderation"
      :id="id"
      @moderated="onModerated"
    />
    <SocialBlock
      v-else
      className="Article-Social ArticlePreview-Social"
      :likeCount="likeCount"
      :dislikeCount="dislikeCount"
      :commentCount="commentCount"
      :viewCount="viewCount"
    />
  </div>
</template>

<script>
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
    }
  },

  computed: {
    htmlText() {
      return formatToHtml(this.text);
    }
  },

  filters: {
    formatText(str) {
      const regex = /&lt;.*?&gt;/gi;
      return str.replace(regex, "").substr(0, 200);
    }
  },

  methods: {
    onModerated(status) {
      this.$emit("moderated", {
        id: this.id,
        status
      });
    }
  }
};
</script>

<style lang="scss">
.Article {
  padding: 15px 10px 15px 15px;
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
