import axios from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
  Customer,
  CreateCustomerData,
  DashboardData,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  loginAsCustomer: async (customerId: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login-as-customer', {
      customerId,
    });
    return response.data;
  },
};

// Customer API
export const customerApi = {
  getAll: async (): Promise<Customer[]> => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
  },

  getById: async (id: string): Promise<Customer> => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  create: async (data: CreateCustomerData): Promise<Customer> => {
    const response = await api.post<Customer>('/customers', data);
    return response.data;
  },
};

// Dashboard API
export const dashboardApi = {
  getData: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/dashboard');
    return response.data;
  },

  saveData: async (textContent: string): Promise<DashboardData> => {
    const response = await api.put<DashboardData>('/dashboard', { textContent });
    return response.data;
  },

  getCustomerData: async (customerId: string): Promise<DashboardData> => {
    const response = await api.get<DashboardData>(`/dashboard/${customerId}`);
    return response.data;
  },
};

export default api;
