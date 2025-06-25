import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Adicionar from './pages/Adicionar';
import Doacoes from './pages/Doacao';
import Login from './pages/Login';
import AdicionarDoacao from './pages/AdicionarDoacao';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap'; // ✅ Importações corrigidas

function App() {
  const [entrou, setEntrou] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!entrou) {
    return <Login aoEntrar={() => setEntrou(true)} />;
  }

  return (
    <BrowserRouter>
    <>
    <header>
      <nav>
               <ul>
                  <li><Link to="/clientes">Clientes</Link></li>
                  <li><Link to="/adicionar">Adicionar Cliente</Link></li>
                  <li><Link to="/doacao">Doação</Link></li>
                  <li><Link to="/adicionardoacao">Adicionar Doacao</Link></li>
              </ul>
              </nav>
         </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/doacao' element={<Doacoes />} />
          <Route path='/adicionar' element={<Adicionar />} />
          <Route path='/adicionardoacao' element={<AdicionarDoacao />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;


