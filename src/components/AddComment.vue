<template>
  <div class="AddComment">
    <div v-if="!isReply" class="Title AddComment-Title">
      Добавить комментарий
    </div>
    <AddText :className="'AddComment-Edit'" />
    <div class="AddComment-Send">
      <BaseButton :onClickButton="makeComment">
        Отправить
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
    }
  },

  computed: {
    ...mapGetters(["article", "commentParent"])
  },

  methods: {
    ...mapActions(["sendComment"]),

    makeComment() {
      const comment = {
        parent_id: this.commentParent,
        post_id: this.article.id,
        text: this.editorContent
      };

      this.sendComment(comment);
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
