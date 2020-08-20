import {
    http
} from './api'

export async function listarCliente() {
    const respuesta = await http().get("/cliente")
    return respuesta.data;

}

export async function buscarCliente(id) {
    const respuesta = await http().get("/cliente/"+id)
    return respuesta.data;

}