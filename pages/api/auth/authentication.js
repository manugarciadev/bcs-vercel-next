// pages/api/auth/login.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    try {
      // Fazer a requisição para seu backend em Node.js
      const response = await axios.post('https://bukingmaster.com/api_/auth', { code });

      // Verifique a resposta e envie o token ou outra informação ao cliente
      const { token } = response.data; // Supondo que o backend retorne um token JWT
      res.status(200).json({ token });

    } catch (error) {
      res.status(401).json({ message: 'Falha no login, verifique suas credenciais' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
