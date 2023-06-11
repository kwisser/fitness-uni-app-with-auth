import React, { createContext, useState, useEffect } from 'react';
import { userIsLoggedIn } from './tools/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Überprüfen Sie hier den initialen Login-Status, z.B. aus Cookies, localStorage, usw.
  useEffect(() => {
    setIsLoggedIn(userIsLoggedIn());
  }, []);
  

  const login = () => setIsLoggedIn(true); // Update beim Einloggen
  const logout = () => setIsLoggedIn(false); // Update beim Ausloggen

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
