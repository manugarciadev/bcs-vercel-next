"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import {getDayTourActivities, getDayTourActivityById, updateDayTourActivity, deleteDayTourActivity} from '../../services/api';

const ProductForm = dynamic(() => import('../../components/ProductForm'), { ssr: false });

const ProductsPage = () => {
  //const pathname = usePathname();
  //const { id } = router.query; // Obtém o ID do produto da URL, se disponível
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(null);
  //const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    

    // Exemplo para simular a extração do ID do URL
    const url = window.location.href;
    const extractedId = url.split('/').pop(); // Extrai o ID da URL
    
    if (extractedId) {
      // Use the imported function to fetch the product
      getDayTourActivityById(extractedId)
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    } else {
      //setProduct({});
      setLoading(false); // Initialize with default values for creation
    }

}, []);
  


  return (
    <div>
      <ProductForm isEditing={true} data={product} />
    </div>
  );
};

export default ProductsPage;
