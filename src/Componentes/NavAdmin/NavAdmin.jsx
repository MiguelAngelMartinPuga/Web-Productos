import React from 'react';
import { Link } from 'react-router-dom';
import './NavAdmin.css';

const NavAdmin = () => {
  return (
    <nav className="navbar-admin">
      <Link to="/productos" className="nav-button">🛒 Productos</Link>
      <Link to="/usuarios" className="nav-button">👥 Usuarios</Link>
    </nav>
  );
};

export default NavAdmin;
