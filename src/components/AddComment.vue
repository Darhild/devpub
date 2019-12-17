<template>
  <div class="AddComment">
    <div v-if="!isReply" class="Title AddComment-Title">
      Добавить комментарий
    </div>
    <AddText :className="'AddComment-Edit'" @comment-is-send="onSendComment" />
    <div class="AddComment-Send">
      <BaseButton :onClickButton="onShouldSendComment">
        Отправить
      </BaseButton>
    </div>
  </div>
</template>

<script>
import AddText from "@/components/AddText.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    AddText,
    BaseButton
  },

  props: {
    isReply: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  methods: {
    onShouldSendComment() {
      this.$store.commit("sendComment");
    },

    onSendComment(text) {
      this.$emit("comment-is-send", text);
    }
  }
};
</script>

<style lang="scss">
.AddComment {
  width: 95%;
  margin-top: 15px;
  margin-bottom: 55px;

  @media (max-width: $screen-tablet) {
    width: 100%;
  }

  &-Title {
    margin-bottom: 25px;
  }

  &-Edit {
    margin-bottom: 16px;
  }

  &-Send {
    text-align: right;
  }
}
</style>
