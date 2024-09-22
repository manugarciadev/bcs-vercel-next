// utils/auth.js
import axios from 'axios';

export async function refreshAccessToken() {
  try {
    const response = await axios.post('/api/auth/refresh');
    return response.data.accessToken;
  } catch (error) {
    console.log('Erro ao atualizar o token de acesso', error);
    return null;
  }
}
