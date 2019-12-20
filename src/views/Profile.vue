<template>
  <div class="Profile PageWrapper">
    <div class="Title Profile-Title">
      Мой профиль
    </div>
    <div class="Avatar Profile-Photo">
      <div class="Avatar-Text">
        Фотография
      </div>
      <div class="Avatar-PhotoSection">
        <img class="Avatar-Image" src="@/assets/avatar.png" alt="" />
        <div class="Avatar-Edit">
          <div class="Avatar-Action">
            Изменить
          </div>
          <div class="Avatar-Action">
            Удалить
          </div>
        </div>
      </div>
    </div>
    <form class="Profile-Form Form">
      <div class="Form-Row">
        <div class="Form-Label">
          Email
        </div>
        <div class="Form-Value">
          <input class="Input" type="email" :placeholder="user.email" />
        </div>
      </div>
      <div class="Form-Row">
        <div class="Form-Label">
          Имя
        </div>
        <div class="Form-Value">
          <input class="Input" type="text" :placeholder="user.name" />
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
      <div class="Form-Row">
        <div class="Form-Label">
          Повторите пароль
        </div>
        <div class="Form-Value">
          <input class="Input" type="password" />
        </div>
      </div>
      <div class="Form-Submit">
        <BaseButton>
          Сохранить
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
const BaseButton = () =>
  import(/* webpackChunkName: "baseButton" */ "@/components/BaseButton.vue");

export default {
  components: {
    BaseButton
  },

  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="scss">
.Profile {
  &-Title {
    margin-bottom: 30px;
  }

  &-Form {
    width: 50%;

    @media (max-width: $screen-tablet) {
      width: 100%;
    }
  }

  &-Photo {
    margin-bottom: 15px;
  }
}

.Avatar {
  display: flex;

  @media (max-width: $screen-tablet) {
    display: block;
  }

  &-Text {
    margin-right: 33px;
    font-size: 1.2rem;

    @media (max-width: $screen-tablet) {
      margin-bottom: 10px;
    }
  }

  &-PhotoSection {
    display: flex;
  }

  &-Image {
    display: block;
    margin-right: 10px;
    border-radius: 10px;
  }

  &-Action {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: var(--color-primary);
    cursor: pointer;
  }
}
</style>
