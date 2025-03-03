import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavAdmin from '../NavAdmin/NavAdmin';
import './Principal.css';

const Principal = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      obtenerUsuario(token);
      obtenerProductos(token);
    }
  }, [navigate]);

  const obtenerUsuario = async (token) => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  };

  const obtenerProductos = async (token) => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:8000/api/producto', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(data);
      setProductos(data);
      setProductosFiltrados(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
    setLoading(false);
  };
  

  const handleBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(valor.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  if (loading) return <div>⏳ Cargando...</div>;

  return (
    <div className="principal-container">
      <header className="principal-header">
        {isAdmin && <NavAdmin />}
        <button onClick={handleLogout} className="logout-button">
          🔒 Cerrar sesión
        </button>
      </header>

      <main className="principal-main">
        <h2>✨ Página Principal ✨</h2>
        <p>Bienvenido a la aplicación. Aquí tienes la lista de productos disponibles:</p>

        <input
          type="text"
          placeholder="🔎 Buscar producto por nombre..."
          value={busqueda}
          onChange={handleBusqueda}
          className="buscador-input"
        />

        <div className="productos-container">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="producto-card">
                <h3>{producto.nombre}</h3>
                <p>💲 Precio: {producto.precio}</p>
                <p>📦 Descripción: {producto.descripcion}</p>
              </div>
            ))
          ) : (
            <p>⚡ No se encontraron productos con ese nombre.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Principal;
