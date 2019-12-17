<template>
  <nav class="Nav" :class="className">
    <div
      v-for="(item, index) in navItems"
      :key="index"
      :class="[
        activeItem === index ? 'Nav-Item Nav-Item--state_active' : 'Nav-Item'
      ]"
      @click="onClick(index)"
    >
      {{ item.name }}
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: false
    },
    navItems: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      activeItem: 0
    };
  },

  methods: {
    onClick(index) {
      this.activeItem = index;
      this.$emit("set-nav-value", index);
    }
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

    &--state_active {
      margin: 0;
      padding: 7px 22px;
      color: var(--color-lightest);
      background-color: var(--color-primary);
      border-radius: 20px;
    }
  }
}
</style>
