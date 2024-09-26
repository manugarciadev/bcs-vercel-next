"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const FleetForm = dynamic(() => import('../../../components/FleetForm'), { ssr: false });

const FleetPage = () => {
  //const pathname = usePathname();
  //const { id } = router.query; // Obtém o ID do produto da URL, se disponível
  const [fleet, setFleet] = useState(null);
  const [loading, setLoading] = useState(null);
  //const [isEditing, setIsEditing] = useState(false);

  useEffect( () => {
    

    // Exemplo para simular a extração do ID do URL
    const url = window.location.href;
    const extractedId = url.split('/').pop(); // Extrai o ID da URL
    if (extractedId) {
        console.log(extractedId);
      // Use the imported function to fetch the product
      const mockFleets = [
        {
          id: 1,
          name: 'Fleet 1',
          user: { name: 'Driver 1' },
          image: '/images/fleets/ertiga.jpg',
        },
        {
          id: 2,
          name: 'Fleet 2',
          user: { name: 'Driver 2' },
          image: '/images/fleets/safari.jpg'
        }
      ];
      const fleetData =  mockFleets.find(fleet => fleet.id === Number(extractedId));
      if (fleetData) {
         setFleet(fleetData);
      } else {
        console.error('Fleet not found');
      }
      setLoading(false);
    } else {
      //setProduct({});
      setLoading(false); // Initialize with default values for creation
    }
    

}, []);
  


  return (
    <div>
        {loading ? (
        <ProtectedRoute>
          <Loader />
        </ProtectedRoute>
      ) : (
      <FleetForm isEditing={true} data={fleet} />)}
    </div>
  );
};

export default FleetPage;
