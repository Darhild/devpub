<template>
  <div class="Form-Row">
    <div class="Form-Label">
      Email
    </div>
    <div class="Form-Value">
      <input
        v-model="email"
        class="Input"
        :class="{ 'Input--state_invalid': this.$v.email.$invalid }"
        type="email"
      />
      <div v-if="errorMessage" class="Input-Error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: ""
    };
  },

  computed: {
    errorMessage() {
      if (!this.$v.email.email) {
        return "Введите корректный email";
      }

      if (!this.$v.email.required) {
        return "Заполните это поле";
      }

      return "";
    }
  },

  validations: {
    email: {
      required,
      email
    }
  }
};
</script>
