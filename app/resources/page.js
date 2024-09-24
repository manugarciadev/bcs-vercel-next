'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';

const FleetManagement = dynamic(() => import('../../app/resources/fleets/page'), { ssr: false });
const HotelManagement = dynamic(() => import('../../app/resources/hotels/page'), { ssr: false });

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('fleet'); // State for the active tab
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(false);
    // const fetchTours = async () => {
    //   try {
    //     const data = await getDayTourActivities();
    //     setTours(data);
    //   } catch (error) {
    //     setError(error.message);
    //   } finally {
    //     // Delay the end of loading by 2500 milliseconds (2.5 seconds)
    //   }
    // };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Converte a string de volta para um objeto
    } else {
      console.log('Nenhum usuário encontrado no localStorage');
    }
  }, []);

  return (
    <>
      {loading ? (
        <ProtectedRoute>
          <Loader />
        </ProtectedRoute>
      ) : (
        <div className="flex h-screen bg-gray-900 ">
          <div className="w-full max-w-7xl mx-auto">
            {/* Tab Bar */}
            <div className="flex mb-6">
              <button
                className={`px-4 py-2 font-semibold ${
                  activeTab === 'fleet' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('fleet')}
              >
                Fleet Management
              </button>
              <button
                className={`ml-4 px-4 py-2 font-semibold ${
                  activeTab === 'hotel' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'
                }`}
                onClick={() => setActiveTab('hotel')}
              >
                Hotel Management
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'fleet' && (
              <>
                <FleetManagement />
              </>
            )}

            {activeTab === 'hotel' && (
              <>
                <HotelManagement />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
