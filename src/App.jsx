import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Adicionar from './pages/Adicionar';
import Doacoes from './pages/Doacao';
import Login from './pages/Login';
import Pedidos from './pages/Pedidos';
import AdicionarDoacao from './pages/AdicionarDoacao';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Button, Offcanvas } from 'react-bootstrap'; 

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
       <img src='public\icone-png.png' alt='Logo da Empresa' className='logo'/>
      <nav>
               <ul>
                  <Link to="/clientes"><img  className="user"src='public\icons8-usuário-60.png'></img></Link>  
                  <Link to="/doacao"><img src="public\icons8-doar-50.png"></img></Link>
                  <Link to="/pedido"><img src="public\icons8-truck-50.png"></img></Link>
                  
              </ul>
              </nav>
         </header>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/doacao' element={<Doacoes />} />
           <Route path='/pedido' element={<Pedidos />} />
          <Route path='/adicionar' element={<Adicionar />} />
          <Route path='/adicionardoacao' element={<AdicionarDoacao />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;


