// pages/api/auth/logout.js
import { removeCookie } from '../../../utils/cookies';

export default function handler(req, res) {
  // Remove os cookies de accessToken e refreshToken
  removeCookie(res, 'accessToken');
  removeCookie(res, 'refreshToken');

  return res.status(200).json({ message: 'Logout bem-sucedido' });
}
