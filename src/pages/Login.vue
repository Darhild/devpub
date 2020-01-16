<template>
  <main
    :class="[
      path === 'restorePassword' ? 'Login Login--wide Wrapper' : 'Login Wrapper'
    ]"
  >
    <div class="Login-Section">
      <LoginHeader>
        {{ title }}
      </LoginHeader>
      <router-view />
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
const LoginHeader = () =>
  import(/* webpackChunkName: "loginHeader" */ "@/components/LoginHeader.vue");

export default {
  name: "Login",

  props: {
    className: {
      type: String,
      required: false
    }
  },

  computed: {
    ...mapGetters(["isAuth"]),

    path() {
      return this.$route.name;
    },

    title() {
      switch (this.$route.path) {
        case "/login":
          return "Вход";
        case "/login/registration":
          return "Регистрация";
        case "/login/restore-password":
          return "Восстановление пароля";
        default:
          return "Смена пароля";
      }
    }
  },

  watch: {
    isAuth() {
      if (this.isAuth) {
        this.$router.push("/");
      }
    }
  },

  methods: {
    ...mapMutations(["clearAuthErrors"])
  },

  components: {
    LoginHeader
  },

  mounted() {
    this.clearAuthErrors();
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

  &--wide {
    max-width: 500px;
  }
}
</style>
