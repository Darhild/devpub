<template>
  <div class="Moderation">
    <Articles :navItems="navItems" :forModeration="true" }, />
  </div>
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
