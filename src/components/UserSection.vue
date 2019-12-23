<template>
  <div class="UserSection">
    <div class="UserSection-Outer">
      <div class="UserSection-User">
        {{ user.name }}
      </div>
      <img
        v-if="this.user.photo"
        class="UserSection-Avatar"
        :src="require(`@/assets/${this.user.photo}`)"
        alt="avatar"
      />
      <img
        v-else
        class="UserSection-Avatar"
        src="@/assets/default-2.png"
        alt="avatar"
      />
    </div>
    <div class="UserSection-Inner">
      <router-link to="/profile" class="Link UserSection-Item">
        Профиль
      </router-link>
      <router-link to="/add" class="Link UserSection-Item">
        Новая публикация
      </router-link>
      <router-link to="/my" class="Link UserSection-Item">
        Мои публикации
      </router-link>
      <router-link to="/stat" class="Link UserSection-Item">
        Статистика
      </router-link>
      <router-link
        to="/moderation"
        class="Link UserSection-Item UserSection-Moderation"
      >
        <div>
          Модерация
        </div>
        <div v-if="user.moderation" class="UserSection-ModerationNum">
          {{ user.moderationCount }}
        </div>
      </router-link>
      <router-link to="/settings" class="Link UserSection-Item">
        Настройки
      </router-link>
      <div class="UserSection-Item UserSection-Logout" @click="logout">
        Выйти
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["user"])
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="scss">
.UserSection {
  position: relative;
  z-index: 10;

  &-Outer {
    display: flex;
    align-items: center;
  }

  &-User {
    margin-right: 15px;
    font-size: 1.4rem;
    line-height: 1.4;
    color: var(--color-lightest);
    cursor: default;

    @media (max-width: $screen-mobile) {
      display: none;
    }
  }

  &-Avatar {
    display: block;
    width: 23px;
    height: 23px;
    border-radius: 50%;
  }

  &-Inner {
    position: absolute;
    right: 0;
    display: none;
    width: 155px;
    padding: 33px 0 33px 13px;
    background-color: var(--color-layout-dark);
    border-radius: 10px;
  }

  &:hover .UserSection-Inner {
    display: block;
  }

  &-Item {
    display: block;
    margin-bottom: 12px;
    padding-right: 16px;
    font-size: 1.4rem;
    line-height: 1.4rem;
    white-space: nowrap;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      padding-right: 13px;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  &-Moderation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      padding-right: 16px;
    }
  }

  &-ModerationNum {
    width: 19px;
    height: 19px;
    font-size: 1rem;
    line-height: 19px;
    text-align: center;
    color: var(--color-lightest);
    background-color: var(--color-secondary);
    border-radius: 50%;
  }

  &-Logout {
    color: var(--color-secondary);
    cursor: pointer;
  }
}
</style>
