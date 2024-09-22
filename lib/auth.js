import axios from './axiosInstance';

export async function refreshAccessToken() {
  try {
    // Faz a requisição ao endpoint de refresh
    const response = await axios.post('/api/auth/refresh');

    // Se a requisição for bem-sucedida, retorna o novo refreshToken
    return response.data.refreshToken;
  } catch (error) {
    console.log('Erro ao atualizar o token de acesso:', error);
    return null;
  }
}
