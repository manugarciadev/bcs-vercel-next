"use client";
import { useState, useEffect } from 'react';
import Table from "../components/ProductTable";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { getDayTourActivities, updateDayTourActivity, deleteDayTourActivity } from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';

export default function Products() {  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);
  const [permissions, setPermissions] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    // Recupera o usuário e suas permissões do localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Encontra as permissões específicas para 'Products'
      const productPermissions = user?.group?.privileges.find(
        privilege => privilege.name === 'Products'
      )?.actions[0];

      if (productPermissions) {
        setPermissions({
          view: productPermissions.view || false,
          create: productPermissions.create || false,
          edit: productPermissions.edit || false,
          delete: productPermissions.delete || false,
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

  const router = useRouter();

  const productColumns = [
    { key: 'code', title: 'Code' },
    { key: 'status', title: 'Status' },
    { key: 'title', title: 'Title' },
    { key: 'types', title: 'Rate' },
    { key: 'destinations', title: 'Destinations' },
  ];

  const handleEditProduct = (productId) => {
    if (permissions.edit) {
      router.push(`/products/${productId}`);
    } else {
      alert('Você não tem permissão para editar produtos.');
    }
  };

  const updateProductStatus = async (id, newStatus) => {
    if (permissions.edit) {
      const newTour = { status: newStatus };
      try {
        await updateDayTourActivity(id, newTour);
        window.location.reload();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      alert('Você não tem permissão para atualizar o status dos produtos.');
    }
  };

  const handleDeleteProduct = (productId) => {
    if (permissions.delete) {
      deleteDayTourActivity(productId)
        .then(() => {
          console.log('Tour deletado com sucesso');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Erro ao deletar o tour:', error.message);
          window.location.reload();
        });
    } else {
      alert('Você não tem permissão para excluir produtos.');
    }
  };

  return (
    <ProtectedRoute>
      {loading ? (
        <Loader />
        ) : (
        <div>
            {permissions.create && (
            <Link href="/products/create">
              <button className="px-4 py-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Product
              </button>
            </Link>
          )}
          {console.log(permissions)}
          <Table
            columns={productColumns}
            data={tours}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            updateStatus={updateProductStatus}
            permissions={permissions}
          />
        </div>
      )}
    </ProtectedRoute>
  );
}
