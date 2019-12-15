<template>
  <div class="Form">
    <div v-for="(prop, index) in data" :key="index" class="Form-Row">
      <div class="Form-Label">
        prop.label
      </div>
      <div v-if="prop" class="Form-Input">
        <input class="Input" :type="prop.type" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    {
      data: {
        type: Array,
        required: true,
        default: []
      }
    }
  ]
};
</script>
