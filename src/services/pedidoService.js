import {
    http,
} from './api'


export async function listarPedidos() {
    const ped = await http().get("/pedido");
    return ped.data

}

export async function guardarPedido(datos) {
    return await http().post("/pedido", datos);

}