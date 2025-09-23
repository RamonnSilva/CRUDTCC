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
    imagemLivro: '',
    emailSolicitante: '',
    statusPedido: '',
    correios:'',
    dataPedido:'',
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
      idDoacao: pedido.idDoacao,
      tituloLivro: pedido.tituloLivro,
      autorLivro: pedido.autorLivro,
      generoLivro: pedido.generoLivro,
      descricaoLivro: pedido.descricaoLivro,
      imagemLivro: pedido.imagemLivro,
      emailSolicitante: pedido.emailSolicitante,
      statusPedido: pedido.statusPedido,
      correios: pedido.correios,
      dataPedido: pedido.dataPedido,
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
      idDoacao: '',
      tituloLivro: '',
      autorLivro: '',
      generoLivro: '',
      descricaoLivro: '',
      imagemLivro: '',
      emailSolicitante: '',
      statusPedido: '',
      correios:'',
      dataPedido:'',
    });
  };


   
  const statuss = [...new Set(pedidos.map(c => c.statusPedido))];
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

          
          {/* Se quiser adicionar filtros, coloque aqui */}
          <Link to="/adicionar">
            <Button variant="primary" className="adicionar-pedido">Add New Pedido</Button>
          </Link>
        </div>

        <Table striped bordered hover variant='white' className="custom-table">
          <thead>
            <tr>
              <th>ID DOAÇÃO</th>
              <th>TITULO LIVRO</th>
              <th>AUTOR LIVRO</th>
              <th>GENERO LIVRO</th>
              <th>DESCRIÇÃO LIVRO</th>
              <th>IMAGEM LIVRO</th>
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
              .map(pedido => (
                <tr key={pedido.id}>
                 <td>{pedido.iddoacao?.id}</td>
                  <td>{pedido.tituloLivro}</td>
                  <td>{pedido.autorLivro}</td>
                  <td>{pedido.generoLivro}</td>
                  <td>{pedido.descricaoLivro}</td>
                  <td>{pedido.imagemLivro}</td>
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
            <Form.Group controlId="formTitulo">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                name="tituloLivro"
                value={editedPedido.tituloLivro}
                onChange={handleChange}
                placeholder="Digite o titulo"
              />
            </Form.Group>

            <Form.Group controlId="formAutor">
              <Form.Label>Autor</Form.Label>
              <Form.Control
                type="text"
                name="autorLivro"
                value={editedPedido.autorLivro}
                onChange={handleChange}
                placeholder="Digite o autor do livro"
              />
            </Form.Group>

            <Form.Group controlId="formGenero">
              <Form.Label>Genero</Form.Label>
              <Form.Control
                type="text"
                name="generoLivro"
                value={editedPedido.generoLivro}
                onChange={handleChange}
                placeholder="Digite o genero do livro"
              />
            </Form.Group>

            <Form.Group controlId="formDescricao">
              <Form.Label>Descricao</Form.Label>
              <Form.Control
                type="text"
                name="descricaoLivro"
                value={editedPedido.descricaoLivro}
                onChange={handleChange}
                placeholder="Digite a descrição do livro"
              />
            </Form.Group>

            <Form.Group controlId="formImagem">
              <Form.Label>Imagem</Form.Label>
              <Form.Control
                type="text"
                name="imagemLivro"
                value={editedPedido.imagemLivro}
                onChange={handleChange}
                placeholder="URL da imagem"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Solicitante</Form.Label>
              <Form.Control
                type="email"
                name="emailSolicitante"
                value={editedPedido.emailSolicitante}
                onChange={handleChange}
                placeholder="Digite o email do solicitante"
              />
            </Form.Group>

            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="statusPedido"
                value={editedPedido.statusPedido}
                onChange={handleChange}
                placeholder="Digite o status do pedido"
              />
            </Form.Group>

            <Form.Group controlId="formCorreios">
              <Form.Label>Correios</Form.Label>
              <Form.Control
                type="text"
                name="correios"
                value={editedPedido.correios}
                onChange={handleChange}
                placeholder="Digite o código dos correios"
              />
            </Form.Group>

            <Form.Group controlId="formData">
              <Form.Label>Data</Form.Label>
              <Form.Control
                type="text"
                name="dataPedido"
                value={editedPedido.dataPedido}
                onChange={handleChange}
                placeholder="Digite a data do pedido"
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

export default Pedidos;