import {
    http,
    httpFile
} from './api'

export function listarProducto() {
    http()
        .get("/producto")
        .then(respuesta => {
            this.desserts = respuesta.data;
        });
}

export function guardarProducto(datos) {
    http()
        .post("/producto", datos)
        .then(respuesta => {
            return respuesta;
        })
}