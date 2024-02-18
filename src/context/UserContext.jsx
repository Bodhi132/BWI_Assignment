import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const checkToken = () => !!localStorage.getItem('token');
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(checkToken());
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

