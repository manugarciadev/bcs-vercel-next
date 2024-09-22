"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import {getDayTourActivities, getDayTourActivityById, updateDayTourActivity, deleteDayTourActivity, getTripById} from '../../../services/api';

const TripBoard = dynamic(() => import('../../../components/KanbanBoard'), { ssr: false });

const TripsPage = () => {
  //const pathname = usePathname();
  //const { id } = router.query; // Obtém o ID do produto da URL, se disponível
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(null);
  //const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    
    // Exemplo para simular a extração do ID do URL
    const url = window.location.href;
    const extractedId = url.split('/').pop(); // Extrai o ID da URL
    
    if (extractedId) {
      // Use the imported function to fetch the product
      getTripById(extractedId)
        .then(data => {
          setTrip(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    } else {
      setProduct({});
      setLoading(false); // Initialize with default values for creation
    }

}, []);
  


  return (
    <div>
      <TripBoard isEditing={false} isCloning={true} data={trip} />
    </div>
  );
};

export default TripsPage;
