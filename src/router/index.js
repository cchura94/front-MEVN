import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Carrito from '../views/Carrito.vue'
import Login from '../views/Login.vue'
import Admin from '../views/admin/Admin.vue'
import Producto from '../views/admin/Producto.vue'
import Cliente from '../views/admin/Cliente.vue'
import Pedido from '../components/admin/Pedido.vue'

import {
  authGuard
} from './../guards/authGuard'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: authGuard,
    meta: {
      requiereAuth: true
    },
    children: [{
        path: 'producto',
        name: 'Producto',
        component: Producto,
        beforeEnter: authGuard,
        meta: {
          requiereAuth: true
        },
      },
      {
        path: 'cliente',
        name: 'Cliente',
        component: Cliente,
        beforeEnter: authGuard,
        meta: {
          requiereAuth: true
        },
      },
      {
        path: 'pedido/:id',
        name: 'Pedido',
        component: Pedido,
        beforeEnter: authGuard,
        meta: {
          requiereAuth: true
        },
      }

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router