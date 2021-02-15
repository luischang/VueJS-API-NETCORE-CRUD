import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuetify from "vuetify";

Vue.config.productionTip = false;

new Vue({
  vuetify: new Vuetify(),
  render: (h) => h(App),
  router
}).$mount("#app");
