export default {
  data() {
    return {
      validatedFields: {}
    };
  },

  computed: {
    submitStatus() {
      if (
        Object.keys(this.validatedFields).toString() === this.requiredFields &&
        Object.values(this.validatedFields).every(item => item !== false)
      )
        return "success";
      return "error";
    }
  },

  methods: {
    onValidateField(obj) {
      this.validatedFields = { ...this.validatedFields, ...obj };
    }
  }
};
