import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ClienteService from './services/ClienteService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Clientes.css';
const Clientes = () => {

  const [busca, setBusca] = useState('');
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editClienteId, setEditClienteId] = useState(null); 
  const [editedCliente, setEditedCliente] = useState({
    nome: '',
    email: '',
    senha: '',
    cep: '',
    telefone: '',
  }); 
  useEffect(() => {
    ClienteService.getAllClientes()
      .then(response => {
        const clientes = response.data;
        setClientes(clientes);
        console.log(clientes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    ClienteService.deleteClientes(id)
    .then(() =>{
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
      console.log(`Cliente com ID ${id} foi deletado.`);
    })
    .catch(error => {
      console.log('Erro ao deletar cliente:', error);
    });
};
//isso aqui com certeza vai dar erro no futuro, não me pergunte como isso está funcionando
const handleEdit = (cliente) => {
  setEditClienteId(cliente.id);
  setEditedCliente({
    nome: cliente.nome,
    email: cliente.email,
    senha: cliente.senha,
    cep: cliente.cep,
    telefone: cliente.telefone,
  });
  setShowModal(true);
};

const handleUpdate = () => {
  if (!editClienteId) return;

  ClienteService.updateCliente(editClienteId, editedCliente)
    .then(() => {
      setClientes(prevClientes =>
        prevClientes.map(cliente =>
          cliente.id === editClienteId ? { ...cliente, ...editedCliente } : cliente
        )
      );
      setShowModal(false);
      console.log(`Cliente com ID ${editClienteId} foi atualizado.`);
    })
    .catch(error => {
      console.error('Erro ao atualizar cliente:', error);
    });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditedCliente(prevState => ({
    ...prevState,
    [name]: value,
  }));
};
const handleCloseModal = () => {
  setShowModal(false);
  setEditClienteId(null);
  setEditedCliente({
    nome: '',
    email: '',
    senha: '',
    cep: '',
    telefone: '',
  });
};
  return (
    <>
    <input 
        type="search"
        placeholder="Pesquisar cliente"
        id="input-search"
        value = {busca}
        onChange={ e => setBusca(e.target.value)}
      />


    <Table hover variant='dark' className='tabela'>
      <thead>
        <tr>
          <th>id</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Senha</th>
          <th>Cep</th>
          <th>Telefone</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {clientes
        .filter(cliente =>
           cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
            cliente.email.toLowerCase().includes(busca.toLowerCase()) ||
            cliente.cep.toLowerCase().includes(busca.toLowerCase()) ||
            cliente.telefone.toLowerCase().includes(busca.toLowerCase())
        )
        
        
        .map(cliente => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nome}</td>
            <td>{cliente.email}</td>
            <td>{cliente.senha}</td>
            <td>{cliente.cep}</td>
            <td>{cliente.telefone}</td>
            <td>
            <Button variant="outline-success" onClick={() => handleEdit(cliente)}>
                  Editar
                </Button>
            <Button 
                  variant="outline-danger" 
                  onClick={() => handleDelete(cliente.id)}
                id ="btn-delete">
                  Excluir
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
      


    </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={editedCliente.nome}
              onChange={handleChange}
              placeholder="Digite o nome"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editedCliente.email}
              onChange={handleChange}
              placeholder="Digite o email"
            />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="senha"
              value={editedCliente.senha}
              onChange={handleChange}
              placeholder="Digite a senha"
            />
          </Form.Group>

          <Form.Group controlId="formCep">
            <Form.Label>Cep</Form.Label>
            <Form.Control
              type="text"
              name="cep"
              value={editedCliente.cep}
              onChange={handleChange}
              placeholder="Digite o Cep"
            />
          </Form.Group>

          <Form.Group controlId="formTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              value={editedCliente.telefone}
              onChange={handleChange}
              placeholder="Digite o telefone"
            />
          </Form.Group>
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