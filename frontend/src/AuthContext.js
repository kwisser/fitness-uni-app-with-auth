import React, { createContext, useState, useEffect } from 'react';
import { userIsLoggedIn } from './tools/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Überprüfen Sie hier den initialen Login-Status, z.B. aus Cookies, localStorage, usw.
  useEffect(() => {
    setIsLoggedIn(userIsLoggedIn());
  }, []);


  const login = () => setIsLoggedIn(true); // Update bei Login
  const logout = () => setIsLoggedIn(false); // Update bei Logout

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
