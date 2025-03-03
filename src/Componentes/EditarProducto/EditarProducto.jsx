import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarProducto.css';

const EditarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Obtener producto desde la API
  const obtenerProducto = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const { data } = await axios.get(`http://localhost:8000/api/producto/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNombre(data.nombre);
      setPrecio(data.precio);
      setDescripcion(data.descripcion);
    } catch (error) {
      console.error('Error al obtener producto:', error);
      setMensaje('Error al cargar el producto');
    }
  }, [id, navigate]);

  useEffect(() => {
    obtenerProducto();
  }, [obtenerProducto]);

  // Validaciones antes de enviar el formulario
  const validarCampos = () => {
    if (!nombre.trim()) return 'El nombre no puede estar vacío';
    if (nombre.length < 3) return 'El nombre debe tener al menos 3 caracteres';

    const precioNumerico = parseFloat(precio);
    if (isNaN(precioNumerico) || precioNumerico <= 0) return 'El precio debe ser un número válido y mayor que 0';

    if (!descripcion.trim()) return 'La descripción no puede estar vacía';
    if (descripcion.length < 10) return 'La descripción debe tener al menos 10 caracteres';

    return null; // No hay errores
  };

  // Enviar la actualización del producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validarCampos();
    if (error) {
      setMensaje(error);
      return;
    }

    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      await axios.put(
        `http://localhost:8000/api/producto/${id}`,
        { nombre, precio: parseFloat(precio), descripcion },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      navigate('/productos');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setMensaje(error.response?.data?.mensaje || 'Error al actualizar producto');
    }

    setLoading(false);
  };

  return (
    <div className="editar-producto-container">
      <button className="volver-btn" onClick={() => navigate('/productos')}>Atrás</button>
      <h2>Editar Producto</h2>

      <form onSubmit={handleSubmit} className="editar-producto-form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? '⏳ Guardando...' : '💾 Guardar Cambios'}
        </button>
      </form>

      {mensaje && <p className="mensaje-error">{mensaje}</p>}
    </div>
  );
};

export default EditarProducto;
