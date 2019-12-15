<template>
  <div class="Login-SignIn">
    <form class="Login-Form Form">
      <div class="Form-Row">
        <div class="Form-Label">
          Email или логин
        </div>
        <div class="Form-Value">
          <input class="Input" type="text" />
        </div>
      </div>
      <div class="Form-Row">
        <div class="Form-Label">
          Пароль
        </div>
        <div class="Form-Value">
          <input class="Input" type="password" />
        </div>
      </div>
      <div class="Form-Submit">
        <BaseButton>
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
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton
  }
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
