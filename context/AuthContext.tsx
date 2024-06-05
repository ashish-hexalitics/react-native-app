import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getItem, setItem, clear } from '../utils/AsyncStorage';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (user: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authUser = await getItem("authUser");
      if (authUser) {
        setIsAuthenticated(true);
        setUser(authUser);
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (user: any) => {
    setIsAuthenticated(true);
    setUser(user);
    await setItem("authUser", user);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUser(null);
    await clear();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
