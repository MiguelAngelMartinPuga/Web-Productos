import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Componentes/Login/Login';
import Listado from './Componentes/Listado/Listado';
import Principal from './Componentes/Principal/Principal';
import Usuarios from './Componentes/Usuario/Usuario';
import Registro from './Componentes/Registro/Registro';
import Logout from './Componentes/Logout/Logout';
import CrearProducto from './Componentes/CrearProducto/CrearProducto';
import EditarProducto from './Componentes/EditarProducto/EditarProducto';
import CrearUsuario from './Componentes/CrearUsuario/CrearUsuario';
import EditarUsuario from './Componentes/EditarUsuario/EditarUsuario';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/productos" element={<Listado />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/crear-producto" element={<CrearProducto />} />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route path="/crear-usuario" element={<CrearUsuario />} />
        <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
      </Routes>
    </Router>
  );
};

export default App;