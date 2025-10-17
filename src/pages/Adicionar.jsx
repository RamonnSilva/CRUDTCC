import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import './styles/Adicionar.css';
import { Link } from 'react-router-dom';
import Alerta from './components/Alert.jsx';
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
    clicou ? enviarDados() : console.log('app no ar');
    return () => setClicou(false);
  }, [clicou]);

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
              // actions.setSubmitting(false);
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
                  let v = e.target.value.replace(/\D/g, ''); // remove tudo que não é número
                  v = v.replace(/^(\d{5})(\d{3})$/, '$1-$2'); // coloca traço depois dos 5 primeiros
                  v = v.slice(0, 9); // limita o tamanho
                  props.setFieldValue('cep', v);
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
                  let v = e.target.value.replace(/\D/g, ''); // remove não-dígitos
                  v = v.replace(/(\d{3})(\d)/, '$1.$2');
                  v = v.replace(/(\d{3})(\d)/, '$1.$2');
                  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                  v = v.slice(0, 14); // limita no formato 999.999.999-99
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
                  let v = e.target.value.replace(/\D/g, ''); // remove tudo que não é número
                  v = v.replace(/^(\d{2})(\d)/g, '($1) $2'); // coloca parênteses nos dois primeiros
                  v = v.replace(/(\d{5})(\d)/, '$1-$2'); // coloca traço depois dos cinco seguintes
                  v = v.slice(0, 15); // limita o tamanho
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

            {/* Novo input para Cidade */}
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

            {/* Novo input para Logradouro */}
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
