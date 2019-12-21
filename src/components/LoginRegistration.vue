<template>
  <form class="Login-Form Form" @submit.prevent="onSubmit">
    <InputEmail @field-validated="onValidateField" />
    <InputPassword @field-validated="onValidateField" />
    <div class="Form-Row">
      <div class="Form-Label">
        Код с картинки
      </div>
      <div class="Form-Value Form-Value--captcha">
        <div class="Form-Captcha">
          <img src="./../assets/captcha.png" alt="" />
        </div>
        <input class="Input" type="text" />
      </div>
    </div>
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

  data() {
    return {
      requiredFields: "email,password,repeatPassword"
    };
  },

  mixins: [formSubmit],

  methods: {
    onSubmit() {
      this.$store
        .dispatch("register", this.validatedFields)
        .then(() => {
          if (this.authErrors.length) alert(this.authErrors);
          else this.$router.push("/login");
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
