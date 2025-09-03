import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import DoacaoService from './services/DoacaoService';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./styles/Doacoes.css"
import { Link } from 'react-router-dom';

const Doacoes = () => {

  const [busca, setBusca] = useState('');
  const [doacoes, setDoacoes] = useState([]);
  const [showModal, setShowModal] = useState(false); 
  const [editDoacaoId, setEditDoacaoId] = useState(null); 
  const [editedDoacao, setEditedDoacao] = useState({
    nome: '',
    titulo: '',
    genero: '',
    autor: '',
    descricao: '',
    email: '',
  }); 
  useEffect(() => {
    DoacaoService.getAllDoacoes()
      .then(response => {
        const doacoes = response.data;
        setDoacoes(doacoes);
        console.log(doacoes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = (id) => {
    DoacaoService.deleteDoacoes(id)
    .then(() =>{
      setDoacoes(prevDoacao => prevDoacao.filter(doacao => doacao.id !== id));
      console.log(`Doacao com ID ${id} foi deletado.`);
    })
    .catch(error => {
      console.log('Erro ao deletar doacao:', error);
    });
};
//isso aqui com certeza vai dar erro no futuro, não me pergunte como isso está funcionando
const handleEdit = (doacao) => {
  setEditDoacaoId(doacao.id);
  setEditedDoacao({
    nome: doacao.nome,
    titulo: doacao.titulo,
    genero: doacao.genero,
    autor: doacao.autor,
    descricao: doacao.descricao,
    email: doacao.email,
  });
  setShowModal(true);
};

const handleUpdate = () => {
  if (!editDoacaoId) return;

  DoacaoService.updateDoacoes(editDoacaoId, editedDoacao)
    .then(() => {
      setDoacoes(prevDoacoes =>
        prevDoacoes.map(doacao =>
          doacao.id === editDoacaoId ? { ...doacao, ...editedDoacao } : doacao
        )
      );
      setShowModal(false);
      console.log(`Doacao com ID ${editDoacaoId} foi atualizado.`);
    })
    .catch(error => {
      console.error('Erro ao atualizar doacao:', error);
    });
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditedDoacao(prevState => ({
    ...prevState,
    [name]: value,
  }));
};
const handleCloseModal = () => {
  setShowModal(false);
  setEditDoacaoId(null);
  setEditedDoacao({
    nome: '',
    titulo: '',
    genero: '',
    autor: '',
    descricao: '',
  });
};
  return (
    <>
    <div className='first-container'>
    <input 
        type="search"
        placeholder="Pesquisar doacao"
        id="input-search"
        value = {busca}
        onChange={ e => setBusca(e.target.value)}
      />
      <Link to="/adicionardoacao">
         <Button variant="warning" className='adicionar-2'>+</Button>{''}
      </Link>
      </div>

   <Table striped bordered hover variant='white' className="custom-table">
      <thead>
        <tr>
          <th>id</th>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Titulo</th>
          <th>Genero</th>
          <th>Autor</th>
          <th>Descricao</th>
          <th>Email</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {doacoes
        .filter(doacao =>
           doacao.nome.toLowerCase().includes(busca.toLowerCase()) ||
           doacao.titulo.toLowerCase().includes(busca.toLowerCase()) ||
           doacao.genero.toLowerCase().includes(busca.toLowerCase()) ||
           doacao.autor.toLowerCase().includes(busca.toLowerCase())
        )
        
        
        .map(doacao => (
          <tr key={doacao.id}>
            <td>{doacao.id}</td>
            <td>{doacao.imagem ?(
              <img src={`http://localhost:8080/doacao/${doacao.id}/imagem`} alt="Imagem da Doacao" className="img-thumbnail" style={{width:'60px', height:'60px'}}/>
            ) : (
              <span>Sem imagem</span> 
            )
            
          }</td>
            <td>{doacao.nome}</td>
            <td>{doacao.titulo}</td>
            <td>{doacao.genero}</td>
            <td>{doacao.autor}</td>
            <td>{doacao.descricao}</td>
            <td>{doacao.email}</td>
            <td>
            <Button variant="outline-success" onClick={() => handleEdit(doacao)}>
                  Editar
                </Button>
            <Button 
                  variant="outline-danger" 
                  onClick={() => handleDelete(doacao.id)}
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
        <Modal.Title>Editar Doacao</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={editedDoacao.nome}
              onChange={handleChange}
              placeholder="Digite o nome"
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={editedDoacao.titulo}
              onChange={handleChange}
              placeholder="Digite o titulo"
            />
          </Form.Group>

          <Form.Group controlId="formSenha">
            <Form.Label>Genero</Form.Label>
            <Form.Control
              type="text"
              name="genero"
              value={editedDoacao.genero}
              onChange={handleChange}
              placeholder="Digite o genero"
            />
          </Form.Group>

          <Form.Group controlId="formCep">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="autor"
              value={editedDoacao.autor}
              onChange={handleChange}
              placeholder="Digite o autor"
            />
          </Form.Group>

          <Form.Group controlId="formTelefone">
            <Form.Label>Descricao</Form.Label>
            <Form.Control
              type="text"
              name="descricao"
              value={editedDoacao.descricao}
              onChange={handleChange}
              placeholder="Digite a descricao"
            />
          </Form.Group>

          
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={editedDoacao.email}
              onChange={handleChange}
              placeholder="Digite o email"
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


export default Doacoes;