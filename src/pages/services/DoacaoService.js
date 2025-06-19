import http from './http-common';
const DOACAO_URL = "http://localhost:8080";

const getAllDoacoes = () => {
    return http.mainInstance.get(DOACAO_URL + '/doacao');
};


const deleteDoacoes = (id) => {
    return http.mainInstance.delete(`${DOACAO_URL}/doacao/${id}`);
};

const updateDoacoes = (id, data) => {
    return http.mainInstance.put(`${DOACAO_URL}/doacao/${id}`, data);
};

const ClienteService = {
    getAllDoacoes,
    deleteDoacoes,
    updateDoacoes,
}

export default ClienteService;