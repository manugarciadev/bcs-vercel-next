"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getDestinations, addDestination, getDestinationById, deleteDestination, updateDestination, getDestinationGroups, addDestinationGroup, getDestinationGroupById, updateDestinationGroup, deleteDestinationGroup } from '../../services/api';

export default function DestinationsAndGroups() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [data, setData] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('destinations'); // 'destinations' or 'groups'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = currentScenario === 'destinations' ? await getDestinations() : await getDestinationGroups();
        setData(data);

        if (currentScenario === 'destinations') {
          const groupsData = await getDestinationGroups();
          setGroups(groupsData);
        }
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentScenario]);

  
  const handleDeleteItem = async (itemId) => {
    try {
      if (currentScenario === 'destinations') {
        await deleteDestination(itemId);
      } else {
        await deleteDestinationGroup(itemId);
      }
  
      const updatedData = currentScenario === 'destinations'
        ? await getDestinations()
        : await getDestinationGroups();
  
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item. Please try again.');
    }
  };
  

  const handleEditItem = async (itemId) => {
    try {
      const item = currentScenario === 'destinations'
        ? await getDestinationById(itemId)
        : await getDestinationGroupById(itemId);
  
      setEditingItem(item);
      setTitle(item.title);
      setSelectedGroup(item.type);
      
  
      if (currentScenario === 'destinations') {
        //setSelectedGroup(item.groupId || '');
      }
  
      setShowModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSave = async () => {
    try {
      
        if (editingItem) {
            // Atualiza um item existente
            if (currentScenario === 'destinations') {
                await updateDestination(editingItem._id, { title, type: selectedGroup });
            } else {
                await updateDestinationGroup(editingItem._id, { title });
            }
        } else {
            // Adiciona um novo item
            if (currentScenario === 'destinations') {
                if (!title.trim() || !selectedGroup) {
                    alert('Please enter a title and select a group.');
                    return;
                }
                await addDestination({ title, type: selectedGroup });
            } else {
                if (!title.trim()) {
                    alert('Please enter a title.');
                    return;
                }
                await addDestinationGroup({ title, options: ['destinations'] });
            }
        }

        const updatedData = currentScenario === 'destinations'
            ? await getDestinations()
            : await getDestinationGroups();

        setData(updatedData);
        setShowModal(false);

        // Limpa os campos
        setEditingItem(null);
        setTitle('');
        setSelectedGroup('');
    } catch (error) {
        console.error('Error saving item:', error.message);
        window.location.reload();
    }
};

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add {currentScenario === 'destinations' ? 'Destination' : 'Group'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentScenario('destinations')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'destinations' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
            Manage Destinations
          </button>
          <button
            onClick={() => setCurrentScenario('groups')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'groups' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
           Manage Groups
          </button>
        </div>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={editingItem ? `Edit ${currentScenario === 'destinations' ? 'Destination' : 'Group'}` : `Add ${currentScenario === 'destinations' ? 'Destination' : 'Group'}`}
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
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder={`Enter ${currentScenario === 'destinations' ? 'Destination' : 'Group'} Title`}
            />
          </div>

          {currentScenario === 'destinations' && (
            <div className="mb-4 w-full">
              <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Group
              </label>
              <select
                id="group"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
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

          <div className="flex justify-end space-x-2 w-full">
            <button
              onClick={() => setShowModal(false)}
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

      {/* Tabela para exibir destinations ou groups */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table
          columns={currentScenario === 'destinations' ? [{ key: 'title', title: 'Title' }, { key: 'type', title: 'Group' }] : [{ key: 'title', title: 'Title' }]}
          data={data}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
      {console.log(data)}
    </div>
  );
}
