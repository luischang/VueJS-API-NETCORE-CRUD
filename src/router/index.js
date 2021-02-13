import Vue from "vue";
import Router from "vue-router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import axios from "axios";
// import VueAxios from 'vue-axios'

import Actores from ".././components/Actores.vue";
import Directores from ".././components/Directores.vue";
import Peliculas from ".././components/Peliculas.vue";
import HelloWorld from ".././components/HelloWorld.vue";
import Clientes from ".././components/Clientes.vue";

// import DemoOne from "../components/DemoOne.vue";
// import DemoTwo from "../components/DemoTwo.vue";
// import DemoThree from "../components/DemoThree.vue";
// import DemoFour from "../components/DemoFour.vue";
// import DemoFive from "../components/DemoFive.vue";

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(axios);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/hello",
      name: "hello",
      component: HelloWorld
    },
    {
      path: "/actor-1",
      name: "actor",
      component: Actores
    },
    {
      path: "/director-2",
      name: "director",
      component: Directores
    },
    {
      path: "/pelicula-3",
      name: "pelicula",
      component: Peliculas
    },
    {
      path: "/clientes",
      name: "cliente",
      component: Clientes
    }
  ]
});
