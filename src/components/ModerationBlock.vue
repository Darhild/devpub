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
    <div class="ModerationBlock-Section">
      <div
        class="ModerationBlock-Link ModerationBlock-Decline"
        @click="onDeclne"
      >
        Отклонить
      </div>
      <div class="ModerationBlock-Link" @click="onAccept">
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
    font-size: 1.4rem;
    color: var(--color-primary);
  }

  &-Section {
    display: flex;
  }

  &-Decline {
    margin-right: 22px;
  }
}
</style>
