export default {
  computed: {
    submitStatus() {
      console.log(this.$v);
      if (!this.$v.$invalid) return "success";
    }
  },

  methods: {
    onSubmit() {
      console.log("submit");
    }
  }
};
