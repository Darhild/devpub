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
      <div v-if="restoreError" class="Login-Errors">
        <div class="Input-Error">
          {{ restoreError }}
        </div>
        <router-link
          to="/login/registration"
          class="Login-Link Login-Link--color_active"
        >
          Регистрация
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  props: {
    restoreError: {
      type: String,
      required: false,
      default: ""
    }
  },

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
      let value = this.$v.email.$invalid ? false : this.email;
      this.$emit("field-validated", { email: value });
    }
  }
};
</script>
