<template>
  <nav class="Nav" :class="className">
    <div
      class="Nav-Item"
      :class="`${className}-Item`"
      v-for="(item, index) in navItems"
      :key="index"
    >
      {{ item }}
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    className: String,
    navItems: Array
  }
};
</script>

<style lang="scss">
.Nav {
  display: flex;
  justify-content: space-between;

  &-Item {
    margin: 7px 22px;
    font-size: 1.4rem;
    cursor: pointer;

    &:hover {
      margin: 0;
      padding: 7px 22px;
      color: var(--color-lightest);
      background-color: var(--color-primary);
      border-radius: 20px;
    }
  }
}
</style>
