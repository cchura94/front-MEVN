import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import {
  http
} from './services/api'

Vue.config.productionTip = false


Vue.prototype.$http = http();

http().interceptors.request.use(
  (config) => {
    try {
      const auth = JSON.parse(atob(localStorage.getItem("token")));
      if (auth.access_token) {
        config.headers.common["Authorization"] = "bearer " + auth.access_token
      }
      return config;

    } catch (error) {
      localStorage.removeItem("token")
    }
  }
);

http().interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response)
    } else {
      return Promise.resolve(response)
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:

          break;
        case 401:
          alert("session exipirado")
          break;
        case 403:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break;
        case 404:
          alert("La Pagina no existe")
          break;
        case 502:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break;
        case 500:
          router.replace({
            path: "/login",
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break;
      }

      return Promise.reject(error.response)
    }
  }
);



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')