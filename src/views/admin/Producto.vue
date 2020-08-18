<template>
  <v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>PRODUCTO</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.precio" label="precio"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field type="file" v-model="editedItem.imagen" label="imagen "></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.detalle" label="detalle"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
import { listarProducto } from "./../../services/productoService";
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
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Producto" : "Editar Producto";
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
    async initialize() {
      //this.desserts = await listarProducto();

      http()
        .get("/producto")
        .then(respuesta => {
          this.desserts = respuesta.data;
        });
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

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        http()
          .post("/producto", this.editedItem)
          .then(respuesta => {
            console.log(respuesta);
          })
          .catch(error => {
            console.log("ERROR ************", error);
          });

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