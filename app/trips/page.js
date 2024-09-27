"use client";
import { useState, useEffect } from 'react';
import Table from "../components/TripTable";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { getTrips, deleteTrip } from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';

export default function Trips() {  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trips, setTrips] = useState([]);
  const [permissions, setPermissions] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
    clone: false,
    export: false,
  });

  useEffect(() => {
    // Recupera o usuário e suas permissões do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Encontra as permissões específicas para 'Products'
      const productPermissions = user?.group?.privileges.find(
        privilege => privilege.name === 'Trips'
      )?.actions[0];

      if (productPermissions) {
        setPermissions({
          view: productPermissions.view || false,
          create: productPermissions.create || false,
          edit: productPermissions.edit || false,
          delete: productPermissions.delete || false,
          clone: productPermissions.clone || false,
          export: productPermissions.export || false,
        });
      }
    }

    const fetchTours = async () => {
      try {
        const data = await getDayTourActivities();
        setTours(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);
  

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getTrips();
        setTrips(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Remove o estado de carregamento após a conclusão
      }
    };

    fetchTrips();
  }, []);

  const router = useRouter();

  const productColumns = [
    { key: 'title', title: 'Title' },
    { key: 'language', title: 'Language' },
    { key: 'startDate', title: 'Starts At' },
    { key: 'endDate', title: 'Ends At' },
  ];

  const handleEditProduct = (tripId) => {
    router.push(`/trips/${tripId}`);
  };

  const handleExportProduct = (tripId) => {
    router.push(`/trips/export/${tripId}`);
  };

  const handleCloneProduct = (tripId) => {
    router.push(`/trips/clone/${tripId}`);
  };

  const handleDeleteProduct = (tripId) => {
    deleteTrip(tripId)
      .then(() => {
        console.log('Trip deletado com sucesso');
        router.push('/trips');
      })
      .catch((error) => {
        console.error('Erro ao deletar o trip:', error.message);
      });
  };

  return (
    <ProtectedRoute>
      {loading ? (
        <Loader />
      ) : (
        <div>
  
          {permissions.create && (
          <Link href="/trips/create">
            <button
              className="px-4 py-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Trip
            </button>
          </Link>
          )}
        
          {console.log(permissions)}
          <Table
            columns={productColumns}
            data={trips}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onClone={handleCloneProduct}
            onExport={handleExportProduct}
            permissions={permissions}
          />
        </div>
      )}
    </ProtectedRoute>
  );
}
