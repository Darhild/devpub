import axios from "axios";
import { SERVER_URL } from "../env";

export default {
  data() {
    return {
      likeCount: 0,
      dislikeCount: 0
    };
  },

  methods: {
    onLike() {
      axios
        .post(`${SERVER_URL}/api/post/like`, {
          post_id: this.article.id
        })
        .then(res => {
          if (res.data.result) this.likeCount++;
        })
        .catch(e => this.errors.push(e));
    },

    onDislike() {
      axios
        .post(`${SERVER_URL}/api/post/dislike`, {
          post_id: this.article.id
        })
        .then(res => {
          if (res.data.result) this.dislikeCount++;
        })
        .catch(e => this.errors.push(e));
    }
  }
};
