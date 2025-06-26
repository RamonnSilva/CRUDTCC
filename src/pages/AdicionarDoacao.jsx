import React, { useState } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './AdicionarDoacao.css';

const AdicionarDoacao = () => {
  const [imagem, setImagem] = useState(null);

  const enviarDados = async (dados) => {
    try {
      // 1. Envia os dados JSON
      const response = await axios.post('http://localhost:8080/doacao', dados);
      const novaDoacao = response.data;

      // 2. Se tiver imagem, envia ela separadamente
      if (imagem) {
        const formData = new FormData();
        formData.append('imagem', imagem);

        await axios.post(`http://localhost:8080/doacao/${novaDoacao.id}/imagem`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

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
                type="file"
                name="imagem"
                accept="image/*"
                onChange={e => setImagem(e.target.files[0])}
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.nome}
                placeholder="Nome"
                name="nome"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.titulo}
                name="titulo"
                placeholder="Título"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.genero}
                name="genero"
                placeholder="Gênero"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.autor}
                name="autor"
                placeholder="Autor"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                value={props.values.descricao}
                name="descricao"
                placeholder="Descrição"
              />
            </div>
            <button type="submit">ADICIONAR</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AdicionarDoacao;
