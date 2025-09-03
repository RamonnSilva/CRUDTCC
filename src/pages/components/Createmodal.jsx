import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Createmodal = ({ show, onClose, onCreate, cliente, setCliente }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" value={cliente.nome} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={cliente.email} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" name="senha" value={cliente.senha} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formCep">
            <Form.Label>CEP</Form.Label>
            <Form.Control type="text" name="cep" value={cliente.cep} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control type="text" name="telefone" value={cliente.telefone} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formEndereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" name="endereco" value={cliente.endereco} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formEstado">
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" name="estado" value={cliente.estado} onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formFuncao">
            <Form.Label>Função</Form.Label>
            <Form.Control type="text" name="funcao" value={cliente.funcao} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="success" onClick={onCreate}>Criar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Createmodal;