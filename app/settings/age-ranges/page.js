"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getAgeRanges, addAgeRange, getAgeRangeById, deleteAgeRange, updateAgeRange, getAgeRangeGroups, addAgeRangeGroup, getAgeRangeGroupById, updateAgeRangeGroup, deleteAgeRangeGroup } from '../../services/api';

export default function AgeRangesAndGroups() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [startAge, setStartAge] = useState('');
  const [endAge, setEndAge] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [data, setData] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('ageRanges'); // 'ageRanges' or 'groups'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = currentScenario === 'ageRanges' ? await getAgeRanges() : await getAgeRangeGroups();
        setData(data);

        if (currentScenario === 'ageRanges') {
          const groupsData = await getAgeRangeGroups();
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
      if (currentScenario === 'ageRanges') {
        await deleteAgeRange(itemId);
      } else {
        await deleteAgeRangeGroup(itemId);
      }
  
      const updatedData = currentScenario === 'ageRanges'
        ? await getAgeRanges()
        : await getAgeRangeGroups();
  
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item. Please try again.');
    }
  };
  

  const handleEditItem = async (itemId) => {
    try {
      const item = currentScenario === 'ageRanges'
        ? await getAgeRangeById(itemId)
        : await getAgeRangeGroupById(itemId);
  
      setEditingItem(item);
      setTitle(item.title);
      setStartAge(item.startAge);
      setEndAge(item.endAge);
  
      if (currentScenario === 'ageRanges') {
        setSelectedGroup(item.type || '');
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
            if (currentScenario === 'ageRanges') {
                await updateAgeRange(editingItem._id, { title, startAge, endAge, type: selectedGroup });
            } else {
                await updateAgeRangeGroup(editingItem._id, { title });
            }
        } else {
            // Adiciona um novo item
            if (currentScenario === 'ageRanges') {
                if (!title.trim() || !selectedGroup || !startAge || !endAge) {
                    alert('Please enter a title, start age, end age, and select a group.');
                    return;
                }
                await addAgeRange({ title, startAge, endAge, type: selectedGroup });
            } else {
                if (!title.trim()) {
                    alert('Please enter a title.');
                    return;
                }
                await addAgeRangeGroup({ title, options: ['ages'] }); // Adiciona um novo grupo sem 'options'
            }
        }

        // Atualiza a lista de ageRanges ou groups após adição/edição
        const updatedData = currentScenario === 'ageRanges'
            ? await getAgeRanges()
            : await getAgeRangeGroups();

        setData(updatedData);
        setShowModal(false);

        // Limpa os campos
        setEditingItem(null);
        setTitle('');
        setStartAge('');
        setEndAge('');
        setSelectedGroup('');
    } catch (error) {
        console.error('Error saving item:', error.message);
        alert('Failed to save item. Please try again.');
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
          Add {currentScenario === 'ageRanges' ? 'Age Range' : 'Group'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentScenario('ageRanges')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'ageRanges' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
            Manage Age Ranges
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
        title={editingItem ? `Edit ${currentScenario === 'ageRanges' ? 'Age Range' : 'Group'}` : `Add ${currentScenario === 'ageRanges' ? 'Age Range' : 'Group'}`}
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
              placeholder={`Enter ${currentScenario === 'ageRanges' ? 'Age Range' : 'Group'} Title`}
            />
          </div>

          {currentScenario === 'ageRanges' && (
            <>
              <div className="mb-4 w-full">
                <label htmlFor="startAge" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Start Age
                </label>
                <input
                  id="startAge"
                  type="number"
                  value={startAge}
                  onChange={(e) => setStartAge(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter Start Age"
                />
              </div>

              <div className="mb-4 w-full">
                <label htmlFor="endAge" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  End Age
                </label>
                <input
                  id="endAge"
                  type="number"
                  value={endAge}
                  onChange={(e) => setEndAge(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter End Age"
                />
              </div>

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
            </>
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

      {/* Tabela para exibir ageRanges ou groups */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table
          columns={currentScenario === 'ageRanges' 
            ? [{ key: 'title', title: 'Title' }, { key: 'startAge', title: 'Start Age' }, { key: 'endAge', title: 'End Age' }, { key: 'type', title: 'Group' }] 
            : [{ key: 'title', title: 'Title' }]}
          data={data}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
}
