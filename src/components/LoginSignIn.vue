<template>
  <div class="Login-SignIn">
    <form class="Login-Form Form" @submit.prevent="onSubmit">
      <InputEmail />
      <InputPassword :withRepeat="false" />
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

  computed: {
    submitStatus() {
      console.log(this.$v);
      if (!this.$v.$invalid) return "success";
      return "error";
    }
  },

  mixins: [formSubmit]
};
</script>

<style lang="scss">
.Login {
  &-Links {
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
    border-top: 1px solid var(--color-layout-primary);
  }

  &-Link {
    font-size: 1.4rem;
    color: var(--color-light);
  }
}
</style>
