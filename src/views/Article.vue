<template>
  <div class="PageWrapper">
    <div v-if="isErrored" class="ServerInfo">
      Sorry, some error happened :(
    </div>
    <div v-else-if="isLoading" class="ServerInfo">
      Loading...
    </div>
    <BaseArticle
      v-else
      :key="article.id"
      :className="'Article--full'"
      :id="article.id"
      :time="article.time"
      :author="article.user.name"
      :title="article.title"
      :text="article.text"
      :likeCount="article.likeCount"
      :dislikeCount="article.dislikeCount"
      :commentCount="article.commentCount"
      :viewCount="article.viewCount"
    />
    <Vueditor></Vueditor>
  </div>

</template>

<script>
import axios from "axios";
import { SERVER_URL } from "./../env";
import Vueditor from 'vueditor';
import BaseArticle from "@/components/BaseArticle.vue";

const config = {
  toolbar: [
    'link', 'unLink', '|', 'table', 'picture', '|', 'fullscreen', 'sourceCode', '|', 'bold', 'italic', 'underline', 'removeFormat', '|', 'insertUnorderedList', 'insertOrderedList', 'indent', 'outdent', '|',  'element'
  ],
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: `${SERVER_URL}/api/comment`
};

Vue.use(Vuex);
Vue.use(Vueditor, config);
// create a root instance
new Vue({
  el: '#editorContainer'
});

export default {
  components: {
    BaseArticle
  },

  data() {
    return {
      article: {},
      isLoading: true,
      isErrored: false
    };
  },

  mounted() {
    this.isLoading = true;
    axios
      .get(`${SERVER_URL}/api/post`)
      .then(res => {
        this.article = res.data.find(
          article => article.id == this.$route.params.id
        );
      })
      .catch(e => {
        this.errors.push(e);
        this.isErrored = true;
      })
      .finally(() => (this.isLoading = false));
  }
};
</script>
