<template>
  <main class="MainPage Wrapper">
    <Articles
      :navItems="navItems"
      :className="'MainPage-Articles'"
      :tagSelected="tagSelected"
      :postByDate="postByDate"
    />
    <Tags className="MainPage-Tags" @select-tag="onClickTag" />
  </main>
</template>

<script>
const Articles = () =>
  import(/* webpackChunkName: "articles" */ "@/components/Articles.vue");
const Tags = () =>
  import(/* webpackChunkName: "tags" */ "@/components/Tags.vue");

export default {
  name: "mainPage",
  metaInfo: {
    title: "DevPub - рассказы разработчиков"
  },

  components: {
    Articles,
    Tags
  },

  data() {
    return {
      navItems: [
        {
          name: "Новые",
          value: "recent"
        },
        {
          name: "Самые обсуждаемые",
          value: "popular"
        },
        {
          name: "Лучшие",
          value: "best"
        },
        {
          name: "Старые",
          value: "early"
        }
      ],
      tagSelected: ""
    };
  },

  computed: {
    postByDate() {
      return this.$route.params.date ? this.$route.params.date : "";
    }
  },

  methods: {
    onClickTag(value) {
      this.tagSelected = value;
    }
  }
};
</script>

<style lang="scss">
.MainPage {
  display: grid;
  grid-template-columns: 7fr 3fr;
  grid-template-rows: repeat(auto-fit, 100%);
  flex-grow: 1;

  @media (max-width: $screen-tablet) {
    grid-template-columns: 1fr;
  }

  &-Tags {
    @media (max-width: $screen-tablet) {
      display: none;
    }
  }
}

.MainPage.Wrapper {
  margin-bottom: 0;
}
</style>
