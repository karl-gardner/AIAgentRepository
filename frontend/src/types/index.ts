export interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface DashboardData {
  textContent: string;
  updatedAt: string | null;
}

export interface AuthResponse {
  token: string;
  customer: Customer;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface CreateCustomerData {
  name: string;
  email: string;
  password?: string;
}
