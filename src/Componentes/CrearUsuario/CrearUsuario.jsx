import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CrearUsuario.css';

const CrearUsuario = () => {
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError('Todos los campos son obligatorios');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('http://127.0.0.1:8000/api/usuario', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //Redirección rápida
      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 300)),
        navigate('/usuarios')
      ]);
      
    } catch (error) {
      console.error('Error al crear usuario:', error);
      setError(error.response?.data?.message || 'Error al crear el usuario');
    }

    setLoading(false);
  };

  return (
    <div className="crear-usuario-container">
      <button className="volver-btn" onClick={() => navigate('/usuarios')}>
        Atrás
      </button>
      <h2 className="crear-usuario-title">Crear Usuario</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="user-form">
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          autoComplete="new-password"
        />
        <button onClick={handleCreateUser} disabled={loading}>
          {loading ? '⏳ Creando...' : 'Crear Usuario'}
        </button>
      </div>
    </div>
  );
};

export default CrearUsuario;