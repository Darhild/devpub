<template>
  <div class="Comment">
    <div class="Commet-Header">
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
    <div class="Comment-Send">
      <BaseButton :onClickButton="onReplyComment">
        Ответить
      </BaseButton>
    </div>
    <div v-if="showCommentForm" class="AddComment">
      <AddText
        :className="'AddComment-Edit'"
        :sendText="sendComment"
        @comment-is-send="onSendComment"
      />
      <div class="AddComment-Send">
        <BaseButton :onClickButton="(sendComment = true)">
          Отправить
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { formatToHtml } from "@/utils";
import AddText from "@/components/AddText.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
    AddText
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
    }
  },

  data() {
    return {
      showCommentForm: false,
      sendComment: false
    };
  },

  computed: {
    htmlText() {
      return formatToHtml(this.text);
    }
  },

  watch: {
    commentWithForm() {
      if (this.commentWithForm !== this.id) this.showCommentForm = false;
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
      this.$emit("comment-is-send", {
        parentId: this.id,
        text
      });

      this.showCommentForm = false;
    }
  }
};
</script>

<style lang="scss">
.AddComment {
  margin-bottom: 55px;

  &-Edit {
    margin-bottom: 16px;
  }

  &-Send {
    text-align: right;
  }
}
</style>
