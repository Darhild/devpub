<template>
  <main class="Moderation Wrapper">
    <Articles :navItems="navItems" :forModeration="true" }, />
  </main>
</template>

<script>
const Articles = () =>
  import(/* webpackChunkName: "articles" */ "@/components/Articles.vue");

export default {
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
