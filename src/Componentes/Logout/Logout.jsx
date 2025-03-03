import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      await axios.post('http://127.0.0.1:8000/api/logout');

      localStorage.removeItem('access_token');

      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Cerrar sesión</button>
  );
};

export default Logout;
