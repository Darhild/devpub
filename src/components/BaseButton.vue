<template>
  <button class="Button" :class="className" @click="onclick">
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
    },
    onClickButton: {
      type: Function,
      required: true
    }
  },

  methods: {
    onclick() {
      this.onClickButton();
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

  &--size_xs {
    padding: 4px 16px;
    font-size: 1rem;
  }
}
</style>
