<template>
  <v-app>
    <Menu v-if="!$route.meta.requiereAuth"></Menu>
    <MenuAdmin v-if="$route.meta.requiereAuth"></MenuAdmin>

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
import MenuAdmin from "./components/navegacion/admin/MenuAdmin";
export default {
  name: "App",

  components: {
    HelloWorld,
    Menu,
    PiePagina,
    MenuAdmin
  },

  data: () => ({
    //
  })
};
</script>
