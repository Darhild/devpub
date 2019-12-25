<template>
  <div
    class="Autocomplete"
    :class="className"
    v-if="wordsForAutocomplete.length"
  >
    <div
      :class="[
        wordsCounter === index
          ? 'Autocomplete-Item Autocomplete-Item--state_highlighted'
          : 'Autocomplete-Item'
      ]"
      v-for="(word, index) in wordsForAutocomplete"
      :key="word.id"
      @click="onSelectWord(word.name)"
    >
      {{ word.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: false
    },
    wordsForAutocomplete: {
      type: Array,
      required: true
    },
    searched: {
      type: String,
      required: true,
      default: ""
    },
    wordsCounter: {
      type: Number,
      required: true,
      default: 0
    }
  },

  methods: {
    onSelectWord(value) {
      this.$emit("word-selected", value);
    }
  }
};
</script>

<style lang="scss">
.Autocomplete {
  position: absolute;
  width: 100%;
  text-align-last: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  &-Item {
    padding: 5px 12px;
    font-size: 13px;
    line-height: 15px;
    background-color: var(--color-lightest);
    cursor: pointer;

    &--state_highlighted {
      background-color: var(--color-layout-primary);
    }

    &:hover {
      background-color: var(--color-layout-primary);
    }
  }
}
</style>
