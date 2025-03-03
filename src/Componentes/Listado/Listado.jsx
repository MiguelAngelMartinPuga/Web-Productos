import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Listado.css';

const Listado = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Obtener productos
  const obtenerProductos = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get('http://localhost:8000/api/producto', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(data);
      setProductosFiltrados(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
    setLoading(false);
  };

  // Buscar productos
  const handleBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    const filtrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(valor.toLowerCase())
    );
    setProductosFiltrados(filtrados);
  };

  // Eliminar producto
  const handleEliminar = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/producto/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      alert('Producto eliminado con éxito');
      

      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      obtenerProductos();
    }
  }, [navigate]);

  if (loading) return <div>⏳ Cargando...</div>;

  return (
    <div className="listado-container">
 
      <button className="volver-btn" onClick={() => navigate('/')}>
        Atras
      </button>

      <h2 className="listado-title">Todos los Productos</h2>

      <button className="crear-btn" onClick={() => navigate('/crear-producto')}>
        Crear
      </button>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={busqueda}
          onChange={handleBusqueda}
        />
      </div>

      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>
                    <button
                      className="editar-btn"
                      onClick={() => navigate(`/editar-producto/${producto.id}`)}
                    >
                    Editar
                    </button>
                    <button
                      className="eliminar-btn"
                      onClick={() => handleEliminar(producto.id)}
                    >
                    Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) 
            :(
              <tr>
                <td colSpan="3">No se encontraron productos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listado;
