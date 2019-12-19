<template>
  <form class="Login-Form Form">
    <InputEmail />
    <InputPassword />
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
      <BaseButton>
        Зарегистрироваться
      </BaseButton>
    </div>
  </form>
</template>

<script>
//import { formValidation } from "@/mixins/formValidation";
import BaseButton from "@/components/BaseButton.vue";
import InputEmail from "@/components/InputEmail.vue";
import InputPassword from "@/components/InputPassword.vue";

export default {
  components: {
    BaseButton,
    InputEmail,
    InputPassword
  }
};
</script>
