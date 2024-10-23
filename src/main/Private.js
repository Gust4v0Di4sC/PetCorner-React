import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Verifica se o usuário existe, caso contrário, redireciona para a página de login
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
