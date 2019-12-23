<template>
  <div class="Form-Row">
    <div class="Form-Label">
      Код с картинки
    </div>
    <div class="Form-Value Form-Value--captcha">
      <div class="Form-Captcha">
        <img :src="src" alt="" />
      </div>
      <div class="Input-Wrapper">
        <input
          v-model="captcha"
          class="Input"
          :class="{
            'Input--state_invalid':
              ($v.captcha.$dirty && $v.captcha.$invalid) || error
          }"
          type="text"
          @input="onInput"
        />
        <div v-if="$v.captcha.$dirty && errorMessage" class="Input-Error">
          {{ errorMessage }}
        </div>
        <div v-if="error" class="Input-Error">{{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  props: {
    src: {
      type: String,
      required: true,
      default: ""
    },
    error: {
      type: String,
      required: false
    }
  },

  data() {
    return {
      captcha: ""
    };
  },

  computed: {
    errorMessage() {
      if (!this.$v.captcha.required) {
        return "Заполните это поле";
      }

      return "";
    }
  },

  validations: {
    captcha: {
      required
    }
  },

  methods: {
    onInput() {
      this.$v.captcha.$touch();
      let value = this.$v.captcha.$invalid ? false : this.captcha;
      this.$emit("field-validated", { captcha: value });
    }
  }
};
</script>

