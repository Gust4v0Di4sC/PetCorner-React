import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicione essa importação
import api from "../services/api";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate(); // Adicione essa linha

  const login = async (credentials1,credentials2) => {
    try {
      const response = await api.get('/login', {
        params: {
          email: credentials1.email,
          password: credentials2.password
        }
      });
  
      if (response.data.length > 0) {
        const loggedUser = response.data[0];
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setAlert(null);
        navigate('/home');
        return true; // Retorna verdadeiro se o login for bem-sucedido
      } else {
        setAlert({ severity: 'error', message: 'Usuario ou senha incorretos' });
        return false; // Retorna falso se as credenciais forem incorretas
      }
    } catch (error) {
      setAlert({ severity: 'error', message: 'Login failed. Please try again.' });
      return false; // Retorna falso em caso de erro
    }
  };

  const logout = () => {
    setUser(null);  // Remove o usuário do estado global
    localStorage.removeItem('user'); 
    navigate('/'); // Redireciona para a página de login após logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {alert && (
        <Box sx={{ width: 'fit-content', mx: 'auto', my: 2 }}>
          <Alert variant="filled" severity={alert.severity} onClose={() => setAlert(null)}>
            <AlertTitle>{alert.severity === 'error' ? 'Error' : 'Success'}</AlertTitle>
            {alert.message}
          </Alert>
        </Box>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
