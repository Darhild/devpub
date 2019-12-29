/* eslint-disable no-constant-condition */
<template>
  <div class="Autocomplete" :class="className">
    <input
      v-model="searchedWord"
      @input="onInput($event.target.value)"
      @keyup.enter="onSelectWord($event.target.value)"
      @keyup.up="onArrowUp"
      @keyup.down="onArrowDown"
      class="Input"
      type="text"
    />
    <div class="Autocomplete-Inner" v-if="wordsForAutocomplete.length">
      <div
        :class="[
          wordsCounter === index
            ? 'Autocomplete-Item Autocomplete-Item--state_highlighted'
            : 'Autocomplete-Item'
        ]"
        v-for="(word, index) in wordsForAutocomplete"
        :key="word.id"
        @click="onClickWord(word.name)"
      >
        {{ word.name }}
      </div>
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
    words: {
      type: Array,
      required: false
    }
  },

  data() {
    return {
      searchedWord: "",
      wordsForAutocomplete: [],
      wordsCounter: -1
    };
  },

  watch: {
    searchedWord() {
      if (this.searchedWord === "") this.wordsCounter = -1;
    },

    clearWord() {
      if (this.clearWord) this.searchedWord = "";
      this.$emit("clear-word");
    }
  },

  methods: {
    onInput(value) {
      if (value !== "") {
        this.wordsForAutocomplete = this.words.filter(
          item => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
      } else this.wordsForAutocomplete = [];
    },

    onSelectWord() {
      let value =
        this.wordsForAutocomplete.length && this.wordsCounter > -1
          ? this.wordsForAutocomplete[this.wordsCounter].name
          : this.searchedWord;
      this.$emit("word-selected", value);
      this.wordsCounter = -1;
      this.wordsForAutocomplete = [];
      this.searchedWord = "";
    },

    onClickWord(word) {
      this.$emit("word-selected", word);
      this.wordsForAutocomplete = [];
      this.searchedWord = "";
    },

    onArrowDown() {
      if (this.wordsCounter < this.wordsForAutocomplete.length - 1)
        this.wordsCounter++;
    },

    onArrowUp() {
      if (this.wordsCounter > -1) this.wordsCounter--;
    }
  }
};
</script>

<style lang="scss">
.Autocomplete {
  position: relative;

  &-Inner {
    position: absolute;
    width: 100%;
    text-align-last: left;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

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
