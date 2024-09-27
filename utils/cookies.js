// utils/cookies.js
import { serialize } from 'cookie';

export function setCookie(res, name, value, options = {}) {
  const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

  const opts = { httpOnly: true, ...options };

  res.setHeader('Set-Cookie', serialize(name, stringValue, opts));
}

export function removeCookie(res, name) {
  setCookie(res, name, '', { maxAge: -1 });
}
