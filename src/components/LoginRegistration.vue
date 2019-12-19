<template>
  <form class="Login-Form Form" @submit.prevent="onSubmit">
    <InputEmail @field-validated="onValidateField" />
    <InputPassword @field-validated="onValidateField" />
    <div class="Form-Row">
      <div class="Form-Label">
        Код с картинки
      </div>
      <div class="Form-Value Form-Value--size_min">
        <div class="Form-Captcha">
          <img src="./../assets/captcha.png" alt="" />
        </div>
        <div class="Form-Input--size_min">
          <input class="Input" type="text" />
        </div>
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
import BaseButton from "@/components/BaseButton.vue";
import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";

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

  mixins: [formSubmit]
};
</script>
