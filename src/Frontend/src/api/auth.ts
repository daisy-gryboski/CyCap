import axios from 'axios';

interface LoginCredentials {
  username: string;
  password: string;
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function login(credentials: LoginCredentials) {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Login failed');
  }
}

export async function register(credentials: LoginCredentials) {
  try {
    const response = await api.post('/auth/register', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Registration failed');
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (error: any) {
    console.error('Logout failed:', error);
  }
}