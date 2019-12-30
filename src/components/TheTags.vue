<template>
  <div class="Tags" :class="className">
    <div class="Tags-Title Title">
      Темы
    </div>
    <div class="Tags-Content">
      <div
        class="Tag"
        v-for="tag in tags"
        :key="tag.id"
        :style="{
          marginBottom: marginBottom * tag.weight + 'px',
          marginLeft: marginLeft * tag.weight + 'px',
          paddingRight: padding * tag.weight + 'px',
          paddingLeft: padding * tag.weight + 'px',
          fontSize: fontSize * tag.weight + 'rem'
        }"
        @click="onClickTag(tag.name)"
      >
        #{{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: {
    className: String
  },

  data() {
    return {
      fontSize: 3,
      marginLeft: 50,
      marginBottom: 15,
      padding: 25
    };
  },

  computed: {
    ...mapGetters(["tags"])
  },

  methods: {
    ...mapMutations(["setSelectedTag"]),
    ...mapActions(["getTags"]),

    onClickTag(value) {
      this.$router.push(`/tag/${value}`);
    }
  },

  mounted() {
    this.getTags();
  }
};
</script>

<style lang="scss">
.Tags {
  padding: 15px 0 18px 6px;

  &-Title {
    margin-bottom: 30px;
  }
}
</style>
