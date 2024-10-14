'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader';

export default function UserManagementPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFleet, setEditFleet] = useState(false); // State to handle fleet editing
  const [formState, setFormState] = useState({
    name: '',
    image: '',
    user_id: ''
  });
  const [permissions, setPermissions] = useState({
    view: false,
    create: false,
    edit: false,
    delete: false,
  });
  const router = useRouter();

  useEffect(() => {
    setLoading(false);

    // Mock Fleet Data
    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@bucountrytours.com',
        image: '/images/users/download.jpg',
        role:"Driver"
      },
      {
        id: 2,
        name: 'Peter',
        email: 'peter@bucountrytours.com',
        image: '/images/users/download1.jpg',
        role:"Employee"
      },
      {
        id: 3,
        name: '	Aaron',
        email: 'aaron@bucountrytours.com',
        image: '/images/users/download2.jpg',
        role:"Tour Guide"
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleEditFleet = (fleetId) => {
    router.push('/resources/fleets/' + fleetId);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editFleet) {
      // Handle edit fleet
      const updatedFleets = fleets.map((fleet) =>
        fleet.id === editFleet.id
          ? { ...fleet, ...formState, user: { name: users.find(u => u.id == formState.user_id)?.name || 'Unknown' } }
          : fleet
      );
      setFleets(updatedFleets);
    } else {
      // Handle add fleet
      const newFleet = {
        id: fleets.length + 1,
        name: formState.name,
        image_url: formState.image,
        user: { name: users.find(u => u.id == formState.user_id)?.name || 'Unknown' }
      };
      setFleets([...fleets, newFleet]);
    }
    closeModal();
  };

  return (
    <>
      {loading ? (
        <ProtectedRoute>
          <Loader />
        </ProtectedRoute>
      ) : (
        <>
        <div className="container mx-auto mt-6">
        {/* <Link href="/resources/fleets/create">
              <button className="px-4 py-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Fleet
              </button>
            </Link> */}

          <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          // value={searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by user..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

          {/* Fleet List */}
          {users.length === 0 ? (
            <p>No user items available.</p>
          ) : (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <Image
                         src={user.image}
                        alt={user.name}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                    {user.role}
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
        </div>
        
        </>
      )}
    </>
  );
}
