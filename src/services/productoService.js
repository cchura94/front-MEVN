import {
    http,
    httpFile
} from './api'

export async function listarProducto() {
    const respuesta = await http().get("/producto")
    return respuesta.data;

}

/**
 * Esta Función me permite guardar la informacion de producto
 * @param {*} datos 
 * @returns String
 */
export async function guardarProducto(datos) {
    return await http().post("/producto", datos);

}

export async function eliminarProducto(item) {
    return await http().delete(`/producto/${item._id}`);
}