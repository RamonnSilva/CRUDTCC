import http from './http-common';
const DOACAO_URL = "http://localhost:8080";

const getAllDoacoes = () => {
    return http.doacaoInstance.get(DOACAO_URL + '/doacao');
};


const deleteDoacoes = (id) => {
    return http.doacaoInstance.delete(`${DOACAO_URL}/doacao/${id}`);
};

const updateDoacoes = (id, data) => {
    return http.doacaoInstance.put(`${DOACAO_URL}/doacao/${id}`, data);
};

const DoacaoService = {
    getAllDoacoes,
    deleteDoacoes,
    updateDoacoes,
}

export default DoacaoService;