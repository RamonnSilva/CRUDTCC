
import http from './http-common';
const API_URL = "http://localhost:8080";

const getAllClientes = () => {
    return http.mainInstance.get(API_URL + '/cliente');
};

const getTotal = () => {
    return http.mainInstance.get(API_URL + '/cliente/total');
};


const deleteClientes = (id) => {
    return http.mainInstance.delete(`${API_URL}/cliente/${id}`);
};

const updateCliente = (id, data) => {
    return http.mainInstance.put(`${API_URL}/cliente/${id}`, data);
};

const createCliente = (data) => {
      return http.mainInstance.post(`${API_URL}/auth/register`, data);
}
const ClienteService = {
    getAllClientes,
    deleteClientes,
    updateCliente,
    createCliente,
    getTotal,
}

export default ClienteService;