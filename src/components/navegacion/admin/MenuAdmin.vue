<template>
  <div>
    <v-navigation-drawer v-model="drawerRight" app clipped left>
      <v-list dense>
        <v-list-item v-for="(menu, index) in menus" :key="index" :to="menu.url">
          <v-list-item-action>
            <v-icon>{{ menu.icono }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ menu.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="salir()" block>Salir</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="blue" dark>
      <v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight"></v-app-bar-nav-icon>
      <v-toolbar-title>ADMINISTRADOR</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    drawerRight: null,
    right: false,
    left: false,
    menus: [
      { titulo: "PRODUCTOS", url: "/admin/producto", icono: "mdi-dashboard" },
      { titulo: "CLIENTES", url: "/admin/cliente", icono: "mdi-account" },
      { titulo: "PEDIDOS", url: "/admin/pedido", icono: "mdi-gavel" }
    ]
  }),
  methods: {
    salir() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    }
  }
};
</script>