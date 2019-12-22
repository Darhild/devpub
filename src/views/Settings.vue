<template>
  <main v-if="isAuth" class="Settings Wrapper">
    <div class="Settings-Title Title">
      Настройки
    </div>
    <div class="Settings-Form">
      <form class="CheckForm">
        <label class="CheckForm-Label">
          <input
            v-model="MULTIUSER_MODE"
            class="CheckForm-Input"
            type="checkbox"
            @change="onCheck('MULTIUSER_MODE')"
          />
          <div class="CheckForm-Value">
            <div class="CheckForm-Title">
              Многопользовательский режим
            </div>
            <div class="CheckForm-Info">
              Если галочка не отмечена, публиковать посты могу только я. Если
              отмечена - любой зарегистрированный пользователь
            </div>
          </div>
        </label>
        <label class="CheckForm-Label">
          <input
            v-model="POST_PREMODERATION"
            class="CheckForm-Input"
            type="checkbox"
            @change="onCheck('POST_PREMODERATION')"
          />
          <div class="CheckForm-Value">
            <div class="CheckForm-Title">
              Премодерация постов
            </div>
            <div class="CheckForm-Info">
              Уведомлять меня о публикации новых постов и не показывать их до
              моего одобрения
            </div>
          </div>
        </label>
        <label class="CheckForm-Label">
          <input
            v-model="STATISTICS_IS_PUBLIC"
            class="CheckForm-Input"
            type="checkbox"
            @change="onCheck('STATISTICS_IS_PUBLIC')"
          />
          <div class="CheckForm-Value">
            <div class="CheckForm-Title">
              Показывать статистику блога всем
            </div>
          </div>
        </label>
      </form>
    </div>
  </main>
  <div v-else class="Settings-ServerInfo ServerInfo">
    Sorry, you should login first
  </div>
</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";

export default {
  data() {
    return {
      MULTIUSER_MODE: false,
      POST_PREMODERATION: false,
      STATISTICS_IS_PUBLIC: false
    };
  },

  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    }
  },

  methods: {
    onCheck(value) {
      axios
        .put(`${SERVER_URL}/api/settings`, {
          [value]: this[value]
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style lang="scss">
.Settings {
  padding-top: 15px;

  &-Title {
    margin-bottom: 21px;
  }

  &-ServerInfo {
    padding-top: 30px;
    padding-left: 30px;
  }
}
</style>
