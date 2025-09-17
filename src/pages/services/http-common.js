import axios from "axios";

//const API_URL =  "https://projeto.com.br/"; //remote(produção)
const API_URL = "http://localhost:8080/cliente"; //local(desenvolvimento)c
const DOACAO_URL ="http://localhost:8080/doacao";
const PEDIDO_URL ="http://localhost:8080/pedido";
const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json"
  }
});
const doacaoInstance = axios.create({
  baseURL: DOACAO_URL,
  headers: {
    "Content-type": "application/json"
  }
});

const pedidoInstance = axios.create({
  baseURL: PEDIDO_URL,
  headers: {
    "Content-type": "application/json"
  }
});
const multipartInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data"
  }
});


const httpCommom = {
  mainInstance,
  multipartInstance,
  doacaoInstance,
  pedidoInstance
};

export default httpCommom;