import Vue from "vue";
import Vuex from "vuex";
import Vueditor from "vueditor";
import Vuelidate from "vuelidate";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "@/plugins/vueditor";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(Vueditor, config);
Vue.use(Vuelidate);
Vue.use(VueMeta);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
