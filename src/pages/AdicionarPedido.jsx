import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './styles/AdicionarPedido.css';
import Button from './components/Button.jsx';
const AdicionarPedido = () => {

  const enviarDados = async (dados) => {
    try {
      // 1. Envia os dados JSON
      const response = await axios.post('http://localhost:8080/pedido', dados);
      const novoPedido = response.data;

      // 2. Se tiver imagem, envia ela separadamente

      alert('Pedido enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar pedido:', error);
      alert('Erro ao enviar pedido');
    }
  };

  return (
    <div className='adicionarpedido-container'>
      <Formik
        initialValues={{
      idDoacao: '',
      tituloLivro: '',
      autorLivro: '',
      generoLivro: '',
      descricaoLivro: '',
      emailSolicitante: '',
      statusPedido: '',
      correios:'',
        }}
        onSubmit={(values) => {
          if (values.tituloLivro.length > 0) {
            enviarDados(values);
          } else {
            alert('Favor preencher informações!');
          }
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <input
                type="number"
                onChange={props.handleChange}
                value={props.values.idDoacao}
                placeholder="Id Doação"
                name="idDoacao"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.tituloLivro}
                name="tituloLivro"
                placeholder="título"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.autorLivro}
                name="autorLivro"
                placeholder="Autor do Livro"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.generoLivro}
                name="generoLivro"
                placeholder="Genero Livro"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.descricaoLivro}
                name="descricaoLivro"
                placeholder="Descrição"
              />
            </div>

              <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.emailSolicitante}
                name="emailSolicitante"
                placeholder="email do solicitante"
              />
            </div>
               <div>
                      <select className='select-status'
                        name="statusPedido"
                        value={props.values.statusPedido}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        required>
                        <option value="" label="Selecione o Status" />
                        <option value="A caminho" label="A caminho" />  
                        <option value="Pendente" label="Pendente" />
                        <option value="Entregue" label="Entregue" />
                        <option value="Cancelado" label="Cancelado" />
                        </select>
                      </div>
      <Button/>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdicionarPedido;

