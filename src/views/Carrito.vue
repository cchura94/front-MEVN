<template>
  <div>
    <h1>{{ titulo }}</h1>
    <div class="productos">
      <table border="1">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>CANTIDAD</th>
            <th>SUB-TOTAL</th>
            <th>DETALLE</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in productos" :key="prod">
            <td>{{ prod.nombre }}</td>
            <td>{{ prod.precio }}</td>
            <td>{{ prod.cantidad }}</td>
            <td>{{ prod.cantidad * prod.precio }}</td>
            <td>{{ prod.detalle }}</td>
            <td>
              <button @click="addCarrito(prod)">agregar carrito</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="carrito">
      <div class="caja" v-for="(c, index) in carrito" :key="c">
        <h2>{{ c.nombre }}</h2>
        <p>{{ c.precio }}</p>
        <button @click="eliminarCarrito(index)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Carrito de Ventas",
      productos: [
        { nombre: "Laptop", precio: 7800.8, detalle: "Laptop HP", cantidad: 6 },
        {
          nombre: "Mesa",
          precio: 500.98,
          detalle: "Mesa de Oficina",
          cantidad: 12,
        },
        {
          nombre: "Silla",
          precio: 100.98,
          detalle: "Sillas de Oficina",
          cantidad: 24,
        },
      ],
      carrito: [],
    };
  },
  methods: {
    addCarrito(prod) {
      prod.cantidad -= 1;
      this.carrito.push(prod);
    },
    eliminarCarrito(i) {
      this.carrito.splice(i, 1);
    },
  },
};
</script>

<style>
.productos {
  width: 50%;
  float: left;
}

.carrito {
  width: 50%;
  float: left;
}
.caja {
  width: 150px;
  float: left;
  background-color: blueviolet;
  margin: 2px;
  color: #fff;
}
</style>
