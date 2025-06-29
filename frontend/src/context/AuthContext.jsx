import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app initialization
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        // If there's an error parsing user data, clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (emailOrToken, senha = null) => {
    try {
      let data;
      
      if (senha === null) {
        // Token-based login (used after signup)
        const token = emailOrToken;
        const [headerData] = token.split('.').slice(1);
        const decodedData = JSON.parse(atob(headerData));
        data = {
          token,
          usuario: {
            id: decodedData.usuarioId,
            email: decodedData.email
          }
        };
      } else {
        // Credential-based login
        const response = await fetch('http://localhost:3000/api/usuarios/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailOrToken, senha }),
        });

        data = await response.json();

        if (!response.ok) {
          return { success: false, error: data.erro || 'Erro ao fazer login' };
        }
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.usuario));
      setUser(data.usuario);

      return { success: true, data };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = !!user;

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
