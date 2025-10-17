import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import PedidoService from './services/PedidoService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import "./styles/Pedidos.css";
const Pedidos = () => {
  const [busca, setBusca] = useState('');
  const [pedidos, setPedidos] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editPedidoId, setEditPedidoId] = useState(null); 
  const [statusPedido, setStatusPedido] = useState('');
  const [status, setStatus] = useState('');
  const [editedPedido, setEditedPedido] = useState({
    idDoacao: '',
    tituloLivro: '',
    autorLivro: '',
    generoLivro: '',
    descricaoLivro: '',
    emailSolicitante: '',
    statusPedido: '',
    correios:'',
  }); 

  useEffect(() => {
    PedidoService.getAllPedidos()
      .then(response => {
        const pedidos = response.data;
        setPedidos(pedidos);
        console.log(pedidos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    PedidoService.deletePedidos(id)
    .then(() =>{
      setPedidos(prevPedidos => prevPedidos.filter(pedido => pedido.id !== id));
      console.log(`Pedido com ID ${id} foi deletado.`);
    })
    .catch(error => {
      console.log('Erro ao deletar pedido:', error);
    });
  };

  const handleEdit = (pedido) => {
    setEditPedidoId(pedido.id);
    setEditedPedido({
      tituloLivro: pedido.tituloLivro,
      autorLivro: pedido.autorLivro,
      generoLivro: pedido.generoLivro,
      descricaoLivro: pedido.descricaoLivro,
      emailSolicitante: pedido.emailSolicitante,
      statusPedido: pedido.statusPedido,
      imagemLivro: pedido.imagemLivro,
      correios: pedido.correios,
    });
    setShowModal(true);
  };

  const handleUpdate = () => {
    if (!editPedidoId) return;

    PedidoService.updatePedidos(editPedidoId, editedPedido)
      .then(() => {
        setPedidos(prevPedidos =>
          prevPedidos.map(pedido =>
            pedido.id === editPedidoId ? { ...pedido, ...editedPedido } : pedido
          )
        );
        setShowModal(false);
        console.log(`Pedido com ID ${editPedidoId} foi atualizado.`);
      })
      .catch(error => {
        console.error('Erro ao atualizar pedido:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPedido(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditPedidoId(null);
    setEditedPedido({
      tituloLivro: '',
      autorLivro: '',
      generoLivro: '',
      descricaoLivro: '',
      emailSolicitante: '',
      statusPedido: '',
      imagemLivro: null,
      correios:'',
    });
  };


   
  const status_pedido = [...new Set(pedidos.map(c => c.statusPedido))];
  return (
    <>
      <div className="pedido-card">
        <div className="search-add-pedido">
          <Form.Control
            type="search"
            placeholder="Pesquisar Pedido"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="input-search"
          />
          <div className='select-filters'>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="input-search-2-select-role"
            >
              <option value="">Status</option>
              {status_pedido.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          
        </div>

        <Table striped bordered hover variant='white' className="custom-table">
          <thead>
            <tr>
              <th>ID DOAÇÃO</th>
              <th>TITULO LIVRO</th>
              <th>AUTOR LIVRO</th>
              <th>GENERO LIVRO</th>
              <th>DESCRIÇÃO LIVRO</th>
              <th>EMAIL SOLICITANTE</th>
              <th>STATUS PEDIDO</th>
              <th>CODIGO CORREIOS</th>
              <th>DATA PEDIDO</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {pedidos
              .filter(pedido =>
                (
                  (pedido.idDoacao || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.tituloLivro || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.autorLivro || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.generoLivro || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.descricaoLivro || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.emailSolicitante || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.statusPedido || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.correios || '').toLowerCase().includes(busca.toLowerCase()) ||
                  (pedido.dataPedido || '').toLowerCase().includes(busca.toLowerCase())
                )
                && (status === '' || pedido.statusPedido === status)
              )
              .map(pedido => (
                <tr key={pedido.id}>
                 <td>{pedido.iddoacao?.id}</td>
                  <td>{pedido.tituloLivro}</td>
                  <td>{pedido.autorLivro}</td>
                  <td>{pedido.generoLivro}</td>
                  <td>{pedido.descricaoLivro}</td>
                  <td>{pedido.emailSolicitante}</td>
                  <td>{pedido.statusPedido}</td>
                  <td>{pedido.correios}</td>
                  <td>{pedido.dataPedido}</td>
                  <td>
                    <Button variant="success" onClick={() => handleEdit(pedido)}>
                      <FaPencil />
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(pedido.id)}
                      id="btn-delete"
                    >
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
          <Modal.Title>Editar Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(editedPedido)
            .filter(key => key !== 'imagemLivro')
            .map(key => (
              key === 'statusPedido' ? (
                <Form.Group controlId={`form${key}`} key={key}>
                  <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                  <Form.Select
                    name={key}
                    value={editedPedido[key]}
                    onChange={handleChange}
                  >
                    <option value="">Selecione o Status</option>
                    <option value="A caminho">Pedido a caminho</option>
                    <option value="Cancelado">Pedido cancelado</option>
                    <option value="Entregue">Pedido entregue</option>
                  </Form.Select>
                </Form.Group>
              ) : (
                <Form.Group controlId={`form${key}`} key={key}>
                  <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                  <Form.Control
                    type={key === 'dataPedido' ? 'datetime-local' : 'text'}
                    name={key}
                    value={editedPedido[key]}
                    onChange={handleChange}
                    placeholder={`Digite o ${key}`}
                  />
                </Form.Group>
              )
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

export default Pedidos;