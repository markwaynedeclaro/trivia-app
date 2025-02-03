import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(() => sessionStorage.getItem('token'));


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
      sessionStorage.setItem('token', token);
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Rethrow error so it can be caught in the component
    }
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};