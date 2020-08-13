<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Iniciar Sesion</v-toolbar-title>
            <!--v-spacer></v-spacer-->
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Login"
                v-model="usuario.email"
                name="login"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                v-model="usuario.password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-form>
            <p>{{ usuario }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="ingresar()">Ingresar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

import Swal from "sweetalert2";

import { urllogin } from "./../config/config";

export default {
  props: {
    source: String
  },
  data() {
    return {
      usuario: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ingresar() {
      axios
        .post(urllogin, this.usuario)
        .then(res => {
          console.log(res);
          if (!res.data.error) {
            Swal.fire("Correcto!", "Correcto", "success");
            //Guardar el token en LocalStorage
            localStorage.setItem("token", btoa(JSON.stringify(res.data)));

            this.$router.push({ name: "Admin" });
          } else {
            Swal.fire("Error!", res.data.mensaje, "error");
          }
        })
        .catch(err => {
          Swal.fire("Error!", "Error de servidor!", "danger");
        });
    }
  }
};
</script>

<style></style>
