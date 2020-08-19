<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>PRODUCTO -- {{ $store.state.numero }}</v-toolbar-title>
        <v-btn @click="$store.commit('incrementar')">Aumentar</v-btn>
        <p>{{ url }}</p>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="800px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">NUEVO PRODUCTO</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="8">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.precio" label="precio"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-img
                      :src="`http://localhost:3000/imagenes/${editedItem.imagen}`"
                      width="100%"
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="8" md="8">
                    <input type="file" @change="seleccionarImagen" />
                    <v-text-field v-model="editedItem.detalle" label="detalle"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { urlbase, getHeader } from "./../../config/config";

import { http } from "./../../services/api";
import * as servicioProducto from "./../../services/productoService";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "NOMBRE PRODUCTO",
        align: "start",
        sortable: false,
        value: "nombre"
      },
      { text: "PRECIO", value: "precio" },
      { text: "IMAGEN", value: "imagen" },
      { text: "DETALLE", value: "detalle" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      precio: 0,
      imagen: "",
      detalle: ""
    },
    defaultItem: {
      nombre: "",
      precio: 0,
      imagen: "",
      detalle: ""
    },
    imagenSeleccionada: null
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Producto" : "Editar Producto";
    },
    url() {
      return this.$store.state.url + " valor cambiado";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    seleccionarImagen(event) {
      console.log(event.target.files[0]);
      this.imagenSeleccionada = event.target.files[0];
    },
    async initialize() {
      try {
        this.desserts = await servicioProducto.listarProducto();
      } catch (error) {
        console.log("error: ", error);
      }

      /*http()
        .get("/producto")
        .then(respuesta => {
          this.desserts = respuesta.data;
        });*/
      /*axios
        .get(urlbase + "/producto", { headers: getHeader() })
        .then(respuesta => {
          this.desserts = respuesta.data;
        });*/
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.desserts.indexOf(item);
      if (confirm("Esta seguro de eliminar el producto?")) {
        try {
          await servicioProducto.eliminarProducto(item);
        } catch (error) {
          console.log(error);
        }
      }
      this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        //Forma data
        let prod = new FormData();
        prod.append("nombre", this.editedItem.nombre);
        prod.append("precio", this.editedItem.precio);
        prod.append(
          "imagen",
          this.imagenSeleccionada,
          this.imagenSeleccionada.name
        );
        prod.append("detalle", this.editedItem.detalle);

        try {
          const respuesta = await servicioProducto.guardarProducto(prod);
          console.log(respuesta);
          this.initialize();
        } catch (error) {
          consle.log(error);
        }

        /*http()
          .post("/producto", prod)
          .then(respuesta => {
            console.log(respuesta);
          })
          .catch(error => {
            console.log("ERROR ************", error);
          });*/

        /*axios
          .post(urlbase + "/producto", this.editedItem, {
            headers: getHeader()
          })
          .then(respuesta => {
            console.log(respuesta);
          })
          .catch(error => {
            console.log("ERROR ************", error);
          });*/
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>