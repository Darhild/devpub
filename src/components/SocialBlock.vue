<template>
  <div class="SocialBlock" :class="className">
    <div class="SocialBlock-Item" @click="$emit('like')">
      <svg class="SocialBlock-Icon Icon Icon--like">
        <use xlink:href="./../assets/icons-sprite.svg#like"></use>
      </svg>
      <div class="SocialBlock-Text">
        {{ likeCount }}
      </div>
    </div>
    <div class="SocialBlock-Item" @click="$emit('dislike')">
      <svg class="SocialBlock-Icon Icon Icon--dislike">
        <use xlink:href="./../assets/icons-sprite.svg#like"></use>
      </svg>
      <div class="SocialBlock-Text">
        {{ dislikeCount }}
      </div>
    </div>
    <div
      v-if="isPreview"
      class="SocialBlock-Item"
      title="Количество комментариев"
    >
      <svg class="SocialBlock-Icon Icon Icon--comments">
        <use xlink:href="./../assets/icons-sprite.svg#comments"></use>
      </svg>
      <div class="SocialBlock-Text">
        {{ commentCount }}
      </div>
    </div>
    <div class="SocialBlock-Item" title="Количество просмотров">
      <svg class="SocialBlock-Icon Icon Icon--views">
        <use xlink:href="./../assets/icons-sprite.svg#views"></use>
      </svg>
      <div class="SocialBlock-Text">
        {{ viewCount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPreview: {
      type: Boolean,
      required: false
    },
    className: {
      type: String,
      required: false
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
.SocialBlock {
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
