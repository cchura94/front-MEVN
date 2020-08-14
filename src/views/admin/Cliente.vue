<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <h1>Nuevo Cliente</h1>
        <v-text-field
          v-model="cliente.nombre"
          :rules="nameRules"
          :counter="20"
          label="Ingrese Nombres"
          required
        ></v-text-field>
        <v-text-field
          v-model="cliente.apellido"
          :rules="nameRules"
          :counter="20"
          label="Ingrese Apellidos"
          required
        ></v-text-field>

        <v-text-field v-model="cliente.email" :rules="emailRules" label="Ingrese Correo" required></v-text-field>
        <v-text-field v-model="cliente.telefono" label="Ingrese Telefono"></v-text-field>
        <v-btn @click="guardarCliente()">Guardar Cliente</v-btn>
        <v-btn class="dark" @click="modificarCliente(cliente)">Modificar Cliente</v-btn>
      </v-col>
      <v-col cols="8">
        <h1>Lista de Clientes</h1>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">Nombre</th>
              <th class="text-left">Correo</th>
              <th class="text-right">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(clie, index) in clientes" :key="index">
              <td>{{ clie.nombre }}</td>
              <td>{{ clie.email }}</td>
              <td>
                <v-btn @click="editarCliente(clie, index)">editar</v-btn>
                <v-btn @click="eliminarCliente(clie._id, index)">eliminar</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <p>{{ cliente }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { urlbase, getHeader } from "./../../config/config";

export default {
  data() {
    return {
      clientes: [],
      cliente: {
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
      },
      nameRules: [
        v => !!v || "El Campo es obligatorio",
        v => v.length <= 20 || "El Parametro debe ser menor a 20 caracteres"
      ],
      emailRules: [
        v => !!v || "E-mail es obligatorio",
        v => /.+@.+/.test(v) || "El Correo no es valido"
      ]
    };
  },
  created() {
    axios
      .get(urlbase + "/cliente", {
        headers: getHeader()
      })
      .then(datos => {
        this.clientes = datos.data;
      });
  },
  methods: {
    guardarCliente() {
      axios
        .post(urlbase + "/cliente", this.cliente, {
          headers: getHeader()
        })
        .then(datos => {
          this.clientes.push(this.cliente);
          console.log(datos);
        })
        .catch(error => {
          console.log(error);
        });
    },
    eliminarCliente(id, index) {
      axios
        .delete(urlbase + "/cliente/" + id, {
          headers: getHeader()
        })
        .then(res => {
          console.log(res);
          this.clientes.splice(index, 1);
        })
        .catch(error => {
          console.log(error);
        });
    },
    editarCliente(cliente, index) {
      this.cliente = cliente;
    },
    modificarCliente(clie) {
      axios
        .put(urlbase + "/cliente/" + this.cliente._id, this.cliente, {
          headers: getHeader()
        })
        .then(res => {
          console.log(res);
          //this.clientes[index] = clie;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>