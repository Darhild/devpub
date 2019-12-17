<template>
  <div class="Moderation">
    <Articles :navItems="navItems" :forModeration="true" }, />
  </div>
</template>

<script>
import Articles from "@/components/Articles.vue";

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
