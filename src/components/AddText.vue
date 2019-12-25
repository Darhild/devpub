<template>
  <div class="AddText" :class="className">
    <div class="AddText-Edit">
      <Vueditor ref="editor"></Vueditor>
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

    replyTo: {
      type: String,
      required: true,
      default: ""
    }
  },

  computed: {
    shouldSendComment() {
      return this.$store.getters.shouldSendComment;
    }
  },

  watch: {
    replyTo() {
      this.$refs.editor.setContent(`<strong>${this.replyTo}</strong>,`);
    },

    shouldSendComment() {
      if (this.shouldSendComment) {
        const text = this.$refs.editor.getContent();
        this.$emit("comment-is-send", text);
        this.$refs.editor.setContent("");
      }
    }
  }
};
</script>

<style lang="scss">
.AddText {
  &-Edit {
    padding: 27px 10px 95px 10px;
    background-color: var(--color-layout-primary);
    border-radius: 20px;

    @media (max-width: $screen-mobile) {
      padding: 15px 10px 50px 10px;
    }
  }
}
</style>
