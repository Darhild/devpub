<template>
  <div class="AddText" :class="className">
    <div class="AddText-Edit">
      <Vueditor ref="editor"></Vueditor>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import Vueditor from "vueditor";
import "vueditor/dist/style/vueditor.min.css";

const config = {
  toolbar: [
    "link",
    "unLink",
    "|",
    "table",
    "picture",
    "|",
    "fullscreen",
    "|",
    "sourceCode",
    "|",
    "bold",
    "italic",
    "strikeThrough",
    "removeFormat",
    "|",
    "insertUnorderedList",
    "insertOrderedList",
    "indent",
    "outdent",
    "|",
    "element"
  ]
};

Vue.use(Vuex);
Vue.use(Vueditor, config);

export default {
  props: {
    className: {
      type: String,
      required: false
    },
    sendText: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    sendText() {
      const text = this.$refs.editor.getContent();
      this.$emit("comment-is-send", text);
    }
  }
};
</script>

<style lang="scss">
.AddText {
  &-Edit {
    padding: 27px 24px 95px 10px;
    background-color: var(--color-layout-primary);
    border-radius: 20px;
  }
}

.vueditor {
  min-width: auto;
  border: none;
}

.ve-toolbar {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--color-layout-primary);
  border: none;
}

.ve-toolbar div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 32px;
  padding: 2px 5px;
  margin-bottom: 10px;
  background-color: var(--color-lightest);

  &:hover {
    background-color: var(--color-hover-editor);
  }

  &:active {
    background-color: var(--color-hover-editor);
  }
}

.ve-toolbar div:hover [class^="icon"],
.ve-toolbar div:active [class^="icon"] {
  opacity: 1;
}

.ve-select {
  height: 31px;
  margin: 0;
  border: none;
  border-radius: 5px;
}

.ve-toolbar div:nth-child(1),
.ve-toolbar div:nth-child(4),
.ve-toolbar div:nth-child(11),
.ve-toolbar div:nth-child(16) {
  border-radius: 5px 0 0 5px;
}

.ve-toolbar div:nth-child(2),
.ve-toolbar div:nth-child(5),
.ve-toolbar div:nth-child(14),
.ve-toolbar div:nth-child(19) {
  border-radius: 0 5px 5px 0;
}

.ve-toolbar div:nth-child(7),
.ve-toolbar div:nth-child(9) {
  border-radius: 5px;
}

.ve-design {
  background-color: var(--color-lightest);
}

.ve-toolbar div.ve-divider {
  border-right: none;
}

.vueditor .icon-link {
  width: 17px;
  height: 18px;
  background: url("./../assets/vueditor/link.png");
}

.vueditor .icon-unlink {
  width: 17px;
  height: 18px;
  background: url("./../assets/vueditor/unlink.png");
}

.vueditor .icon-table {
  width: 30px;
  height: 24px;
  background: url("./../assets/vueditor/table.png");
}

.vueditor .icon-file-image-o {
  width: 22px;
  height: 22px;
  background: url("./../assets/vueditor/pic.png");
}

.vueditor .icon-fullscreen {
  width: 26px;
  height: 26px;
  background: url("./../assets/vueditor/full.png");
}

.vueditor .icon-code {
  width: 69px;
  height: 36px;
  background: url("./../assets/vueditor/src.png");
}

.vueditor .icon-bold {
  width: 15px;
  height: 18px;
  background: url("./../assets/vueditor/B.png");
}

.vueditor .icon-italic {
  width: 13px;
  height: 18px;
  background: url("./../assets/vueditor/I.png");
}

.vueditor .icon-strikethrough {
  width: 17px;
  height: 36px;
  background: url("./../assets/vueditor/S.png");
}

.vueditor .icon-eraser {
  width: 22px;
  height: 33px;
  background: url("./../assets/vueditor/clear.png");
}

.vueditor .icon-list-ul {
  width: 22px;
  height: 17px;
  background: url("./../assets/vueditor/ul.png");
}

.vueditor .icon-list-ol {
  width: 23px;
  height: 23px;
  background: url("./../assets/vueditor/ol.png");
}

.vueditor .icon-indent {
  width: 26px;
  height: 23px;
  background: url("./../assets/vueditor/indent.png");
}

.vueditor .icon-outdent {
  width: 29px;
  height: 23px;
  background: url("./../assets/vueditor/outdent.png");
}

.ve-toolbar div .ve-select {
  color: var(--text-editor);
}

.ve-dropdown {
  border: none;
}

.ve-design iframe {
  position: relative;
}
</style>
