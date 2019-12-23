<template>
  <header class="Header">
    <div class="Header-Wrapper">
      <router-link to="/" class="Header-Logo">
        <svg class="Logo">
          <use xlink:href="./../assets/icons-sprite.svg#logo"></use>
        </svg>
      </router-link>
      <div class="Header-Content">
        <router-link to="/" class="Header-Titles">
          <div class="Header-Title">
            DevPub
          </div>
          <div class="Header-Subtitle">
            Рассказы разрабочиков
          </div>
        </router-link>
        <div class="Header-Section">
          <div class="Header-Links">
            <router-link to="/" class="Link Header-Link">
              Главная
            </router-link>
            <router-link to="/calendar" class="Link Header-Link">
              Календарь
            </router-link>
          </div>
          <div class="Search Header-Search">
            <div
              v-if="searchIsOpen || windowWidth > 500"
              class="Search-Wrapper"
            >
              <input
                v-model="search"
                class="Input Search-Input"
                type="text"
                placeholder="Найти"
                @keyup.enter="onSearch"
              />
              <svg
                v-if="windowWidth < 500"
                class="Search-Close"
                @click="onCloseSearch"
              >
                <use xlink:href="./../assets/icons-sprite.svg#delete"></use>
              </svg>
            </div>
            <svg v-if="!searchIsOpen" class="Search-Icon" @click="onOpenSearch">
              <use xlink:href="./../assets/icons-sprite.svg#search"></use>
            </svg>
          </div>
          <UserSection v-if="isAuth" />
          <router-link v-else to="/login" class="Link Header-Login">
            Войти
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
const UserSection = () =>
  import(/* webpackChunkName: "userSection" */ "@/components/UserSection.vue");

export default {
  components: {
    UserSection
  },

  data() {
    return {
      postsForModeration: 0,
      search: "",
      searchIsOpen: false,
      windowWidth: window.innerWidth
    };
  },

  computed: {
    ...mapGetters(["isAuth"])
  },

  methods: {
    onSearch() {
      if (this.search) {
        this.$store.commit("setSearchQuery", this.search);
        this.search = "";
        if (this.$route.name !== "mainPage") {
          this.$router.push({ name: "mainPage" });
        }
      }
    },

    onOpenSearch() {
      this.searchIsOpen = true;
    },

    onCloseSearch() {
      this.searchIsOpen = false;
    }
  },

  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  }
};
</script>

<style lang="scss">
.Header {
  position: relative;
  color: var(--color-white);
  background-color: var(--color-layout-dark);

  &-Wrapper {
    display: flex;
    align-items: center;
    min-width: $screen-min;
    max-width: $screen-desktop;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding: 15px 15px 15px 0;

    @media (max-width: $screen-desktop) {
      padding-left: 15px;
    }
  }

  &-Logo {
    margin-right: 16px;
  }

  &-Content {
    display: flex;
    width: 100%;

    @media (max-width: $screen-tablet) {
      flex-direction: column;
    }
  }

  &-Titles {
    @media (max-width: $screen-tablet) {
      display: none;
    }
  }

  &-Title {
    margin-bottom: 5px;
    font-size: 2rem;
    font-weight: 700;

    @media (max-width: $screen-tablet) {
      margin-right: 15px;
    }
  }

  &-Subtitle {
    font-size: 1.4rem;
  }

  &-Section {
    display: flex;
    align-items: center;
    margin-left: auto;

    @media (max-width: $screen-tablet) {
      margin-left: 0;
    }

    @media (max-width: $screen-tablet) {
      justify-content: space-between;
    }
  }

  &-Links {
    margin-right: 44px;

    @media (max-width: $screen-mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &-Link {
    margin-right: 60px;
    font-size: 1.4rem;
    line-height: 1.4;
    color: var(--text-white);

    @media (max-width: 900px) {
      margin-right: 25px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &-Search {
    margin-right: 25px;
  }

  &-Login {
    font-size: 1.4rem;
  }
}

.Logo {
  width: 41px;
  height: 41px;
}
</style>
