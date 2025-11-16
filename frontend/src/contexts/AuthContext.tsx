import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Customer, AuthResponse, LoginCredentials } from '../types';
import { authApi } from '../services/api';

interface AuthContextType {
  user: Customer | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAsCustomer: (customerId: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await authApi.login(credentials);
      setToken(response.token);
      setUser(response.customer);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.customer));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginAsCustomer = async (customerId: string) => {
    try {
      const response: AuthResponse = await authApi.loginAsCustomer(customerId);
      setToken(response.token);
      setUser(response.customer);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.customer));
    } catch (error) {
      console.error('Login as customer failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        loginAsCustomer,
        logout,
        isAuthenticated: !!token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
