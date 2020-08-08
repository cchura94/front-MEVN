<template>
  <div>
    <h1>Publicación</h1>
    <table border="1">
      <tr>
        <td>ID</td>
        <td>TITULO</td>
        <td>ESTADO</td>
      </tr>
      <tr v-for="(publi, index) in publicaciones" :key="index">
        <td>{{ publi.id }}</td>
        <td>{{ publi.title }}</td>
        <td v-if="publi.completed" style="background-color:green">
          {{ publi.completed }}
        </td>
        <td v-else style="background-color:red">{{ publi.completed }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      publicaciones: [],
    };
  },
  mounted() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => {
        console.log(response.data);
        this.publicaciones = response.data;
      });

    /*fetch("https://jsonplaceholder.typicode.com/todos/")
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        s.publicaciones = json;thi
      });
      */
  },
};
</script>
