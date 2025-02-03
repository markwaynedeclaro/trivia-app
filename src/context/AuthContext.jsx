import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => sessionStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const token = await response.text();
      setToken(token);  
      setIsAuthenticated(true);
      sessionStorage.setItem('token', token);
    } catch (error) {
      setIsAuthenticated(false);
      console.error('Error during login:', error);
      throw error; // Rethrow error so it can be caught in the component
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};