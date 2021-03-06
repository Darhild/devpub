<template>
  <main class="EditText Wrapper" :class="className">
    <div class="Title EditText-Title">
      <template v-if="isEditPost">
        Редактирование публикации
      </template>
      <template v-else>
        Новая публикация
      </template>
    </div>
    <div class="EditText-Section EditText-Info">
      <div class="EditText-Date EditText-Section--size_half">
        <div class="EditText-Label EditText-Label--width_fixed">
          Дата публикации
        </div>
        <div class="EditText-Input">
          <input v-model="date" class="Input" type="datetime-local" />
        </div>
      </div>
      <div class="EditText-Hide CheckForm">
        <label class="CheckForm-Label">
          <input v-model="active" class="CheckForm-Input" type="checkbox" />
          <div class="CheckForm-Value">
            <div class="CheckForm-Info">
              Публикация скрыта
            </div>
          </div>
        </label>
      </div>
    </div>
    <div class="EditText-PostTitle EditText-Section">
      <div class="EditText-Label EditText-Label--width_fixed">
        Заголовок
      </div>
      <div class="EditText-Input">
        <input v-model="title" class="Input" type="text" />
      </div>
    </div>
    <div class="EditText-Text">
      <Vueditor ref="editor"></Vueditor>
    </div>
    <div class="EditText-Tags">
      <div
        class="EditText-Section EditText-Section--size_half EditText-AddTags"
      >
        <div class="EditText-Label">
          Теги:
        </div>
        <Autocomplete
          :words="tags"
          :className="'EditText-Input'"
          @word-selected="onAddTag"
        />
      </div>
      <div class="EditText-TagsArea">
        <div
          v-for="(tag, index) in articleTags"
          :key="index"
          class="Tag EditText-Tag"
        >
          <span class="Tag-Text">#{{ tag }}</span>
          <div class="Tag-Delete" @click="onDeleteTag(tag)">
            <svg class="Icon Icon--delete">
              <use xlink:href="@/assets/img/icons-sprite.svg#delete"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="EditText-Buttons">
      <BaseButton :onClickButton="onCancel">
        Отменить
      </BaseButton>
      <BaseButton :onClickButton="onSave">
        Сохранить
      </BaseButton>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { formatDateTime, formatToHtml } from "@/utils";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");
const Autocomplete = () =>
  import(
    /* webpackChunkName: "baseButton" */ "@/components/BaseAutocomplete.vue"
  );

export default {
  name: "EditPost",

  props: {
    className: {
      type: String,
      required: false
    },
    isEditPost: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  components: {
    BaseButton,
    Autocomplete
  },

  data() {
    return {
      active: 0,
      articleTags: [],
      title: "",
      date: "",
      addedTag: "",
      word: ""
    };
  },

  computed: {
    ...mapGetters([
      "article",
      "articleIsErrored",
      "tags",
      "viewedErrors",
      "blogInfo"
    ])
  },

  watch: {
    $route() {
      if (this.isEditPost) this.getPostContent();
      else this.clearContent();
    }
  },

  methods: {
    ...mapMutations(["setViewedErrors", "clearArticle"]),
    ...mapActions(["getTags", "getArticle", "addPost", "editPost"]),

    onAddTag(value) {
      if (!this.articleTags.includes(value)) {
        this.articleTags.push(value.replace(",", ""));
        this.addedTag = value;
      }
    },

    onDeleteTag(value) {
      this.articleTags = this.articleTags.filter(tag => tag !== value);
    },

    onCancel() {
      this.$router.go(-1);
    },

    async onSave() {
      const text = this.$refs.editor.getContent();
      let date = this.date;

      if (!this.isEditPost && new Date(date) < new Date()) {
        date = new Date();
      }

      date = date.replace("T", " ");

      const post = {
        time: date,
        active: Number(!this.active),
        title: this.title,
        tags: this.articleTags,
        text
      };

      let res;

      if (this.isEditPost) {
        res = await this.editPost({ post, url: this.$route.params.id });
      } else res = await this.addPost(post);

      if (res) this.clearContent();
    },

    async getPostContent() {
      await this.getArticle(this.$route.params.id);
      if (!this.articleIsErrored && this.article) {
        this.title = this.article.title;
        this.date = formatDateTime(new Date(this.article.time));
        this.articleTags = [...this.article.tags];
        this.$refs.editor.setContent(formatToHtml(this.article.text));
      }
    },

    clearContent() {
      this.clearArticle();
      this.articleTags = [];
      this.title = "";
      this.date = formatDateTime(new Date());
      this.$refs.editor.setContent("");
    }
  },

  mounted() {
    this.getTags();

    if (this.isEditPost) this.getPostContent();
    else this.clearContent();
  },

  metaInfo() {
    if (this.editPost) {
      return {
        title: this.blogInfo
          ? `Редактирование публикации | ${this.blogInfo.title} - ${this.blogInfo.subtitle}`
          : "Редактирование публикации"
      };
    } else {
      return {
        title: this.blogInfo
          ? `Добавление новой публикации | ${this.blogInfo.title} - ${this.blogInfo.subtitle}`
          : "Добавление новой публикации"
      };
    }
  }
};
</script>

<style lang="scss">
.EditText {
  padding-top: 15px;

  &-Title {
    margin-bottom: 30px;
  }

  &-Section {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;

    &--size_half {
      width: 50%;

      @media (max-width: $screen-tablet) {
        width: 100%;
      }
    }
  }

  &-Info {
    @media (max-width: $screen-tablet) {
      display: block;
    }
  }

  &-Input {
    position: relative;
    width: 100%;

    .Input {
      padding: 7px 16px;
    }
  }

  &-Date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;

    @media (max-width: $screen-tablet) {
      margin-bottom: 20px;
    }

    .Input {
      padding: 4px 16px;
    }
  }

  &-Label--width_fixed {
    width: 130px;

    @media (max-width: $screen-tablet) {
      width: auto;
    }
  }

  &-Label {
    flex-shrink: 0;
    margin-right: 10px;
    font-size: 1.4rem;
  }

  &-Hide {
    .CheckForm-Value {
      margin-bottom: 0;
      padding-left: 40px;
    }

    .CheckForm-Value:before {
      top: -7px;
      width: 28px;
      height: 28px;
    }
  }

  &-Text {
    margin-bottom: 20px;
    padding: 27px 10px 65px 10px;
    background-color: var(--color-layout-primary);
    border-radius: 20px;
  }

  &-Tags {
    display: flex;
    align-items: flex-start;

    @media (max-width: $screen-tablet) {
      display: block;
      margin-bottom: 25px;
    }
  }

  &-AddTags {
    flex-shrink: 0;
  }

  &-TagsArea {
    padding-left: 25px;
  }

  &-Tag {
    display: inline-flex;
    margin-right: 15px;
    margin-bottom: 10px;
    padding: 0;
    font-size: 1.2rem;
  }

  &-Buttons {
    display: flex;
    justify-content: space-between;
  }

  .ve-design {
    height: 250px;
  }

  .ve-code {
    min-height: 250px;
  }
}

.Tag {
  &-Text {
    display: inline-block;
    padding: 8px 0 7px 16px;
  }

  &-Delete {
    padding-left: 15px;
    padding: 8px 8px 7px 16px;
    fill: var(--color-lightest);
  }
}
</style>
