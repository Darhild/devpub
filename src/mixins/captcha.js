import axios from "axios";
import { SERVER_URL } from "../env";

export default {
  data() {
    return {
      secret: "",
      image: "",
      captchaError: ""
    };
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api/auth/captcha`)
      .then(res => {
        this.secret = res.data.secret;
        this.image = res.data.image;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
