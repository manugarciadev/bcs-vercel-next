"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { 
  getThemes, addTheme, getThemeById, deleteTheme, updateTheme,
  getThemeGroups, addThemeGroup, getThemeGroupById, deleteThemeGroup, updateThemeGroup
} from '../../services/api';

export default function ThemesAndGroups() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [data, setData] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('themes'); // 'themes' or 'groups'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (currentScenario === 'themes') {
          const themesData = await getThemes();
          setData(themesData);
          const groupsData = await getThemeGroups(); // Fetch groups if managing themes
          setGroups(groupsData);
        } else {
          const themeGroupsData = await getThemeGroups(); // Fetch groups if managing groups
          setData(themeGroupsData);
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
      if (currentScenario === 'themes') {
        await deleteTheme(itemId);
      } else {
        await deleteThemeGroup(itemId);
      }

      const updatedData = currentScenario === 'themes'
        ? await getThemes()
        : await getThemeGroups();

      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleEditItem = async (itemId) => {
    try {
      const item = currentScenario === 'themes'
        ? await getThemeById(itemId)
        : await getThemeGroupById(itemId);

      setEditingItem(item);
      setTitle(item.title);
      setSelectedGroup(item.type);
      
      if (currentScenario === 'themes') {
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
        // Update an existing item
        if (currentScenario === 'themes') {
          await updateTheme(editingItem._id, { title, groupId: selectedGroup, type: selectedGroup });
        } else {
          await updateThemeGroup(editingItem._id, { title });
        }
      } else {
        // Add a new item
        if (currentScenario === 'themes') {
          if (!title.trim() || !selectedGroup) {
            //alert('Please enter a title and select a group.');
            return;
          }
          await addTheme({ title, groupId: selectedGroup, type: selectedGroup });
        } else {
          if (!title.trim()) {
            //alert('Please enter a title.');
            return;
          }
          await addThemeGroup({ title, options: ['Themes'] });
        }
      }

      // Update the list of items after add/edit
      const updatedData = currentScenario === 'themes'
        ? await getThemes()
        : await getThemeGroups();

      setData(updatedData);
      setShowModal(false);

      // Clear fields
      setEditingItem(null);
      setTitle('');
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
          Add {currentScenario === 'themes' ? 'Theme' : 'Group'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentScenario('themes')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'themes' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
            Manage Themes
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
        title={editingItem ? `Edit ${currentScenario === 'themes' ? 'Theme' : 'Group'}` : `Add ${currentScenario === 'themes' ? 'Theme' : 'Group'}`}
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
              placeholder={`Enter ${currentScenario === 'themes' ? 'Theme' : 'Group'} Title`}
            />
          </div>

          {currentScenario === 'themes' && (
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

      {/* Table to display themes or groups */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table
          columns={currentScenario === 'themes'
            ? [{ key: 'title', title: 'Title' }, { key: 'type', title: 'Group' }]
            : [{ key: 'title', title: 'Title' }]}
          data={data}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
}
