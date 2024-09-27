"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getLocations, getLocationById, updateLocation, addLocation, deleteLocation, getLocationGroups, getLocationGroupById, updateLocationGroup, addLocationGroup, deleteLocationGroup } from '../../services/api';
import dynamic from 'next/dynamic';

const InteractiveMapSingle = dynamic(() => import('../../components/InteractiveMapSingle'), { ssr: false });

export default function Locations() {
  const [showModal, setShowModal] = useState(false);
  const [locationTitle, setLocationTitle] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [locations, setLocations] = useState([]);
  const [locationGroups, setLocationGroups] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([14.940874, -23.513058]); // Posição inicial do mapa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groups, setGroups] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('locations'); // Define o cenário atual
  const [selectedGroup, setSelectedGroup] = useState('');

  const initialLat = -23.55052; // Example latitude (e.g., São Paulo, Brazil)
  const initialLng = -46.633308; // Example longitude (e.g., São Paulo, Brazil)
  const [location, setLocation] = useState([initialLat, initialLng]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentScenario === 'locations') {
          const data = await getLocations();
          setLocations(data);
          const locationGroupsData = await getLocationGroups();
          setGroups(locationGroupsData);
        } else {
          const data = await getLocationGroups();
          setLocationGroups(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentScenario]);

  const handleEditItem = async (itemId) => {
    try {
      if (currentScenario === 'locations') {
        const location = await getLocationById(itemId);
        setEditingItem(location);
        setLocationTitle(location.title);
        setSelectedGroup(location.type);
        setLocation([parseFloat(location.coordinates.lat), parseFloat(location.coordinates.lng)]);
      } else {
        const group = await getLocationGroupById(itemId);
        setEditingItem(group);
        setLocationTitle(group.title);
      }
      setShowModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      if (currentScenario === 'locations') {
        await deleteLocation(itemId);
      } else {
        await deleteLocationGroup(itemId);
      }

      const updatedData = currentScenario === 'locations'
        ? await getLocations()
        : await getLocationGroups();

      currentScenario === 'locations' ? setLocations(updatedData) : setLocationGroups(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!locationTitle.trim()) {
      alert('Please enter a title.');
      return;
    }

    const locationData = {
      title: locationTitle,
      type: selectedGroup,
      coordinates: {
        lat: location[0],
        lng: location[1]
      }
    };

    console.log(location);

    try {
      if (editingItem) {
        if (currentScenario === 'locations') {
          await updateLocation(editingItem._id, locationData);
        } else {
          await updateLocationGroup(editingItem._id, { title: locationTitle });
        }
      } else {
        if (currentScenario === 'locations') {
          await addLocation(locationData);
        } else {
          await addLocationGroup({ title: locationTitle, options: ['locations'] });
        }
      }

      const updatedData = currentScenario === 'locations'
        ? await getLocations()
        : await getLocationGroups();

      currentScenario === 'locations' ? setLocations(updatedData) : setLocationGroups(updatedData);
      setShowModal(false); // Fecha o modal
      setEditingItem(null); // Limpa o item em edição
      setLocationTitle(''); // Limpa o título
      setCurrentLocation([14.940874, -23.513058]); // Reseta a localização
    } catch (error) {
      console.error('Error saving item:', error.message);
      alert('Failed to save item. Please try again.');
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {currentScenario === 'locations' ? 'Add Location' : 'Add Location Group'}
        </button>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentScenario('locations')}
            className={`px-4 py-2 rounded-md ${currentScenario === 'locations' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Manage Locations
          </button>
          <button
            onClick={() => setCurrentScenario('locationGroups')}
            className={`px-4 py-2 rounded-md ${currentScenario === 'locationGroups' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Manage Location Groups
          </button>
        </div>
      </div>

      <Table
        columns={currentScenario === 'locations' ? [{ key: 'title', title: 'Title' }, { key: 'type', title: 'Group' }] : [{ key: 'title', title: 'Title' }]}
        data={currentScenario === 'locations' ? locations : locationGroups}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem} // Adiciona a função de delete ao componente Table
      />

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={editingItem ? `Edit ${currentScenario === 'locations' ? 'Location' : 'Location Group'}` : `Add ${currentScenario === 'locations' ? 'Location' : 'Location Group'}`}
      >
        <div className="flex flex-col space-y-4 items-center relative">
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <InformationCircleIcon
              id="info-icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer"
              data-tooltip-content="Translation automatic to: Portuguese; Spanish; German; French"
            />
          </div>
          <Tooltip anchorSelect="#info-icon" />
          <div className="mb-4 w-full">
            <label htmlFor="locationTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              id="locationTitle"
              type="text"
              value={locationTitle}
              onChange={(e) => setLocationTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Enter Title"
            />
          </div>
         

          {currentScenario === 'locations' && (
          <div className="mb-4 w-full">
            <select
                  id="group"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full p-2 mb-4 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select a group</option>
                  {groups.map((group) => (
                    <option key={group._id} value={group.title}>
                      {group.title}
                    </option>
                  ))}
                </select>
          </div>
          )}
        
          {currentScenario === 'locations' && (

            <div className="mb-4 w-full h-64">
              
              <InteractiveMapSingle
                setLocation={setLocation}
                initialPosition={location}
              />
            </div>
          )}
          <div className="flex justify-end space-x-2 w-full">
            <button
             onClick={() => {
              setShowModal(false);
              setEditingItem(null); // Define `editingItem` como `null` ao fechar o modal
            }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
