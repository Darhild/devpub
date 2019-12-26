<template>
  <transition name="modal">
    <div v-if="isErrors" class="ErrorModal">
      <div class="ErrorModal-Close" @click="onClose">
        <svg class="Icon Icon--close">
          <use xlink:href="./../assets/icons-sprite.svg#delete"></use>
        </svg>
      </div>
      <div class="ErrorModal-Errors">
        <div
          v-for="(error, key, index) in errors"
          :key="index"
          class="ErrorModal-Item"
        >
          {{ error }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    errors() {
      return this.$store.getters.viewedErrors;
    },

    isErrors() {
      return Object.keys(this.errors).length;
    }
  },

  methods: {
    onClose() {
      this.$store.commit("clearViewedErrors");
    }
  }
}
</script>

<style lang="scss">
.ErrorModal {
  position: fixed;
  align-self: center;
  z-index: 100;
  min-width: 310px;
  padding: 10px 10px 35px 40px;
  font-size: 1.6rem;
  color: var(--color-lightest);
  background-color: var(--color-secondary);

  &-Errors {
    margin-right: 30px;
  }

  &-Item {
    margin-bottom: 15px;
  }

  &-Close {
    margin-bottom: 15px;
    text-align: right;
    cursor: pointer;
  }
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-active {
  transition: all 1.5s ease;
}

.modal-enter,
.modal-leave-to {
  top: -1500px;
  opacity: 0;
}

.modal-enter-to,
.modal-leave {
  top: 0;
}
</style>
