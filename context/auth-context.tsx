'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTime = localStorage.getItem("loginTime");
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (token && loginTime) {
      const now = new Date().getTime();
      if (now - parseInt(loginTime, 10) > oneDayInMs) {
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = (token: string) => {
    const now = new Date().getTime();
    localStorage.setItem("token", token);
    localStorage.setItem("loginTime", now.toString());
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginTime");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
