<script>
  import Vuex from 'vuex';
  import Vueditor from 'vueditor';
  import 'vueditor/dist/style/vueditor.min.css';

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
</script>

