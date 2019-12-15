<template>
  <form class="Login-Form Form">
    <div class="Form-Row">
      <div class="Form-Label">
        Email или логин
      </div>
      <div class="Form-Value">
        <input class="Input" type="text" />
      </div>
    </div>
    <div class="Form-Submit">
      <BaseButton>
        Далее
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
