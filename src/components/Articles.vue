<template>
  <div class="Articles" :class="className">
    <BaseNavbar className="Articles-Nav" :navItems="navItems" />
    <div class="Articles-Content">
      <ArticlePreview />
    </div>
  </div>
</template>

<script>
import BaseNavbar from "@/components/BaseNavbar.vue";
import ArticlePreview from "@/components/ArticlePreview.vue";

export default {
  components: {
    BaseNavbar,
    ArticlePreview
  },

  props: {
    className: String
  },

  data() {
    return {
      navItems: ["Новые", "Самые обсуждаемые", "Лучшие", "Старые"],
      articlesNumber: 4
    };
  },

  mounted() {}
};
</script>

<style lang="scss">
.Articles {
  padding: 14px 20px 0 50px;

  &-Nav {
    padding: 0 34px 23px 16px;
  }

  &-Content {
    padding: 50px 7px 0 0;
    border-right: 1px solid var(--color-layout-primary);
  }
}
</style>
