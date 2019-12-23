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
import axios from "axios";
import { SERVER_URL } from "./../env";

export default {
  props: {
    className: String
  },

  data() {
    return {
      tags: [],
      fontSize: 3,
      marginLeft: 50,
      marginBottom: 15,
      padding: 25,
      isLoading: true,
      errors: []
    };
  },

  methods: {
    onClickTag(value) {
      this.$emit("select-tag", value);
    }
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api/tag`)
      .then(res => {
        this.tags = res.data.tags;
      })
      .catch(e => {
        this.errors.push(e);
      })
      .finally(() => (this.isLoading = false));
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
