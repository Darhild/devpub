<template>
  <form
    v-if="!authErrors.code"
    class="Login-Form Form"
    @submit.prevent="onSubmit"
  >
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
        Сменить пароль
      </BaseButton>
    </div>
  </form>
  <div v-else class="Login-Text">
    Ссылка для восстановления пароля устарела. <br />
    <router-link to="/login/restore-password"
      >Запросить ссылку снова</router-link
    >
  </div>
</template>

<script>
import formSubmit from "@/mixins/formSubmit";
import BaseButton from "@/components/BaseButton.vue";
import InputPassword from "@/components/InputPassword.vue";

export default {
  components: {
    BaseButton,
    InputPassword
  },

  mixins: [formSubmit],

  data() {
    return {
      requiredFields: "password,repeatPassword"
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
