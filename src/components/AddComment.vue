<template>
  <div class="AddComment">
    <div v-if="!isReply" class="Title AddComment-Title">
      Добавить комментарий
    </div>
    <AddText
      :className="'AddComment-Edit'"
      :replyTo="replyTo"
      @comment-is-send="onSendComment"
    />
    <div class="AddComment-Send">
      <BaseButton :onClickButton="onShouldSendComment">
        Отправить
      </BaseButton>
    </div>
  </div>
</template>

<script>
const AddText = () =>
  import(/* webpackChunkName: "addText" */ "@/components/AddText.vue");
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

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
    },

    replyTo: {
      type: String,
      required: true,
      default: ""
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
  margin-top: 15px;
  margin-bottom: 55px;

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
