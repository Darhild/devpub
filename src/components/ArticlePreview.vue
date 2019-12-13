<template>
  <div class="ArticlePreview">
    <div class="ArticlePreview-Header">
      <div class="ArticlePreview-Date">
        Вчера в 17:36
      </div>
      <div class="ArticlePreview-Author">
        Евгений Кучерявый
      </div>
    </div>
    <div class="ArticlePreview-Title">
      Устраняем уязвимости: как защитить сайт от SQL-инъекции
    </div>
    <div class="ArticlePreview-Text">
      Заводишь сайт, наполняешь его контентом, запускаешь рекламную кампанию —
      трафик стабильно растет, пользователи активно комментируют и делятся
      статьями. Всё хорошо до того момента, пока в один не предвещающий беды
      день на сайте не оказывается ни одной статьи. Заходишь в лог запросов и
      видишь, что кто-то сделал DROP.
    </div>
    <div class="ArticlePreview-Social Social">
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--like">
          <use xlink:href="./../assets/icons-sprite.svg#like"></use>
        </svg>
        <div class="Social-Text">
          56
        </div>
      </div>
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--dislike">
          <use xlink:href="./../assets/icons-sprite.svg#like"></use>
        </svg>
        <div class="Social-Text">
          16
        </div>
      </div>
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--comments">
          <use xlink:href="./../assets/icons-sprite.svg#comments"></use>
        </svg>
        <div class="Social-Text">
          2
        </div>
      </div>
      <div class="Social-Item">
        <svg class="Social-Icon Icon Icon--views">
          <use xlink:href="./../assets/icons-sprite.svg#views"></use>
        </svg>
        <div class="Social-Text">
          157
        </div>
      </div>
    </div>
  </div>
</template>

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
