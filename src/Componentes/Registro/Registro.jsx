import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Registro.css';

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/usuario', formData);
      console.log('Registro exitoso:', response.data);

      await Promise.all([
        new Promise((resolve) => setTimeout(resolve, 300)),
        navigate('/login')
      ]);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setMessage('Ocurrió un error en el registro.');
      }
    }

    setLoading(false);
  };

  return (
    <div className="registro-container">
      <h2 className="registro-title">Registrarse</h2>
      {message && <p className="registro-message">{message}</p>}

      <form onSubmit={handleSubmit} className="registro-form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          {errors.name && <p className="registro-error">{errors.name[0]}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          {errors.email && <p className="registro-error">{errors.email[0]}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          {errors.password && <p className="registro-error">{errors.password[0]}</p>}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
          {errors.password_confirmation && (
            <p className="registro-error">{errors.password_confirmation[0]}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <p className="registro-login-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Registro;