<template>
  <main class="MainPage">
    <Articles className="MainPage-Articles" />
    <Tags className="MainPage-Tags" />
  </main>
</template>

<script>
import Articles from "@/components/Articles.vue";
import Tags from "@/components/Tags.vue";

export default {
  name: "app",
  components: {
    Articles,
    Tags
  }
};
</script>

<style lang="scss">
.MainPage {
  display: grid;
  grid-template-columns: 7fr 3fr;
}
</style>
