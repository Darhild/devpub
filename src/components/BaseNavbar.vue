<template>
  <nav class="Nav" :class="className">
    <div
      v-for="(item, index) in navItems"
      :key="index"
      class="Nav-Item"
      :class="returnClassObject(index)"
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
    },
    margin: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      activeItem: 0
    };
  },

  methods: {
    returnClassObject(index) {
      return {
        "Nav-Item--state_active": this.activeItem === index,
        "Nav-Item--margin-right": this.margin === "right"
      };
    },

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
    padding: 7px 22px;
    font-size: 1.4rem;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: var(--color-lightest);
      background-color: var(--color-hover);
      border-radius: 20px;
    }

    &--state_active {
      margin: 0;
      padding: 7px 22px;
      color: var(--color-lightest);
      background-color: var(--color-primary);
      border-radius: 20px;

      &:hover {
        background-color: var(--color-primary);
      }
    }

    &--margin-right {
      margin-right: 58px;
    }
  }
}
</style>
