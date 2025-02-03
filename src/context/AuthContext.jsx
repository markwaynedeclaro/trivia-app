import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

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
        console.info(response.error);
        throw new Error('Login failed');
      }

      const data = await response.text();
      setToken(data.token);  // Assuming the API returns a token field
    } catch (error) {
      console.error('Error during login:', error);
      onsole.info(error.error);
      throw error; // Rethrow error so it can be caught in the component
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};