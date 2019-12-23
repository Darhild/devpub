<template>
  <div class="Form-Passwords">
    <div class="Form-Row">
      <div class="Form-Label">
        Пароль
      </div>
      <div class="Form-Value">
        <input
          v-model="password"
          class="Input"
          :class="{
            'Input--state_invalid':
              ($v.password.$dirty && $v.password.$invalid) || error
          }"
          type="password"
          @input="onInput('password')"
        />
        <div
          v-if="($v.password.$dirty && errorMessagePassword) || error"
          class="Input-Error"
        >
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
          v-model="repeatPassword"
          class="Input"
          :class="{
            'Input--state_invalid':
              $v.repeatPassword.$dirty && $v.repeatPassword.$invalid
          }"
          type="password"
          @input="onInput('repeatPassword')"
        />
        <div
          v-if="$v.repeatPassword.$dirty && errorMessageRepeat"
          class="Input-Error"
        >
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
    },
    error: {
      type: String,
      required: false
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
  },

  methods: {
    onInput(value) {
      this.$v[value].$touch();
      let passValue = this.$v.password.$invalid ? false : this.password;
      let repValue = this.$v.repeatPassword.$invalid
        ? false
        : this.repeatPassword;

      if (value === "password")
        this.$emit("field-validated", { password: passValue });
      else
        this.$emit("field-validated", {
          repeatPassword: repValue
        });
    }
  }
};
</script>
