import axios from "axios";
import { SERVER_URL } from "../env";

export default {
  data() {
    return {
      image: "",
      captchaError: "",
      errors: []
    };
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api/auth/captcha`)
      .then(res => {
        this.image = res.data.image;
        this.validatedFields.secret = res.data.secret;
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
