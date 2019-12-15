<template>
  <div class="LoginHeader">
    <div class="LoginHeader-Title Title">
      <slot />
    </div>
    <div class="LoginHeader-With">
      <div class="Title">
        Войти с помощью
      </div>
      <div class="LoginHeader-Icons">
        <div class="LoginHeader-Icon">
          <svg class="Icon Icon--Google">
            <use xlink:href="./../assets/icons-sprite.svg#google"></use>
          </svg>
        </div>
        <div class="LoginHeader-Icon">
          <svg class="Icon Icon--Fb">
            <use xlink:href="./../assets/icons-sprite.svg#fb"></use>
          </svg>
        </div>
        <div class="LoginHeader-Icon">
          <svg class="Icon Icon--Vk">
            <use xlink:href="./../assets/icons-sprite.svg#vk"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.LoginHeader {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--color-layout-primary);

  &-Title {
    margin-bottom: 42px;
    text-align: center;

    @media (max-width: $screen-mobile) {
      margin-bottom: 20px;
    }
  }

  &-With {
    display: flex;
    align-items: center;

    @media (max-width: $screen-mobile) {
      display: block;
    }
  }

  &-Icons {
    display: flex;
    margin-left: 25px;

    @media (max-width: $screen-mobile) {
      margin-top: 10px;
      margin-left: 0;
    }
  }

  &-Icon {
    margin-right: 25px;
    cursor: pointer;
  }
}
</style>
