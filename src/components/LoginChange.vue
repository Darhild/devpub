<template>
  <form
    v-if="!authErrors.code"
    class="Login-Form Form"
    @submit.prevent="onSubmit"
  >
    <InputPassword
      :error="authErrors.password"
      @field-validated="onValidateField"
    />
    <Captcha
      :error="authErrors.captcha"
      :src="image"
      @field-validated="onValidateField"
    />
    <div class="Form-Submit">
      <BaseButton
        :onClickButton="onSubmit"
        :disabled="submitStatus !== 'success'"
      >
        Сменить пароль
      </BaseButton>
    </div>
  </form>
  <div v-else class="Login-Text">
    <span v-html="authErrors.code"></span>
  </div>
</template>

<script>
import formSubmit from "@/mixins/formSubmit";
import captcha from "@/mixins/captcha";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");
const Captcha = () =>
  import(/* webpackChunkName: "captcha" */ "@/components/Captcha.vue");
const InputPassword = () =>
  import(
    /* webpackChunkName: "inputPassword" */ "@/components/InputPassword.vue"
  );

export default {
  components: {
    BaseButton,
    InputPassword,
    Captcha
  },

  mixins: [formSubmit, captcha],

  data() {
    return {
      requiredFields: "code,password,repeatPassword,captcha"
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
        .dispatch("changePassword", this.validatedFields)
        .then(() => {
          if (!this.authErrors.length) this.$router.push("/login");
        })
        .catch(e => this.serverErrors.push(e));
    }
  },

  mounted() {
    this.validatedFields.code = this.$route.params.hash;
  }
};
</script>
