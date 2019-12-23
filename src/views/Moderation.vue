<template>
  <main class="Moderation Wrapper">
    <Articles :navItems="navItems" :forModeration="true" }, />
  </main>
</template>

<script>
const Articles = () =>
  import(/* webpackChunkName: "articles" */ "@/components/Articles.vue");

export default {
  metaInfo: {
    title: "Модерирование публикаций | DevPub - рассказы разработчиков"
  },

  components: {
    Articles
  },

  data() {
    return {
      navItems: ["Новые", "Отклоненные", "Утвержденные"]
    };
  }
};
</script>
