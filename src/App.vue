<template>
  <v-app>
    <Menu></Menu>

    <v-main>
      <router-view></router-view>
    </v-main>

    <PiePagina></PiePagina>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Menu from "./components/navegacion/Menu";
import PiePagina from "./components/navegacion/PiePagina";

export default {
  name: "App",

  components: {
    HelloWorld,
    Menu,
    PiePagina,
  },

  data: () => ({
    //
  }),
};
</script>
