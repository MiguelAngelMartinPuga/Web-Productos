import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarUsuario.css';

const EditarUsuario = () => {
  const [user, setUser] = useState({ name: '', email: ''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Obtener los datos del usuario para editar
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/usuario/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setError('');
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        setError('Error al obtener detalles del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate, token]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setLoading(true);

      const updatedUser = {
        name: user.name,
        email: user.email,
      };
      await axios.put(
        `http://127.0.0.1:8000/api/usuario/${id}`,
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/usuarios');
    } catch (error) {
      setError('Error al actualizar usuario');
      console.error('Error al actualizar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editar-usuario-container">
      <button className="volver-btn" onClick={() => navigate('/usuarios')}>
        Atras
      </button>
      <h2 className="editar-usuario-title">Editar Usuario</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Nombre"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Actualizar Usuario'}
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
