import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

new Vue({
  vuetify: new Vuetify(),
  render: (h) => h(App),
  router
}).$mount("#app");
