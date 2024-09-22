'use client'; // Marca este componente para ser renderizado no lado do cliente
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';
import { getDayTourActivities, updateDayTourActivity, deleteDayTourActivity } from '../services/api';

export default function Home() {


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getDayTourActivities();
        setTours(data);
      } catch (error) {
        setError(error.message);
      } finally {
        // Delay the end of loading by 2500 milliseconds (2.5 seconds)
       setLoading(false);
      }
    };

      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        // Converte a string de volta para um objeto
      } else {
        console.log('Nenhum usuário encontrado no localStorage');
      }


    fetchTours();
  }, []);

  return (
    <>
   
    {loading ? (
      <>
      <ProtectedRoute>

        <Loader />
        </ProtectedRoute>
        </>
        ) : (

    <div className="flex h-screen bg-gray-900 p-6">
      { console.log(">",user.email) }
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Hello,  { user.name || '' }.  Welcome ! 👋</h1>
        </header>

        {/* Contadores */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-400">Today's Money</h2>
            <p className="text-2xl font-bold text-white">$53,000</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-400">Today's Users</h2>
            <p className="text-2xl font-bold text-white">2,300</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-400">New Clients</h2>
            <p className="text-2xl font-bold text-white">+3,462</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-sm font-medium text-gray-400">Sales</h2>
            <p className="text-2xl font-bold text-white">$103,430</p>
          </div>
        </div>

        {/* Seções de Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2 bg-gray-800 p-6 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">Soft UI Dashboard</h3>
              <p className="text-sm text-gray-400">Built by developers</p>
            </div>
            <div>
              <Image src="/rocket-icon.png" alt="Rocket" width={64} height={64} />
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-white">Work with the rockets</h3>
            <p className="text-sm text-gray-400">Wealth creation is an evolution...</p>
            <button className="text-blue-500">Read More</button>
          </div>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-white mb-4">Active Users</h3>
            {/* Gráfico pode ser inserido aqui */}
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-white mb-4">Sales Overview</h3>
            {/* Gráfico pode ser inserido aqui */}
          </div>
        </div>
      </div>
    </div>
     )}
     </>
  
  );
}
