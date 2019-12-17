import Vue from "vue";
import Vuex from "vuex";
import Vueditor from "vueditor";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import config from "@/plugins/vueditor";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

Vue.use(Vuex);
Vue.use(Vueditor, config);
