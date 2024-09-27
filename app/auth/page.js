'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function TwoFactorAuthPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simular o envio do código para a API de verificação
    const res = await fetch('/api/auth/authentication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('2fa-token', data.token);  // Armazena o token no localStorage
      router.push('/');  // Redireciona para o dashboard
    } else {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <form onSubmit={handleSubmit} className="max-w-lg max-md:mx-auto w-full p-6">
          <div className="mb-12 flex flex-col items-center">
            <img src="https://i.postimg.cc/yxJyBnsy/logo.png" alt="Logo" className="w-32 h-32" /> {/* Caminho da imagem local na pasta public */}
            <h2 className="text-blue-800 text-2xl font-bold mt-2">Buking Master - Two Factor Authentication</h2> {/* Título abaixo do logotipo */}
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div>
            <label className="text-gray-800 text-[15px] mb-2 block">Enter 6-digit Code</label>
            <div className="relative flex items-center">
              <input
                name="code"
                type="text"
                maxLength="6"
                required
                className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3.5 rounded-md outline-blue-600"
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                {/* SVG icon */}
              </svg>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Verify
            </button>
          </div>

          <p className="text-sm mt-8 text-center text-gray-800">
            Didn't receive a code?{' '}
            <a href="javascript:void(0);" className="text-blue-600 font-semibold tracking-wide hover:underline ml-1">
              Resend code
            </a>
          </p>
        </form>

        <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
          <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/67/81/c8/caption.jpg?w=500&h=400&s=1" className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative" alt="Dining Experience" />
        </div>
      </div>
    </div>
  );
}
