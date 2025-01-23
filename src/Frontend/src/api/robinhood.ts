import axios from 'axios';

interface RobinhoodCredentials {
  username: string;
  password: string;
}

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function connectRobinhood(credentials: RobinhoodCredentials) {
  try {
    const response = await api.post('/robinhood/connect', credentials);
    if (response.data.status === 'error') {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.error 
      || error.message 
      || 'Failed to connect to Robinhood';
    throw new Error(errorMessage);
  }
}