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
}
</style>
