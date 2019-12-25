<template>
  <main class="EditText Wrapper" :class="className">
    <div class="Title EditText-Title">
      <template v-if="editPost">
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
        <div class="EditText-Input">
          <input
            v-model="addedTag"
            @input="onInput($event.target.value)"
            @keyup.enter="onAddTag($event.target.value)"
            @keyup.up="onArrowUp"
            @keyup.down="onArrowDown"
            class="Input"
            type="text"
          />
          <div
            class="Input-Autocomplete Autocomplete"
            v-if="wordsForAutocomplete.length && isOpen"
          >
            <div
              :class="[
                wordsCounter === index
                  ? 'Autocomplete-Item Autocomplete-Item--state_highlighted'
                  : 'Autocomplete-Item'
              ]"
              v-for="(tag, index) in wordsForAutocomplete"
              :key="tag.id"
              @click="onClickWord(tag.name)"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>
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
              <use xlink:href="./../assets/icons-sprite.svg#delete"></use>
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
import axios from "axios";
import { SERVER_URL } from "./../env";
import getTags from "@/mixins/getTags";
import { formatDateTime, formatToHtml } from "@/utils";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

export default {
  props: {
    className: {
      type: String,
      required: false
    },
    editPost: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  components: {
    BaseButton
  },

  metaInfo() {
    return {
      title: this.editPost
        ? "Редактирование публикации | DevPub - рассказы разработчиков"
        : "Добавление новой публикации | DevPub - рассказы разработчиков"
    };
  },

  mixins: [getTags],

  data() {
    return {
      active: 0,
      article: {},
      articleTags: [],
      wordsForAutocomplete: [],
      wordsCounter: 0,
      isOpen: true,
      title: "",
      date: "",
      addedTag: "",
      tags: [],
      errors: []
    };
  },

  computed: {
    tagNames() {
      return this.tags.map(tag => tag.name);
    }
  },

  watch: {
    $route() {
      if (this.editPost) this.getPostContent();
      else this.clearContent();
    }
  },

  methods: {
    onInput(value) {
      if (value !== "") {
        this.wordsForAutocomplete = this.tags.filter(
          item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      } else this.wordsForAutocomplete = [];
    },

    onArrowDown() {
      if (this.wordsCounter < this.wordsForAutocomplete.length - 1)
        this.wordsCounter++;
    },

    onArrowUp() {
      if (this.wordsCounter > 0) this.wordsCounter--;
    },

    onAddTag(value) {
      if (this.wordsForAutocomplete.length) {
        this.addedTag = this.wordsForAutocomplete[this.wordsCounter].name;
        this.wordsCounter = -1;
        this.wordsForAutocomplete = [];
      } else {
        if (!this.articleTags.includes(value)) {
          this.articleTags.push(value.replace(",", ""));
          this.addedTag = "";
        }
      }
    },

    onDeleteTag(value) {
      this.articleTags = this.articleTags.filter(tag => tag !== value);
    },

    onClickWord(value) {
      this.addedTag = value;
      this.wordsForAutocomplete = [];
    },

    onCancel() {
      this.$router.go(-1);
    },

    onSave() {
      const text = this.$refs.editor.getContent();
      let url = `${SERVER_URL}/api/post`;
      let action = "post";
      let date = this.date;

      if (this.editPost) {
        url += `/${this.article.id}`;
        action = "put";
      }

      if (!this.editPost && new Date(date) < new Date()) {
        date = new Date();
      } else date = date.replace("T", " ");

      axios[action](url, {
        time: this.date,
        active: this.active,
        title: this.title,
        tags: this.tags.toString(),
        text
      });

      this.$refs.editor.setContent("");
    },

    getPostContent() {
      axios
        .get(`${SERVER_URL}/api/post`)
        .then(res => {
          const article = res.data.posts.find(
            article => article.id == this.$route.params.id
          );

          this.article = article;
          this.title = article.title;
          this.date = formatDateTime(new Date(article.time));
          this.articleTags = [...article.tags];
          this.$refs.editor.setContent(formatToHtml(article.text));
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    clearContent() {
      this.article = null;
      this.title = "";
      this.date = formatDateTime(new Date());
      this.tags = [];
      this.$refs.editor.setContent("");
    }
  },

  mounted() {
    if (this.editPost) this.getPostContent();
    else this.clearContent();
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
    }
  }

  &-AddTags {
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
