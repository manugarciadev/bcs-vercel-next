"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedCodeRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('2fa-token');
    if (!token) {
      router.push('/auth');  // Redireciona se não houver token
    }
  }, [router]);

  return <>{children}</>;
}
