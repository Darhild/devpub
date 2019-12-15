<template>
  <form class="Login-Form Form">
    <div class="Form-Row">
      <div class="Form-Label">
        Email
      </div>
      <div class="Form-Value">
        <input class="Input" type="email" />
      </div>
    </div>
    <div class="Form-Row">
      <div class="Form-Label">
        Логин
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
    <div class="Form-Row">
      <div class="Form-Label">
        Повторите пароль
      </div>
      <div class="Form-Value">
        <input class="Input" type="password" />
      </div>
    </div>
    <div class="Form-Row">
      <div class="Form-Label">
        Код с картинки
      </div>
      <div class="Form-Value Form-Value--size_min">
        <div class="Form-Captcha">
          <img src="./../assets/captcha.png" alt="" />
        </div>
        <div class="Form-Input--size_min">
          <input class="Input" type="text" />
        </div>
      </div>
    </div>
    <div class="Form-Submit">
      <BaseButton>
        Зарегистрироваться
      </BaseButton>
    </div>
  </form>
</template>

<script>
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton
  }
};
</script>
