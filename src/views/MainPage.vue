<template>
  <main class="MainPage">
    <Articles
      :navItems="navItems"
      :className="'MainPage-Articles'"
      :tagSelected="tagSelected"
    />
    <Tags className="MainPage-Tags" @select-tag="onClickTag" />
  </main>
</template>

<script>
import Articles from "@/components/Articles.vue";
import Tags from "@/components/Tags.vue";

export default {
  name: "mainPage",
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
          name: "Самые обсуждаемые",
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

  @media (max-width: $screen-tablet) {
    grid-template-columns: 1fr;
  }

  &-Tags {
    @media (max-width: $screen-tablet) {
      display: none;
    }
  }
}
</style>
