<template>
<v-app> 
  <div id="app" class="container">
    <ul class="nav">
      <!-- <Actores />
      <Peliculas />      
      <Directores /> -->
 <v-card>
    <v-toolbar
      color="cyan"
      dark
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Your Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab v-for="item in itemsMenu" v-bind:key="item.router">
          <!-- <router-link to="/hello">{{item}}</router-link> -->
                    <router-link :to="{path:item.router}">{{item.names}}</router-link>

          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <!-- <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in itemsMenu"
        :key="item"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items> -->
  </v-card>

<!-- 
      <li>
        <router-link to="/hello">GYM</router-link>
      </li>
      <li>
        <router-link to="/pelicula-3">Peliculas</router-link>
      </li>
      <li>
        <router-link to="/actor-1">Actores</router-link>
      </li>
      <li>
        <router-link to="/director-2">Directores</router-link>
      </li> -->
    </ul>
    <router-view></router-view>
  </div>
  </v-app>
</template>

<script>
// import Peliculas from "./components/Peliculas.vue";
// import Actores from "./components/Actores.vue";
// import Directores from "./components/Directores.vue";
// import HelloWorld from './components/HelloWorld.vue';
// import Clientes from './components/Clientes.vue';

export default {
  name: "app",  
  // components: {
  //   Peliculas,
  //   Actores,
  //   Directores,
  //   HelloWorld,
  //   Clientes
  // },
  data() {
    return {
      showWhich: "Peliculas",
       tab: null,
        itemsMenu: [
          {names: 'GYM', router: '/hello'},
          {names: 'Peliculas', router: '/pelicula-3'},
          {names: 'Actores', router: '/actor-1'},
          {names: 'Directores', router: '/director-2'},
          {names: 'Clientes', router: '/clientes'}
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul.nav > li {
  display: inline;
  padding-left: 10px;
}
ul.nav > li::before {
  content: "\2630";
  padding-right: 5px;
}
</style>
