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

  &-Item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 25px;
    padding: 7px 22px;
    font-size: 1.4rem;
    text-align: center;
    cursor: pointer;

    @media (max-width: $screen-mobile) {
      margin-right: 10px;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: var(--color-lightest);
      background-color: var(--color-hover);
      border-radius: 20px;
    }

    &--state_active {
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
