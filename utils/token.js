// utils-token.js
import jwt from 'jsonwebtoken';

/**
 * Gera um token JWT com os dados fornecidos
 * @param {Object} payload - Dados para incluir no token (ex: { email })
 * @param {string} secret - Chave secreta para assinar o token
 * @param {Object} options - Opções como expiração do token (ex: { expiresIn: '15m' })
 * @returns {string} - Token JWT assinado
 */
export function generateToken(payload, secret, options = {}) {
  return jwt.sign(payload, secret, options);
}

/**
 * Verifica a validade de um token JWT
 * @param {string} token - Token JWT a ser verificado
 * @param {string} secret - Chave secreta usada para assinar o token
 * @returns {Object|boolean} - Retorna os dados decodificados do token ou false se o token for inválido
 */
export function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return false; // Token inválido ou expirado
  }
}

/**
 * Decodifica um token JWT sem verificar sua assinatura
 * @param {string} token - Token JWT a ser decodificado
 * @returns {Object|null} - Retorna os dados decodificados ou null se o token for inválido
 */
export function decodeToken(token) {
  return jwt.decode(token);
}
