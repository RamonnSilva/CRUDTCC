import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ClienteService from './services/ClienteService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Total from './components/Total.jsx';
import './styles/Clientes.css';
import { Link } from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const Clientes = () => {
  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editClienteId, setEditClienteId] = useState(null);
  const [estado, setEstado] = useState('');
  const [funcao, setFuncao] = useState('');
  const [editedCliente, setEditedCliente] = useState({
    nome: '',
    email: '',
    cep: '',
    cpf: '',
    telefone: '',
    endereco: '',
    estado: '',
    cidade: '',
    logradouro: '',
    funcao: '',
  }); 

  useEffect(() => {
    ClienteService.getAllClientes()
      .then(response => setClientes(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (id) => {
    ClienteService.deleteClientes(id)
      .then(() => {
        setClientes(prev => prev.filter(c => c.id !== id));
      })
      .catch(error => console.log('Erro ao deletar cliente:', error));
  };

  const handleEdit = (cliente) => {
    setEditClienteId(cliente.id);
    // Remove doacoes e message se estiverem presentes
    const { doacoes, message, ...clienteSemExtras } = cliente;
    setEditedCliente({ ...clienteSemExtras });
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!editClienteId) return;

    ClienteService.updateCliente(editClienteId, editedCliente)
      .then(() => {
        setClientes(prev => prev.map(c => c.id === editClienteId ? { ...c, ...editedCliente } : c));
        setShowModal(false);
      })
      .catch(error => console.error('Erro ao atualizar cliente:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditClienteId(null);
    setEditedCliente({
      nome: '',
      email: '',
      cep: '',
      cpf: '',
      telefone: '',
      endereco: '',
      estado: '',
      cidade: '',
      logradouro: '',
      funcao: '',
    });
  };

  // Pega todos os estados únicos para popular o select
  const estados = [...new Set(clientes.map(c => c.estado))];
  const funcoes = [...new Set(clientes.map(c => c.funcao))];

  return (
    <>
      <div className="clientes-card">
        <Total /> {/* Aqui está correto! */}
        <div className="search-add-container">
          <Form.Control
            type="search"
            placeholder="Pesquisar cliente"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="input-search"
          />
          <div className='select-filters'>
            <select
              value={estado}
              onChange={e => setEstado(e.target.value)}
              className="input-search-select"
            >
              <option value="">Estado</option>
              {estados.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <select
              value={funcao}
              onChange={e => setFuncao(e.target.value)}
              className="input-search-select-role"
            >
              <option value="">Funcao</option>
              {funcoes.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
        </div>
        <div className='clientes-container'>
          <Link to="/Adicionar">
            <Button variant="primary" className='adicionar'>Adicionar usuario</Button>
          </Link>
        </div>

        <Table striped bordered hover variant='white' className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOME</th>
              <th>EMAIL</th>
              <th>CEP</th>
              <th>CPF</th>
              <th>TELEFONE</th>
              <th>ENDEREÇO</th>
              <th>ESTADO</th>
              <th>CIDADE</th>
              <th>NUMERO</th>
              <th>ROLE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {clientes
              .filter(cliente => (
                (cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
                 cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
                 cliente.cep.toLowerCase().includes(busca.toLowerCase()) ||
                 cliente.telefone.toLowerCase().includes(busca.toLowerCase()) ||
                 cliente.endereco.toLowerCase().includes(busca.toLowerCase()) ||
                 cliente.estado.toLowerCase().includes(busca.toLowerCase())) ||
                 cliente.funcao.toLowerCase().includes(busca.toLowerCase()))
                 && (estado === '' || cliente.estado === estado)
                 && (funcao === '' || cliente.funcao === funcao)
              )
              .map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.cep}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.endereco}</td>
                  <td>{cliente.estado}</td>
                  <td>{cliente.cidade}</td>
                  <td>{cliente.logradouro}</td>
                  <td>{cliente.funcao}</td>
                  <td>
                    <Button variant="success" onClick={() => handleEdit(cliente)}>
                      <FaPencil />
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(cliente.id)}>
                      <MdDeleteForever />
                    </Button>
                  </td>
                </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(editedCliente).map(key => (
              <Form.Group controlId={`form${key}`} key={key}>
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type={key === 'senha' ? 'password' : 'text'}
                  name={key}
                  value={editedCliente[key]}
                  onChange={handleChange}
                  placeholder={`Digite o ${key}`}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Clientes;
