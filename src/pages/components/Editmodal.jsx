const Editmodal = ({ show, onClose, onUpdate, cliente, setCliente }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campos de edição */}
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" name="nome" value={cliente.nome} onChange={handleChange} />
          </Form.Group>

          {/* Repetir para os outros campos */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="success" onClick={onUpdate}>Salvar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Editmodal;
