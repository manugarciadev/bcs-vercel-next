'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log(data.user);
      router.push('/dashboard')
    } else {
      const errorData = await res.json();
      setError(errorData.message || 'Failed to login');
      setNotification('Failed to login. Please check your credentials.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  return (
    <div className="font-[sans-serif] h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-10   rounded-lg"
      >
        <div className="mb-10 flex flex-col items-center">
          <img
            src="https://i.postimg.cc/yxJyBnsy/logo.png"
            alt="Logo"
            className="w-28 h-28"
          />
          <h2 className="text-blue-800 text-2xl font-bold mt-2">
            Buking Master
          </h2>
        </div>

        {notification && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4">
            {notification}
          </div>
        )}

        <div className="w-full">
          <label className="text-gray-800 text-[15px] mb-2 block">Email</label>
          <div className="relative flex items-center">
            <input
              name="email"
              type="text"
              required
              className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3 rounded-md outline-blue-600"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 w-full">
          <label className="text-gray-800 text-[15px] mb-2 block">Password</label>
          <div className="relative flex items-center">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'} // Alterna entre 'text' e 'password'
            required
            className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent px-4 py-3 pr-12 rounded-md outline-blue-600"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Alterna a visibilidade da senha
            className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
          >
            {showPassword ? (
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-between mt-4 w-full">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="shrink-0 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>

        <div className="mt-8 w-full">
          <button
            type="submit"
            className="w-full shadow-xl py-3 px-6 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Log in
          </button>
        </div>

        <p className="text-sm mt-8 text-center text-gray-800">
          Don't have an account?{' '}
          <a href="javascript:void(0);" className="text-blue-600 font-semibold tracking-wide hover:underline ml-1">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
