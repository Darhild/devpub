<template>
  <div class="LoginHeader">
    <div class="LoginHeader-Title Title">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.LoginHeader {
  width: 450px;
  margin-bottom: 25px;
  border-bottom: 1px solid var(--color-layout-primary);

  &-Title {
    margin-bottom: 42px;
    text-align: center;

    @media (max-width: $screen-mobile) {
      margin-bottom: 20px;
    }
  }
}
</style>
