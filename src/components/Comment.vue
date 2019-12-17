<template>
  <div class="Comment" :class="className">
    <div class="Comment-Header">
      <div class="Comment-Author">
        {{ author }}
      </div>
      <div class="Comment-Date">
        {{ time }}
      </div>
    </div>
    <div class="Comment-Content">
      <span v-html="htmlText"></span>
    </div>
    <div v-if="!showCommentForm" class="Comment-Send">
      <BaseButton
        :onClickButton="onReplyComment"
        :className="'Button--size_xs'"
      >
        Ответить
      </BaseButton>
    </div>
    <AddComment v-if="showCommentForm" @comment-is-send="onSendComment" />
  </div>
</template>

<script>
import { formatToHtml } from "@/utils";
import AddComment from "@/components/AddComment.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    AddComment,
    BaseButton
  },

  props: {
    id: {
      type: Number,
      required: true,
      default: 0
    },
    author: {
      type: String,
      required: true,
      default: ""
    },
    time: {
      type: String,
      required: true,
      default: ""
    },
    text: {
      type: String,
      required: true,
      default: ""
    },
    commentWithForm: {
      type: Number,
      required: false
    },
    className: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      showCommentForm: false
    };
  },

  computed: {
    htmlText() {
      return formatToHtml(this.text);
    }
  },

  watch: {
    commentWithForm() {
      this.toggleForm();
    },

    showCommentForm() {
      if (this.showCommentForm) {
        this.$emit("form-is-opened", this.id);
      }
    }
  },

  methods: {
    onReplyComment() {
      this.showCommentForm = true;
    },

    onSendComment(text) {
      console.log(text);
      this.$emit("comment-is-send", {
        parentId: this.id,
        text
      });

      this.showCommentForm = false;
    },

    toggleForm() {
      if (this.commentWithForm === this.id) this.showCommentForm = true;
      else this.showCommentForm = false;
    }
  },

  mounted() {
    this.toggleForm();
  }
};
</script>

<style lang="scss">
.Comment {
  font-size: 1.4rem;

  &-Header {
    position: relative;
    max-width: 60%;
    margin-bottom: 17px;
    padding-left: 47px;

    @media (max-width: $screen-tablet) {
      max-width: 100%;
    }

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      background-color: var(--color-border);
    }
  }

  &-Author {
    margin-bottom: 6px;
    font-weight: 700;
  }

  &-Date {
    color: var(--text-color);
  }

  &-Content {
    max-width: 60%;
    margin-bottom: 10px;

    @media (max-width: $screen-tablet) {
      max-width: 100%;
    }
  }

  &-Send {
    text-align: right;
  }
}
</style>
