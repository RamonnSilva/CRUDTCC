import http from './http-common';
const PEDIDO_URL = "http://localhost:8080";

const getAllPedidos = () => {
    return http.pedidoInstance.get(PEDIDO_URL + '/pedido');
};


const deletePedidos = (id) => {
    return http.pedidoInstance.delete(`${PEDIDO_URL}/pedido/${id}`);
};

const updatePedidos = (id, data) => {
    return http.pedidoInstance.put(`${PEDIDO_URL}/pedido/${id}`, data);
};





const PedidoService = {
    getAllPedidos,
    deletePedidos,
    updatePedidos,
}

export default PedidoService;