import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CrearProducto.css';

const CrearProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !precio || !descripcion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);

    try {
      await axios.post('http://127.0.0.1:8000/api/producto', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/productos');
    } catch (err) {
      console.error('Error al crear producto:', err);
      setError('Hubo un problema al crear el producto.');
    }

    setLoading(false);
  };

  return (
    <div className="crear-producto-container">
      <button className="volver-btn" onClick={() => navigate('/productos')}>
        Atrás
      </button>

      <h2>Crear Nuevo Producto</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="crear-producto-form">
        <label>Nombre del Producto:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Laptop Dell XPS"
          required
          autoComplete="off"
        />

        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Ej: 1500.00"
          required
          autoComplete="off"
        />

        <label>Descripción:</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalles del producto..."
          required
        />

        <button type="submit" className="crear-btn" disabled={loading}>
          {loading ? '⏳ Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default CrearProducto;
