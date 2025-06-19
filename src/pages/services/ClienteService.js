import http from './http-common';
const API_URL = "http://localhost:8080";

const getAllClientes = () => {
    return http.mainInstance.get(API_URL + '/cliente');
};


const deleteClientes = (id) => {
    return http.mainInstance.delete(`${API_URL}/cliente/${id}`);
};

const updateCliente = (id, data) => {
    return http.mainInstance.put(`${API_URL}/cliente/${id}`, data);
};

const ClienteService = {
    getAllClientes,
    deleteClientes,
    updateCliente,
}

export default ClienteService;