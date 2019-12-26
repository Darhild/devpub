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
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");
const InputEmail = () =>
  import(/* webpackChunkName: "inputEmail" */ "@/components/InputEmail.vue");
const InputPassword = () =>
  import(
    /* webpackChunkName: "inputPassword" */ "@/components/InputPassword.vue"
  );

export default {
  components: {
    BaseButton,
    InputEmail,
    InputPassword
  },

  mixins: [formSubmit],

  data() {
    return {
      requiredFields: "email,password",
      errors: []
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
        .catch(e => this.errors.push(e));
    }
  },

  metaInfo: {
    title: "Авторизация | DevPub - рассказы разработчиков"
  }
};
</script>
