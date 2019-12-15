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
    <div class="Article-Social ArticlePreview-Social Social">
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--like">
          <use xlink:href="./../assets/icons-sprite.svg#like"></use>
        </svg>
        <div class="Social-Text">
          {{ likeCount }}
        </div>
      </div>
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--dislike">
          <use xlink:href="./../assets/icons-sprite.svg#like"></use>
        </svg>
        <div class="Social-Text">
          {{ dislikeCount }}
        </div>
      </div>
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--comments">
          <use xlink:href="./../assets/icons-sprite.svg#comments"></use>
        </svg>
        <div class="Social-Text">
          {{ commentCount }}
        </div>
      </div>
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--views">
          <use xlink:href="./../assets/icons-sprite.svg#views"></use>
        </svg>
        <div class="Social-Text">
          {{ viewCount }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: false
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
      const regex = /(&lt;)(.*?)(&gt;)/gi;
      return this.text.replace(regex, "<$2>");
    }
  },

  filters: {
    formatText(str) {
      const regex = /&lt;.*?&gt;/gi;
      return str.replace(regex, "").substr(0, 200);
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

.Social {
  display: flex;

  &-Item {
    display: flex;
    align-items: center;
    margin-right: 32px;

    &:last-child {
      margin-right: 0;
    }
  }

  &-Icon {
    margin-right: 6px;
  }

  &-Text {
    font-size: 2.2rem;
    font-weight: 500;

    @media (max-width: $screen-tablet) {
      font-size: 1.6rem;
    }
  }
}
</style>
