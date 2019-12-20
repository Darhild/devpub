<template>
  <div class="Login">
    <div class="Login-Section">
      <LoginHeader>
        {{ title }}
      </LoginHeader>
      <router-view />
    </div>
  </div>
</template>

<script>
import LoginHeader from "@/components/LoginHeader.vue";

export default {
  components: {
    LoginHeader
  },
  computed: {
    title() {
      return this.$route.path.indexOf("password") !== -1
        ? "Восстановление пароля"
        : "Вход";
    }
  }
};
</script>

<style lang="scss">
.Login {
  display: flex;
  justify-content: center;
  padding-top: 53px;

  &-Section {
    padding-bottom: 25px;

    @media (max-width: 500px) {
      width: 100%;
      padding-right: 25px;
      padding-left: 25px;
    }
  }

  &-Form {
    width: 100%;
    padding-bottom: 13px;
  }

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

  &-Link--color_active {
    font-size: 1.2rem;
    color: var(--color-primary);

    &:visited {
      color: var(--color-primary);
    }
  }

  &-Text {
    font-size: 1.4rem;
  }

  &-Errors {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
}
</style>
