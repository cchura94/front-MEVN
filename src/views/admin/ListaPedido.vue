<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-for="(ped, index) in pedidos" :key="index">
        <v-card elevation="10" color="#385F73" dark>
          <h2></h2>

          <v-card-title class="headline">Datos Cliente:</v-card-title>
          <v-row>
            <v-col cols="6">
              <v-card-title
                class="headline"
              >NOMBRE CLIENTE: {{ ped.cliente.nombre }} {{ ped.cliente.apellido }}</v-card-title>
            </v-col>
            <v-col cols="6">
              <v-card-title class="headline">CORREO: {{ ped.cliente.email }}</v-card-title>
            </v-col>
            <ul>
              <li
                v-for="(prod, index) in ped.pedido"
                :key="index"
              >{{prod.producto.nombre}} - {{prod.cantidad}}</li>
            </ul>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as pedidoService from "./../../services/pedidoService";
export default {
  data() {
    return {
      pedidos: []
    };
  },
  async created() {
    this.pedidos = await pedidoService.listarPedidos();
  }
};
</script>

<style>
</style>