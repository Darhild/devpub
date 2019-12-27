<template>
  <div class="AddText" :class="className">
    <div class="AddText-Edit">
      <Vueditor ref="editor"></Vueditor>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  props: {
    className: {
      type: String,
      required: false
    }
  },

  computed: {
    ...mapGetters(["nameToReply", "shouldGetEditorText"])
  },

  watch: {
    nameToReply() {
      if (this.nameToReply) this.$refs.editor.setContent(`<strong>${this.nameToReply}</strong>,`);
    },

    shouldGetEditorText() {
      if (this.shouldGetEditorText) {
        this.setEditorContent(this.$refs.editor.getContent());
      } else this.$refs.editor.setContent("");
    }
  },

  methods: {
    ...mapMutations(["setEditorContent", "clearEditorContent"])
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
