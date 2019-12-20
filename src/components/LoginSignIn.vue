<template>
  <div class="Login-SignIn">
    <form class="Login-Form Form" @submit.prevent="onSubmit">
      <InputEmail @field-validated="onValidateField" />
      <InputPassword :withRepeat="false" @field-validated="onValidateField" />
      <div class="Form-Submit">
        <BaseButton
          :onClickButton="onSubmit"
          :disabled="submitStatus !== 'success'"
        >
          Войти
        </BaseButton>
      </div>
    </form>
    <div class="Login-Links">
      <router-link to="/login/restore-password" class="Login-Link">
        Забыли пароль?
      </router-link>
      <router-link to="/login/registration" class="Login-Link">
        Регистрация
      </router-link>
    </div>
  </div>
</template>

<script>
import formSubmit from "@/mixins/formSubmit";
import BaseButton from "@/components/BaseButton.vue";
import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";

export default {
  components: {
    BaseButton,
    InputEmail,
    InputPassword
  },

  mixins: [formSubmit],

  data() {
    return {
      requiredFields: "email,password"
    };
  },

  computed: {
    authErrors() {
      return this.$store.getters.authErrors;
    }
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch("login", this.validatedFields)
        .then(() => {
          if (this.authErrors.length) alert(this.authErrors.login);
          else this.$router.push("/");
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
