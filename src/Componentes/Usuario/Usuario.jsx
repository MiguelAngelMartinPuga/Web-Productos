import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Usuario.css';

const Usuario = () => {
  const [users, setUsers] = useState([]);
  const [usersFiltrados, setUsersFiltrados] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  // Obtener usuarios
  const obtenerUsuarios = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:8000/api/usuario', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
      setUsersFiltrados(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      setError('Error al cargar los usuarios.');
    }
    setLoading(false);
  };

  // Buscar usuarios
  const handleBusqueda = (e) => {
    const valor = e.target.value;
    setSearch(valor);
    const filtrados = users.filter((user) =>
      user.name.toLowerCase().includes(valor.toLowerCase())
    );
    setUsersFiltrados(filtrados);
  };

  // Eliminar usuario
  const handleEliminar = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return; 
    setLoading(true);

    try {
      await axios.delete(`http://localhost:8000/api/usuario/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      setUsersFiltrados(usersFiltrados.filter((user) => user.id !== id));
      setUsers(users.filter((user) => user.id !== id)); 
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      setError('Error al eliminar el usuario.'); 
    }

    setLoading(false); // Termina carga
  };

  // Cargar los usuarios al cargar el componente
  useEffect(() => {
    if (!token) {
      navigate('/login'); 
      return;
    }
    obtenerUsuarios(); 
  }, [token, navigate]);

  return (
    <div className="usuarios-container">
      <button className="volver-btn" onClick={() => navigate('/')}>
        Atras
      </button>
      <h2 className="usuarios-title">Listado de Usuarios</h2>


      <button className="crear-btn" onClick={() => navigate('/crear-usuario')}>
        Crear Usuario
      </button>


      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar usuario..."
          value={search}
          onChange={handleBusqueda}
        />
      </div>


      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="error-message">{error}</p>}

      <ul className="user-list">
        {!loading && usersFiltrados.length > 0 ? (
          usersFiltrados.map((user) => (
            <li className="user-item" key={user.id}>
              <div className="user-info">
                <span className="user-name">👤 {user.name}</span>
                <span className="user-email">📧 {user.email}</span>
              </div>

              {/* Botones de editar y eliminar */}
              <div className="user-actions">
                <button className="editar-btn" onClick={() => navigate(`/editar-usuario/${user.id}`)}>
                  Editar
                </button>
                <button className="eliminar-btn" onClick={() => handleEliminar(user.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))
        ) : (
          !loading && <p>No se encontraron usuarios.</p>
        )}
      </ul>
    </div>
  );
};

export default Usuario;
