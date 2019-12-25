import axios from "axios";
import { SERVER_URL } from "../env";

export default {
  data() {
    return {
      tags: []
    };
  },

  mounted() {
    axios
      .get(`${SERVER_URL}/api/tag`)
      .then(res => {
        this.tags = res.data.tags;
      })
      .catch(e => {
        this.errors.push(e);
      })
      .finally(() => (this.isLoading = false));
  }
};
