<template>
  <div class="ModerationBlock" :class="className">
    <div class="ModerationBlock-Section">
      <router-link
        :to="{ name: 'edit', params: { id: `${id}` } }"
        class="ModerationBlock-Link"
      >
        Редактировать
      </router-link>
    </div>
    <div v-if="!myPosts" class="ModerationBlock-Section">
      <div
        v-if="param !== 'declined'"
        class="ModerationBlock-Link"
        @click="onDeclne"
      >
        Отклонить
      </div>
      <div
        v-if="param !== 'accepted'"
        class="ModerationBlock-Link"
        @click="onAccept"
      >
        Утвердить
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: false
    },
    id: {
      type: Number,
      required: true
    },
    myPosts: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    param() {
      return this.$route.params.pathMatch;
    }
  },

  methods: {
    onDeclne() {
      this.$emit("moderated", "decline");
    },

    onAccept() {
      this.$emit("moderated", "accept");
    }
  }
};
</script>

<style lang="scss">
.ModerationBlock {
  display: flex;
  justify-content: space-between;

  &-Link {
    margin-right: 22px;
    font-size: 1.4rem;
    color: var(--color-primary);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    &:visited {
      color: var(--color-primary);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &-Section {
    display: flex;
  }
}
</style>
