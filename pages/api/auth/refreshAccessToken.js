// utils/auth.js
import axios from 'axios';

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return null;  // Nenhum refresh token disponível
  }

  try {
    const response = await axios.post('https://bukingmaster.com/api_/refresh-token', { refreshToken });
    const { token } = response.data;

    // Atualiza o token no localStorage
    localStorage.setItem('token', token);

    return token;
  } catch (error) {
    console.error('Erro ao renovar o token', error);
    return null;  // Se falhar, retornar null para forçar o logout
  }
}
