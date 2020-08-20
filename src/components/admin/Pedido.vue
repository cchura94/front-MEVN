<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card elevation="10" color="#385F73" dark>
          <h2></h2>

          <v-card-title class="headline">Datos Cliente:</v-card-title>
          <v-row>
            <v-col cols="6">
              <v-card-title
                class="headline"
              >NOMBRE CLIENTE: {{ cliente.nombre }} {{ cliente.apellido }}</v-card-title>
            </v-col>
            <v-col cols="6">
              <v-card-title class="headline">CORREO: {{ cliente.email }}</v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <h2>Lista de Productos</h2>
        <v-row>
          <v-col cols="6" v-for="(prod, index) in productos" :key="index">
            <v-card>
              <v-img
                class="white--text align-end"
                height="150px"
                :src="`http://localhost:3000/imagenes/${prod.imagen}`"
              >
                <v-card-title>{{ prod.nombre }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">Bs. {{ prod.precio }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ prod.detalle }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange" text @click="agregarPedido(prod)">agregar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5">
        <h2>Pedidos</h2>
        <v-row>
          <v-col cols="12">
            <v-card elevation="10">
              <v-card-title>
                Total a Cobrar: {{ calcularTotal }}
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="realizarPedido">COBRAR</v-btn>
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" v-for="(ped, index) in pedidos" :key="index">
            <v-card elevation="5" color="#027af2" dark>
              <v-row>
                <v-col>
                  <v-card-title>{{ ped.producto.nombre }}</v-card-title>
                  <v-card-text class="text--primary">
                    <div>Precio: {{ ped.producto.precio }}</div>
                  </v-card-text>
                </v-col>
                <v-col>
                  <div>
                    <v-btn @click="incrementar(ped)">+</v-btn>
                    <v-btn color="#fff" class="text--primary" dark>{{ ped.cantidad }}</v-btn>
                    <v-btn @click="decremento(ped)">-</v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as clienteService from "./../../services/clienteService";
import * as productoService from "./../../services/productoService";
import * as pedidoService from "./../../services/pedidoService";

export default {
  data() {
    return {
      id_cliente: null,
      cliente: {},
      productos: [],
      pedidos: [],
      total: 0,
      datos: {}
    };
  },
  async created() {
    this.id_cliente = this.$route.params.id;
    this.cliente = await clienteService.buscarCliente(this.id_cliente);
    this.productos = await productoService.listarProducto();
  },
  computed: {
    calcularTotal() {
      return "Bs. " + this.total;
    }
  },
  methods: {
    agregarPedido(prod) {
      this.total += prod.precio;

      this.pedidos.push({ producto: prod, cantidad: 1 });
    },
    incrementar(ped) {
      ped.cantidad++;
      this.total += ped.producto.precio;
    },
    decremento(ped) {
      ped.cantidad--;
      this.total -= ped.producto.precio;
    },
    async realizarPedido() {
      let pedidos_productos = [];
      for (let i = 0; i < this.pedidos.length; i++) {
        const ped = this.pedidos[i];
        pedidos_productos.push({
          producto: ped.producto._id,
          cantidad: ped.cantidad
        });
      }

      this.datos = {
        cliente: this.id_cliente,
        pedido: pedidos_productos,
        monto_total: this.total
      };

      const respuesta = await pedidoService.guardarPedido(this.datos);
      console.log(respuesta);
    }
  }
};
</script>

<style>
</style>