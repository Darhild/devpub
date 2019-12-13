<template>
  <div class="ArticlePreview" :class="className">
    <div class="ArticlePreview-Header">
      <div class="ArticlePreview-Time">
        {{ time }}
      </div>
      <div class="ArticlePreview-Author">
        {{ author }}
      </div>
    </div>
    <div class="ArticlePreview-Title">
      {{ title }}
    </div>
    <div class="ArticlePreview-Text" v-html="text"></div>
    <div class="ArticlePreview-Social Social">
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
  }
};
</script>

<style lang="scss">
.ArticlePreview {
  padding: 15px 10px 15px 15px;
  background-color: var(--color-layout-primary);
  border-radius: 10px;

  &-Header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 1.4rem;
  }

  &-Title {
    margin-bottom: 10px;
    font-size: 1.4rem;
    font-weight: 500;
  }

  &-Text {
    margin-bottom: 17px;
    font-size: 1.4rem;
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

.Icon {
  width: 22px;
  height: 22px;

  @media (max-width: $screen-tablet) {
    width: 16px;
    height: 16px;
  }

  &--like {
    fill: var(--color-primary);
  }

  &--dislike {
    fill: var(--color-secondary);
    transform: rotate(180deg);
  }

  &--views {
    width: 34px;

    @media (max-width: $screen-tablet) {
      width: 25px;
    }
  }
}
</style>
