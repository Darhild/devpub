<template>
  <button class="Button" :class="className">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: false
    },
    size: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss">
.Button {
  padding: 8px 35px;
  color: var(--color-lightest);
  background-color: var(--color-primary);
  border: none;
  border-radius: 20px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  &:active {
    background-color: var(--color-active);
  }
}
</style>
