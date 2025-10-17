import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './styles/Adicionar.css';
import Button from './components/Button.jsx';

const Adicionar = () => {
  const [dados, setDados] = useState({});
  const [clicou, setClicou] = useState(false);

  function enviarDados() {
    axios
      .post('http://localhost:8080/auth/register', dados)
      .then((response) => console.log(response))
      .then(() => alert('Cliente adicionado com sucesso!'))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    clicou ? enviarDados() : null;
    return () => setClicou(false);
  }, [clicou]);

  // Função para buscar endereço pelo CEP usando ViaCEP
  const buscarEnderecoPorCep = async (cep, setFieldValue) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setFieldValue('endereco', response.data.logradouro || '');
        setFieldValue('cidade', response.data.localidade || '');
        setFieldValue('estado', response.data.uf || '');
        // Não seta bairro, pois não existe no seu formulário
      }
    } catch (error) {
      // Se o CEP for inválido, não faz nada
    }
  };

  return (
    <div className="sobre-container">
      <Formik
        initialValues={{
          id: 0,
          nome: '',
          email: '',
          senha: '',
          cep: '',
          cpf: '',
          telefone: '',
          endereco: '',
          estado: '',
          cidade: '',
          logradouro: '',
          funcao: '',
        }}
        onSubmit={(values, actions) => {
          if (values.nome.length > 0) {
            setTimeout(() => {
              setDados({
                nome: values.nome,
                email: values.email,
                senha: values.senha,
                cep: values.cep,
                cpf: values.cpf,
                telefone: values.telefone,
                endereco: values.endereco,
                estado: values.estado,
                cidade: values.cidade,
                logradouro: values.logradouro,
                funcao: values.funcao,
              });
              setClicou(true);
            }, 1000);
          } else {
            alert('Favor preencher informações!');
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.nome}
                placeholder="NOME"
                name="nome"
                pattern="[A-Za-zÀ-ÿ\s]+"
                required
              />
              {props.errors.nome && <div id="feedback">{props.errors.nome}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                placeholder="EMAIL"
                maxLength={255}
                required
              />
              {props.errors.email && <div id="feedback">{props.errors.email}</div>}
            </div>

            <div>
              <input
                type="password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.senha}
                name="senha"
                placeholder="SENHA"
                maxLength={30}
                required
              />
              {props.errors.senha && <div id="feedback">{props.errors.senha}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  v = v.replace(/^(\d{5})(\d{3})$/, '$1-$2');
                  v = v.slice(0, 9);
                  props.setFieldValue('cep', v);

                  // Chama ViaCEP quando o CEP estiver completo
                  if (v.length === 9) {
                    buscarEnderecoPorCep(v, props.setFieldValue);
                  }
                }}
                onBlur={props.handleBlur}
                value={props.values.cep}
                name="cep"
                placeholder="CEP"
                maxLength={9}
                required
              />
              {props.errors.cep && <div id="feedback">{props.errors.cep}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  v = v.replace(/(\d{3})(\d)/, '$1.$2');
                  v = v.replace(/(\d{3})(\d)/, '$1.$2');
                  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                  v = v.slice(0, 14);
                  props.setFieldValue('cpf', v);
                }}
                onBlur={props.handleBlur}
                value={props.values.cpf}
                name="cpf"
                placeholder="CPF"
                maxLength={14}
                required
              />
              {props.errors.cpf && <div id="feedback">{props.errors.cpf}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={(e) => {
                  let v = e.target.value.replace(/\D/g, '');
                  v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
                  v = v.replace(/(\d{5})(\d)/, '$1-$2');
                  v = v.slice(0, 15);
                  props.setFieldValue('telefone', v);
                }}
                onBlur={props.handleBlur}
                value={props.values.telefone}
                name="telefone"
                placeholder="(00) 00000-0000"
                maxLength={15}
                required
              />
              {props.errors.telefone && <div id="feedback">{props.errors.telefone}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.endereco}
                placeholder="ENDEREÇO"
                name="endereco"
                required
              />
              {props.errors.endereco && <div id="feedback">{props.errors.endereco}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.estado}
                name="estado"
                placeholder="ESTADO"
                pattern="[A-Za-zÀ-ÿ\s]+"
                maxLength={2}
                required
              />
              {props.errors.estado && <div id="feedback">{props.errors.estado}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.cidade}
                name="cidade"
                placeholder="CIDADE"
                pattern="[A-Za-zÀ-ÿ\s]+"
                required
              />
              {props.errors.cidade && <div id="feedback">{props.errors.cidade}</div>}
            </div>

            <div>
              <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.logradouro}
                name="logradouro"
                placeholder="NUMERO"
                required
              />
              {props.errors.logradouro && <div id="feedback">{props.errors.logradouro}</div>}
            </div>

            <div>
              <select
                className="select-role"
                name="funcao"
                value={props.values.funcao}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                required
              >
                <option value="" label="Selecione a função" />
                <option value="ADMIN" label="ADMIN" />
                <option value="USER" label="USER" />
              </select>
              {props.errors.funcao && <div id="feedback">{props.errors.funcao}</div>}
            </div>

            <Button />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Adicionar;
