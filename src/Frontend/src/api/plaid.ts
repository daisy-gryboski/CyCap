import axios from 'axios';

const api = axios.create({
  baseURL: '/api/plaid',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export async function createLinkToken() {
  try {
    const response = await api.post('/create-link-token');
    return response.data.link_token;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to create link token');
  }
}

export async function exchangePublicToken(publicToken: string) {
  try {
    const response = await api.post('/exchange-token', { public_token: publicToken });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Failed to exchange public token');
  }
}

export async function getAccounts() {
  try {
    const response = await api.get('/accounts');
    return response.data.accounts;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return []; // Return empty array if no accounts found
    }
    throw new Error(error.response?.data?.error || 'Failed to fetch accounts');
  }
}