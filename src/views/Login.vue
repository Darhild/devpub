<template>
  <main class="Login Wrapper">
    <div class="Login-Section">
      <LoginHeader>
        {{ title }}
      </LoginHeader>
      <router-view />
    </div>
  </main>
</template>

<script>
const LoginHeader = () =>
  import(/* webpackChunkName: "loginHeader" */ "@/components/LoginHeader.vue");

export default {
  computed: {
    title() {
      switch (this.$route.path) {
        case "/login":
          return "Вход";
        case "/login/registration":
          return "Регистрация";
        case "/login/restore-password":
          return "Восстановление пароля";
        case "/login/change-password":
          return "Смена пароля";
        default:
          return "";
      }
    }
  },

  components: {
    LoginHeader
  },

  mounted() {
    this.$store.commit("clearAuthErrors");
  }
};
</script>

<style lang="scss">
.Login {
  display: flex;
  justify-content: center;
  max-width: 450px;
  padding-top: 53px;

  @media (max-width: $screen-mobile) {
    width: 100%;
    padding-right: 25px;
    padding-left: 25px;
  }

  &-Section {
    padding-bottom: 25px;
    width: 100%;
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

    a {
      text-decoration: underline;
    }
  }

  &-Errors {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
}
</style>
