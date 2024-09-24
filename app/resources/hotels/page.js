'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProtectedRoute from '../../components/ProtectedRoute';
import Loader from '../../components/Loader';
import dynamic from 'next/dynamic';

const HotelForm = dynamic(() => import('../../components/HotelForm'), { ssr: false });

export default function HotelManagementPage() {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editHotel, setEditHotel] = useState(false); // State to handle fleet editing
  const [formState, setFormState] = useState({
    name: '',
    image: '',
    user_id: ''
  });

  useEffect(() => {
    setLoading(false);

    // Mock Fleet Data
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
    setHotels(mockHotels);

    // Mock Users Data (Drivers)
    const mockUsers = [
      { id: 1, name: 'Owner 1' },
      { id: 2, name: 'Owner 2' }
    ];
    setUsers(mockUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const openModal = (mode = null) => {
    setIsModalOpen(true);
    console.log(mode);
    if(mode == 'edit'){
        setEditHotel(true)
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (editFleet) {
//       // Handle edit fleet
//       const updatedFleets = fleets.map((fleet) =>
//         fleet.id === editFleet.id
//           ? { ...fleet, ...formState, user: { name: users.find(u => u.id == formState.user_id)?.name || 'Unknown' } }
//           : fleet
//       );
//       setFleets(updatedFleets);
//     } else {
//       // Handle add fleet
//       const newFleet = {
//         id: fleets.length + 1,
//         name: formState.name,
//         image_url: formState.image,
//         user: { name: users.find(u => u.id == formState.user_id)?.name || 'Unknown' }
//       };
//       setFleets([...fleets, newFleet]);
//     }
//     closeModal();
//   };

  return (
    <>
      {loading ? (
        <ProtectedRoute>
          <Loader />
        </ProtectedRoute>
      ) : (
        <>
        {isModalOpen ? <>{editHotel ? <HotelForm  isEditing={true} />: <HotelForm  isEditing={false} />}</>
        : <div className="container mx-auto mt-6">
          <button
            onClick={() => openModal("add")}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Hotel
          </button>

          {/* Hotel List */}
          {hotels.length === 0 ? (
            <p>No hotel items available.</p>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Owner</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{hotel.name}</td>
                    <td className="px-6 py-4">{hotel.user.name}</td>
                    <td className="px-6 py-4">
                      <Image
                         src={hotel.image}
                        alt={hotel.name}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openModal("edit")}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          
          {/* {isModalOpen && (
            
            // <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
            //   <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            //     <h2 className="text-2xl font-semibold mb-4">
            //       {editFleet ? 'Edit Fleet' : 'Add Fleet'}
            //     </h2>
            //     <form onSubmit={handleFormSubmit} className="space-y-4">
            //       <div>
            //         <label htmlFor="name" className="block font-medium">Fleet Name:</label>
            //         <input
            //           type="text"
            //           name="name"
            //           value={formState.name}
            //           onChange={handleInputChange}
            //           className="border border-gray-300 p-2 rounded w-full"
            //           required
            //         />
            //       </div>
            //       <div>
            //         <label htmlFor="image" className="block font-medium">Fleet Image (URL):</label>
            //         <input
            //           type="text"
            //           name="image"
            //           value={formState.image}
            //           onChange={handleInputChange}
            //           className="border border-gray-300 p-2 rounded w-full"
            //           placeholder="Image URL"
            //           required
            //         />
            //       </div>
            //       <div>
            //         <label htmlFor="user_id" className="block font-medium">Select Driver:</label>
            //         <select
            //           name="user_id"
            //           value={formState.user_id}
            //           onChange={handleInputChange}
            //           className="border border-gray-300 p-2 rounded w-full"
            //           required
            //         >
            //           <option value="">Select a Driver</option>
            //           {users.map((user) => (
            //             <option key={user.id} value={user.id}>
            //               {user.name}
            //             </option>
            //           ))}
            //         </select>
            //       </div>
            //       <div className="flex justify-end space-x-4">
            //         <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded">
            //           Cancel
            //         </button>
            //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            //           {editFleet ? 'Update Fleet' : 'Add Fleet'}
            //         </button>
            //       </div>
            //     </form>
            //   </div>
            // </div>
          )} */}
        </div>}
        
        </>
      )}
    </>
  );
}
