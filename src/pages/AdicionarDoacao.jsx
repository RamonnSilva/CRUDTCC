import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './styles/AdicionarDoacao.css';
import Button from './components/Button.jsx';

const AdicionarDoacao = () => {

  const enviarDados = async (dados) => {
    try {
      // Envia apenas os dados JSON, sem imagem
      await axios.post('http://localhost:8080/doacao', dados);
      alert('Doação enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar doação:', error);
      alert('Erro ao enviar doação');
    }
  };

  return (
    <div className='adicionardoacao-container'>
      <Formik
        initialValues={{
          nome: '',
          titulo: '',
          genero: '',
          autor: '',
          descricao: '',
          email: '',
          doadorid: '',
        }}
        onSubmit={(values) => {
          if (values.nome.length > 0) {
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
                type="text"
                onChange={props.handleChange}
                value={props.values.nome}
                placeholder="NOME"
                name="nome"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.titulo}
                name="titulo"
                placeholder="TÍTULO"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.genero}
                name="genero"
                placeholder="GENÊRO"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.autor}
                name="autor"
                placeholder="AUTOR"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.descricao}
                name="descricao"
                placeholder="DESCRIÇÃO"
              />
            </div>
            <div>
              <input
                type="email"
                onChange={props.handleChange}
                value={props.values.email}
                name="email"
                placeholder="EMAIL"
              />
            </div>
            <div>
              <input
                type="number"
                onChange={props.handleChange}
                value={props.values.doadorid}
                name="doadorid"
                placeholder="ID DO DOADOR"
              />
            </div>
            <Button />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdicionarDoacao;
