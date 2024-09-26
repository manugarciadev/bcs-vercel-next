"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const HotelForm = dynamic(() => import('../../../components/HotelForm'), { ssr: false });

const HotelPage = () => {
  //const pathname = usePathname();
  //const { id } = router.query; // Obtém o ID do produto da URL, se disponível
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(null);
  //const [isEditing, setIsEditing] = useState(false);

  useEffect( () => {
    

    // Exemplo para simular a extração do ID do URL
    const url = window.location.href;
    const extractedId = url.split('/').pop(); // Extrai o ID da URL
    if (extractedId) {
        console.log(extractedId);
      // Use the imported function to fetch the product
      const mockHotels = [
        {
          id: 1,
          name: 'Hotel 1',
          user: { name: 'Owner 1' },
          image: '/images/hotels/hotel1.jpg',
        },
        {
          id: 2,
          name: 'Hotel 2',
          user: { name: 'Owner 2' },
          image: '/images/hotels/hotel2.jpg'
        }
      ];
      const hotelData =  mockHotels.find(hotel => hotel.id === Number(extractedId));
      if (hotelData) {
        setHotel(hotelData);
      } else {
        console.error('Hotel not found');
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
      <HotelForm isEditing={true} data={hotel} />)}
    </div>
  );
};

export default HotelPage;
