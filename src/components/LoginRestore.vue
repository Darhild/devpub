<template>
  <form class="Login-Form Form" @submit.prevent="onSubmit">
    <InputEmail @field-validated="onValidateField" />
    <div class="Form-Submit">
      <BaseButton
        :onClickButton="onSubmit"
        :disabled="submitStatus !== 'success'"
      >
        Далее
      </BaseButton>
    </div>
  </form>
</template>

<script>
import formSubmit from "@/mixins/formSubmit";
import InputEmail from "@/components/InputEmail.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  components: {
    BaseButton,
    InputEmail
  },

  mixins: [formSubmit],

  data() {
    return {
      requiredFields: "email"
    };
  }
};
</script>
