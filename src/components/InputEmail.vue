<template>
  <div class="Form-Row">
    <div class="Form-Label">
      Email
    </div>
    <div class="Form-Value">
      <input
        v-model="email"
        class="Input"
        :class="{
          'Input--state_invalid': $v.email.$dirty && $v.email.$invalid
        }"
        type="email"
        @input="onInput"
      />
      <div v-if="$v.email.$dirty && errorMessage" class="Input-Error">
        {{ errorMessage }}
      </div>
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
  },

  methods: {
    onInput() {
      this.$v.email.$touch();
      this.$emit("field-validated", { email: !this.$v.email.$invalid });
    }
  }
};
</script>
