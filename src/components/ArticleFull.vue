<template>
  <div class="Article" :class="className">
    <div class="Article-Header">
      <div class="ArticlePreview-Time">
        {{ time }}
      </div>
      <div class="ArticlePreview-Author">
        {{ author }}
      </div>
    </div>
    <router-link to="`/post/${id}`" class="ArticlePreview-Title">
      {{ title }}
    </router-link>
    <div class="ArticlePreview-Text">
      <span v-html="htmlText"></span>
    </div>
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
