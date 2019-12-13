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
      padding: 25
    };
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api/tag`)
      .then(res => (this.tags = res.data))
      .catch(e => this.errors.push(e));
  }
};
</script>

<style lang="scss">
.Tags {
  padding: 18px 36px 18px 6px;

  &-Title {
    margin-bottom: 30px;
  }
}

.Tag {
  display: inline-block;
  padding: 5px 16px;
  line-height: 117%;
  color: var(--color-white);
  text-transform: uppercase;
  text-decoration: underline;
  background-color: var(--color-primary);
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-hover);
  }

  &:active {
    background-color: var(--color-active);
  }
}
</style>
