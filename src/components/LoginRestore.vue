<template>
  <form v-if="!emailIsValid" class="Login-Form Form" @submit.prevent="onSubmit">
    <InputEmail
      :restoreError="authErrors.restoreError"
      @field-validated="onValidateField"
    />
    <div class="Form-Submit">
      <BaseButton
        :onClickButton="onSubmit"
        :disabled="submitStatus !== 'success' || authErrors.restoreError"
      >
        Далее
      </BaseButton>
    </div>
  </form>
  <div v-else class="Login-Text">
    Ссылка на форму восстановления пароля отправлена на ваш email.<br />
    Перейдите по ней и задайте новый пароль для входа в аккаунт.
  </div>
</template>

<script>
import formSubmit from "@/mixins/formSubmit";
const InputEmail = () =>
  import(/* webpackChunkName: "inputEmail" */ "@/components/InputEmail.vue");
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

export default {
  components: {
    BaseButton,
    InputEmail
  },

  mixins: [formSubmit],

  data() {
    return {
      requiredFields: "email",
      emailIsValid: false
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
        .dispatch("restorePassword", this.validatedFields)
        .then(() => {
          //if (!this.authErrors.restoreError) this.emailIsValid = true;
          this.emailIsValid = true;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
