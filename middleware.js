// middleware.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req) {

  const { cookies } = req;

  const accessToken = cookies.get('accessToken');
  const refreshToken = cookies.get('refreshToken');

  console.log("->",accessToken, refreshToken);

  const url = req.nextUrl.clone();
  const protectedRoutes = ['/roles']; // Adicione aqui suas rotas protegidas

  // Verifica se o usuário está acessando uma rota protegida
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!accessToken) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    try {
      jwt.verify(accessToken, process.env.JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      if (refreshToken) {
        try {
          
          // Verifica e renova o token de acesso usando o refresh token
          const newAccessToken = jwt.sign(
            { email: jwt.decode(refreshToken).email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
          );

          const res = NextResponse.next();
          res.cookies.set('accessToken', newAccessToken, { httpOnly: true });
          return res;
        } catch (refreshError) {
          url.pathname = '/login';
          return NextResponse.redirect(url);
        }
      } else {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

// Defina o escopo do middleware, protegendo apenas rotas específicas
export const config = {
  matcher: ['/roles/:path*'], // Adicione aqui suas rotas
};
