<template>
  <form class="Login-Form Form" @submit.prevent="onSubmit">
    <InputEmail :error="authErrors.email" @field-validated="onValidateField" />
    <InputPassword
      :error="authErrors.password"
      @field-validated="onValidateField"
    />
    <Captcha
      :src="image"
      :error="authErrors.captcha"
      @field-validated="onValidateField"
    />
    <div class="Form-Submit">
      <BaseButton
        :onClickButton="onSubmit"
        :disabled="submitStatus !== 'success'"
      >
        Зарегистрироваться
      </BaseButton>
    </div>
  </form>
</template>

<script>
import formSubmit from "@/mixins/formSubmit";
import captcha from "@/mixins/captcha";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");
const InputEmail = () =>
  import(/* webpackChunkName: "inputEmail" */ "@/components/InputEmail.vue");
const Captcha = () =>
  import(/* webpackChunkName: "captcha" */ "@/components/BaseCaptcha.vue");
const InputPassword = () =>
  import(
    /* webpackChunkName: "inputPassword" */ "@/components/InputPassword.vue"
  );

export default {
  components: {
    BaseButton,
    InputEmail,
    InputPassword,
    Captcha
  },

  data() {
    return {
      requiredFields: "secret,email,password,repeatPassword,captcha"
    };
  },

  mixins: [formSubmit, captcha],

  computed: {
    authErrors() {
      return this.$store.getters.authErrors;
    }
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch("register", this.validatedFields)
        .then(() => {
          if (!Object.keys(this.authErrors).length) this.$router.push("/login");
        })
        .catch(e => this.serverErrors.push(e));
    }
  },

  metaInfo() {
    return {
      title: this.blogInfo
        ? `Регистрация | ${this.blogInfo.title} - ${this.blogInfo.subtitle}`
        : "Регистрация"
    };
  }
};
</script>
