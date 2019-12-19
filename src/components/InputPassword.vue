<template>
  <div>
    <div class="Form-Row">
      <div class="Form-Label">
        Пароль
      </div>
      <div class="Form-Value">
        <input
          v-model="password"
          class="Input"
          :class="{ 'Input--state_invalid': this.$v.password.$invalid }"
          type="password"
        />
        <div v-if="errorMessagePassword" class="Input-Error">
          {{ errorMessagePassword }}
        </div>
      </div>
    </div>
    <div v-if="withRepeat" class="Form-Row">
      <div class="Form-Label">
        Повторите пароль
      </div>
      <div class="Form-Value">
        <input
          v-model="samePassword"
          class="Input"
          :class="{ 'Input--state_invalid': this.$v.repeatPassword.$invalid }"
          type="password"
        />
        <div v-if="errorMessageRepeat" class="Input-Error">
          {{ errorMessageRepeat }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  props: {
    withRepeat: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data() {
    return {
      password: "",
      repeatPassword: ""
    };
  },

  computed: {
    errorMessagePassword() {
      if (!this.$v.password.minLength) {
        return `Пароль слишком короткий`;
      }

      if (this.withRepeat && !this.$v.repeatPassword.sameAsPassword) {
        return "Пароли не совпадают!";
      }

      if (!this.$v.password.required) {
        return "Заполните это поле";
      }

      return "";
    },

    errorMessageRepeat() {
      if (!this.$v.repeatPassword.sameAsPassword) {
        return "Пароли не совпадают!";
      }

      if (!this.$v.repeatPassword.required) {
        return "Заполните это поле";
      }

      return "";
    }
  },

  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  }
};
</script>
