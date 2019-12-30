<template>
  <nav class="Nav" :class="className">
    <div
      v-for="(item, index) in navItems"
      :key="index"
      class="Nav-Item"
      :class="{ 'Nav-Item--state_active': activeItem === index }"
      @click="onClick(index, item.value)"
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
    activeNavIndex: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      activeItem: 0
    };
  },

  watch: {
    activeNavIndex() {
      this.activeItem = this.activeNavIndex;
    }
  },

  methods: {
    onClick(index, value) {
      this.activeItem = index;
      this.$emit("set-nav-value", index);
      if (this.activeNavIndex !== undefined) this.$router.push(value);
    }
  },

  mounted() {
    if (this.activeNavIndex !== undefined)
      this.activeItem = this.activeNavIndex;
  }
};
</script>

<style lang="scss">
.Nav {
  display: flex;
  margin-top: 15px;

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
