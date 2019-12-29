<template>
  <div id="app">
    <ErrorModal />
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "@/components/TheHeader.vue";
import Footer from "@/components/TheFooter.vue";
const ErrorModal = () =>
  import(/* webpackChunkName: "errorModal" */ "@/components/ErrorModal.vue");
import "vueditor/dist/style/vueditor.min.css";

export default {
  name: "app",

  components: {
    Header,
    Footer,
    ErrorModal
  },

  computed: {
    errors() {
      return this.$store.getters.errors;
    }
  },

  watch: {
    errors() {
      if (
        this.errors.payload.response &&
        this.errors.payload.response.status === 404
      ) {
        this.$router.push("/404");
      }
    }
  },

  methods: {
    ...mapActions(["getSettings", "getUser", "getYears", "getBlogInfo"])
  },

  mounted() {
    this.getBlogInfo();
    this.getSettings();
    this.getUser();
  }
};
</script>

<style lang="scss">
/* roboto-italic - cyrillic_latin_cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  src: local("Roboto Italic"), local("Roboto-Italic"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-italic.woff2")
      format("woff2")
      url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-italic.woff")
      format("woff");
}
/* roboto-regular - cyrillic_latin_cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  src: local("Roboto"), local("Roboto-Regular"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-regular.woff2")
      format("woff2"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-regular.woff")
      format("woff");
}
/* roboto-500 - cyrillic_latin_cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  src: local("Roboto Medium"), local("Roboto-Medium"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-500.woff2")
      format("woff2"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-500.woff")
      format("woff");
}
/* roboto-700 - cyrillic_latin_cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  src: local("Roboto Bold"), local("Roboto-Bold"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-700.woff2")
      format("woff2"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-700.woff")
      format("woff");
}
/* roboto-500italic - cyrillic_latin_cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: italic;
  font-weight: 500;
  src: local("Roboto Medium Italic"), local("Roboto-MediumItalic"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-500italic.woff2")
      format("woff2"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-500italic.woff")
      format("woff");
}
/* roboto-700italic - cyrillic_latin_cyrillic-ext */
@font-face {
  font-family: "Roboto";
  font-style: italic;
  font-weight: 700;
  src: local("Roboto Bold Italic"), local("Roboto-BoldItalic"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-700italic.woff2")
      format("woff2"),
    url("./assets/fonts/roboto-v20-cyrillic_latin_cyrillic-ext-700italic.woff")
      format("woff");
}

:root {
  --color-primary: #4b4bee;
  --color-secondary: #ec4141;

  --color-layout-primary: #f2f2f2;
  --color-layout-dark: #171727;
  --color-highlight: rgba(236, 65, 65, 0.4);
  --color-lightest: #fff;
  --color-light: rgba(0, 0, 0, 0.3);
  --color-darkest: #000;
  --color-border: #c4c4c4;

  --text-faded: rgba(23, 23, 39, 0.4);
  --text-lighter: rgba(23, 23, 39, 0.7);
  --text-editor: #b3b3b3;

  --color-hover: #9595f5;
  --color-hover-editor: #fbbaba;
  --color-active: #6767ed;
  --color-visited: #121239;
}

html {
  font-size: 10px;
  font-weight: 400;
  line-height: 1.2;
}

body {
  margin: 0;
  padding: 0;
  overflow-y: scroll;
}

a {
  text-decoration: none;

  &:visited {
    color: inherit;
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

.Wrapper {
  min-width: $screen-min;
  max-width: $screen-desktop;
  width: 100%;
  margin-right: auto;
  margin-bottom: 45px;
  margin-left: auto;

  @media (max-width: $screen-desktop) {
    padding-right: 15px;
    padding-left: 15px;
  }
}

.Link {
  color: inherit;
  text-decoration: none;
}

.Input {
  width: 100%;
  padding: 4px 16px;
  background-color: var(--color-layout-primary);
  border: none;
  border-radius: 20px;

  &:focus {
    outline: none;
  }

  &:placeholder {
    font-size: 1.2rem;
    color: var(--text-faded);
  }

  &-Error {
    margin-top: 5px;
    font-size: 1.2rem;
    color: var(--color-secondary);
  }

  &--state_invalid {
    padding: 3px 15px;
    border: 1px solid var(--color-secondary);
  }
}

.Search {
  &-Wrapper {
    @media (max-width: $screen-mobile) {
      position: absolute;
      left: 0;
      top: 74px;
      width: 100%;
      height: 46px;
      background-color: var(--color-layout-primary);
      border-bottom: 1px solid var(--color-lightest);
    }
  }

  &-Input {
    height: 100%;
  }

  &-Close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 16px;
    height: 16px;
    fill: var(--color-darkest);
    cursor: pointer;
  }

  &-Icon {
    display: none;
    width: 25px;
    height: 25px;
    cursor: pointer;

    @media (max-width: $screen-mobile) {
      display: block;
    }
  }
}

.Title {
  font-size: 2.5rem;
  font-weight: 700;
}

.ServerInfo {
  margin-top: 25px;
  font-size: 1.4rem;
}

.Icon {
  width: 22px;
  height: 22px;

  @media (max-width: $screen-tablet) {
    width: 16px;
    height: 16px;
  }

  &--like {
    fill: var(--color-primary);
  }

  &--dislike {
    fill: var(--color-secondary);
    transform: rotate(180deg);
  }

  &--views {
    width: 34px;

    @media (max-width: $screen-tablet) {
      width: 25px;
    }
  }

  &--delete {
    width: 10px;
    height: 10px;
  }

  &--close {
    width: 20px;
    height: 20px;
    fill: var(--color-lightest);
  }

  &-Google {
    width: 34px;
    height: 32px;
  }

  &-Fb {
    width: 33px;
    height: 32px;
  }

  &-Vk {
    width: 33px;
    height: 31px;
  }
}

.Form {
  &-Row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 31px;

    @media (max-width: 500px) {
      display: block;
    }
  }

  &-Label {
    width: 40%;
    font-size: 1.4rem;

    @media (max-width: 500px) {
      width: 100%;
      margin-bottom: 10px;
    }
  }

  &-Value {
    width: 60%;

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  &-Value--captcha {
    display: flex;
    align-items: center;
  }

  &-Captcha {
    width: 100px;
    margin-right: 16px;
  }

  &-Submit {
    text-align: right;
  }
}

.CheckForm {
  &-Input {
    display: none;
    cursor: pointer;
  }

  &-Value {
    position: relative;
    margin-bottom: 15px;
    padding-top: 2px;
    padding-left: 25px;
    font-size: 1.4rem;
    cursor: pointer;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 18px;
      height: 18px;
      background-color: var(--color-layout-primary);
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &-Value:hover:before {
    background-color: var(--color-hover);
  }

  &-Input:checked + .CheckForm-Value:before {
    background-color: var(--color-active);
  }

  &-Title {
    margin-bottom: 5px;
    font-weight: 700;
  }
}

.Tag {
  display: inline-block;
  padding: 5px 16px;
  line-height: 117%;
  color: var(--color-lightest);
  text-transform: uppercase;
  text-decoration: underline;
  background-color: var(--color-primary);
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  &:active {
    background-color: var(--color-active);
  }
}

.vueditor {
  min-width: auto;
  border: none;
}

.vueditor .ve-toolbar {
  display: flex;
  flex-wrap: wrap;
  background-color: var(--color-layout-primary);
  border: none;
}

.vueditor .ve-toolbar div {
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

.ve-select {
  height: 31px;
  margin: 0;
  border: none;
  border-radius: 5px;
}

.vueditor [class^="icon"] {
  opacity: 1;
}

.ve-toolbar div:nth-child(1),
.ve-toolbar div:nth-child(4),
.ve-toolbar div:nth-child(10),
.ve-toolbar div:nth-child(15) {
  border-radius: 5px 0 0 5px;
}

.ve-toolbar div:nth-child(2),
.ve-toolbar div:nth-child(5),
.ve-toolbar div:nth-child(13),
.ve-toolbar div:nth-child(18) {
  border-radius: 0 5px 5px 0;
}

.ve-toolbar div:nth-child(4),
.ve-toolbar div:nth-child(6),
.ve-toolbar div:nth-child(8) {
  border-radius: 5px;
}

.ve-design {
  background-color: var(--color-lightest);
}

.ve-toolbar div.ve-divider {
  background-color: var(--color-layout-primary);
  border-right: none;
}

.vueditor .icon-link {
  width: 17px;
  height: 18px;
  background: url("./assets/img/vueditor/link.png");
}

.vueditor .icon-unlink {
  width: 17px;
  height: 18px;
  background: url("./assets/img/vueditor/unlink.png");
}

.vueditor .icon-table {
  width: 30px;
  height: 24px;
  background: url("./assets/img/vueditor/table.png");
}

.vueditor .icon-file-image-o {
  width: 22px;
  height: 22px;
  background: url("./assets/img/vueditor/pic.png");
}

.vueditor .icon-fullscreen {
  width: 26px;
  height: 26px;
  background: url("./assets/img/vueditor/full.png");
}

.vueditor .icon-code {
  width: 69px;
  height: 36px;
  background: url("./assets/img/vueditor/src.png");
}

.vueditor .icon-bold {
  width: 15px;
  height: 18px;
  background: url("./assets/img/vueditor/B.png");
}

.vueditor .icon-italic {
  width: 13px;
  height: 18px;
  background: url("./assets/img/vueditor/I.png");
}

.vueditor .icon-strikethrough {
  width: 17px;
  height: 36px;
  background: url("./assets/img/vueditor/S.png");
}

.vueditor .icon-eraser {
  width: 22px;
  height: 33px;
  background: url("./assets/img/vueditor/clear.png");
}

.vueditor .icon-list-ul {
  width: 22px;
  height: 17px;
  background: url("./assets/img/vueditor/ul.png");
}

.vueditor .icon-list-ol {
  width: 23px;
  height: 23px;
  background: url("./assets/img/vueditor/ol.png");
}

.vueditor .icon-indent {
  width: 26px;
  height: 23px;
  background: url("./assets/img/vueditor/indent.png");
}

.vueditor .icon-outdent {
  width: 29px;
  height: 23px;
  background: url("./assets/img/vueditor/outdent.png");
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
