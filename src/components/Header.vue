<template>
  <header class="Header">
    <div class="Logo Header-Logo">
      <svg class="Social-Icon Social-Vk">
        <use xlink:href="./../assets/icons-sprite.svg#logo"></use>
      </svg>
    </div>
    <div class="Header-Content">
      <div class="Header-Titles">
        <div class="Header-Title">
          DevPub
        </div>
        <div class="Header-Subtitle">
          Рассказы разрабочиков
        </div>
      </div>
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
          <input
            v-model="search"
            class="Input"
            type="text"
            placeholder="Найти"
            @keyup.enter="onSearch"
          />
        </div>
        <UserSection
          v-if="isAuth"
          :avatar="user.photo"
          :moderationCount="user.moderationCount"
        />
        <router-link v-else to="/login" class="Link Header-Login">
          Войти
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import UserSection from "@/components/UserSection.vue";

export default {
  components: {
    UserSection
  },

  data() {
    return {
      postsForModeration: 0,
      search: ""
    };
  },

  computed: {
    ...mapGetters(["isAuth", "user"])
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
    }
  }
};
</script>

<style lang="scss">
.Header {
  display: flex;
  align-items: center;
  padding: 15px 30px 15px 10px;
  color: var(--color-white);
  background-color: var(--color-layout-dark);

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
  }

  &-Links {
    margin-right: 44px;
  }

  &-Link {
    margin-right: 60px;
    font-size: 1.4rem;
    color: var(--text-white);

    @media (max-width: 900px) {
      margin-right: 15px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &-Login {
    margin-left: 117px;
    font-size: 1.4rem;
  }
}

.Logo {
  width: 41px;
  height: 41px;
}
</style>
