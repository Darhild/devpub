<template>
  <div class="Comment" :class="className">
    <div class="Comment-Header">
      <div
        :class="[
          photo ? 'Comment-Avatar' : 'Comment-Avatar Comment-Avatar--default'
        ]"
      >
        <img v-if="photo" :src="require(`@/${photo}`)" alt="" />
      </div>
      <div class="Comment-Data">
        <div class="Comment-Author">
          {{ author }}
        </div>
        <div class="Comment-Date">
          {{ time }}
        </div>
      </div>
    </div>
    <div class="Comment-Content">
      <span v-html="htmlText"></span>
    </div>
    <div class="Comment-Send">
      <BaseButton
        v-if="isAuth && this.user.id !== authorId"
        :onClickButton="onReplyComment"
        :className="'Button--size_xs'"
      >
        Ответить
      </BaseButton>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { formatToHtml } from "@/utils";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

export default {
  components: {
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
    photo: {
      type: String,
      required: false
    },
    authorId: {
      type: Number,
      required: true
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
    className: {
      type: String,
      required: false
    }
  },

  computed: {
    htmlText() {
      return formatToHtml(this.text);
    },

    ...mapGetters(["isAuth", "user"])
  },

  methods: {
    ...mapMutations(["setNametoReply", "setCommentParent"]),

    onReplyComment() {
      this.setCommentParent(this.id);
      this.setNametoReply(this.author);
    }
  }
};
</script>

<style lang="scss">
.Comment {
  font-size: 1.4rem;

  &-Header {
    display: flex;
    max-width: 60%;
    margin-bottom: 17px;

    @media (max-width: $screen-tablet) {
      max-width: 100%;
    }
  }

  &-Avatar {
    margin-right: 10px;

    &--default {
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
    margin-bottom: 10px;
  }

  &-Send {
    text-align: right;
  }
}
</style>
