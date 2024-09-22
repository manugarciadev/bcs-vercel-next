"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getInclusions, addInclusion, getInclusionById, deleteInclusion, updateInclusion, getInclusionGroups, addInclusionGroup, getInclusionGroupById, updateInclusionGroup, deleteInclusionGroup } from '../../services/api';
import axios from 'axios';

export default function InclusionsAndGroups() {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [groups, setGroups] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [data, setData] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('inclusions'); // 'inclusions' or 'groups'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = currentScenario === 'inclusions' ? await getInclusions() : await getInclusionGroups();
        setData(data);

        if (currentScenario === 'inclusions') {
          const groupsData = await getInclusionGroups();
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

  const handleTranslate = async (targetText) => {
    // Defina os idiomas para tradução
    const targetLangs = ['pt-pt', 'fr', 'es', 'de'];  // pt-pt (Português), en (Inglês), fr (Francês), es (Espanhol), de (Alemão)
  
    // Crie uma array para armazenar as traduções
    let translations = [];
  
    try {
      // Loop através de cada idioma e traduza
      for (let targetLang of targetLangs) {
        const requestBody = {
          text: targetText,
          targetLang: targetLang
        };
        console.log(requestBody);
  
        const response = await axios.post('https://bukingmaster.com/api_/translate', requestBody);
        const translatedText = response.data.translatedText;
  
        // Se o código da linguagem for "pt-pt", altere para "pt"
        const code = targetLang === 'pt-pt' ? 'pt' : targetLang;
  
        // Adicione a tradução ao array de traduções
        translations.push({ code: code, text: translatedText });
      }
  

      // Atualize o estado com as traduções
      const newSelectedLanguages = [...selectedLanguages, ...translations];
      setSelectedLanguages(newSelectedLanguages);
  
      console.log(">>> Translated languages:", translations);
    } catch (error) {
      console.error('Erro ao traduzir o texto:', error);
    }
  };
  

  const handleDeleteItem = async (itemId) => {
  
    try {
      if (currentScenario === 'inclusions') {
        await deleteInclusion(itemId);
      } else {
        await deleteInclusionGroup(itemId);
      }
  
      const updatedData = currentScenario === 'inclusions'
        ? await getInclusions()
        : await getInclusionGroups();
  
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item. Please try again.');
    }
  };
  

  const handleEditItem = async (itemId) => {
    try {
      const item = currentScenario === 'inclusions'
        ? await getInclusionById(itemId)
        : await getInclusionGroupById(itemId);
  
      setEditingItem(item);
      setTitle(item.title);
      setSelectedGroup(item.type);
      
  
      if (currentScenario === 'inclusions') {
        //setSelectedGroup(item.groupId || '');
      }
  
      setShowModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSave = async () => {
    try {

      handleTranslate(title);
      
      
        if (editingItem) {
            // Atualiza um item existente
            if (currentScenario === 'inclusions') {
                await updateInclusion(editingItem._id, { title, type: selectedGroup });
            } else {
                await updateInclusionGroup(editingItem._id, { title });
            }
        } else {
            // Adiciona um novo item
            if (currentScenario === 'inclusions') {
                if (!title.trim() || !selectedGroup) {
                    alert('Please enter a title and select a group.');
                    return;
                }
                await addInclusion({ title, type: selectedGroup });
            } else {
                if (!title.trim()) {
                    alert('Please enter a title.');
                    return;
                }
                await addInclusionGroup({ title, options: ['inclusions'] }); // Adiciona um novo grupo sem 'options'
            }
        }

        // Atualiza a lista de inclusions ou groups após adição/edição
        const updatedData = currentScenario === 'inclusions'
            ? await getInclusions()
            : await getInclusionGroups();

        setData(updatedData);
        setShowModal(false);

        // Limpa os campos
        setEditingItem(null);
        setTitle('');
        setSelectedGroup('');
    } catch (error) {
        console.error('Error saving item:', error.message);
        //alert('Failed to save item. Please try again.');
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
          Add {currentScenario === 'inclusions' ? 'Inclusion' : 'Group'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentScenario('inclusions')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'inclusions' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
            Manage Inclusions
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
        title={editingItem ? `Edit ${currentScenario === 'inclusions' ? 'Inclusion' : 'Group'}` : `Add ${currentScenario === 'inclusions' ? 'Inclusion' : 'Group'}`}
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
              placeholder={`Enter ${currentScenario === 'inclusions' ? 'Inclusion' : 'Group'} Title`}
            />
          </div>

          {currentScenario === 'inclusions' && (
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

      {/* Tabela para exibir inclusions ou groups */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table
          columns={currentScenario === 'inclusions' ? [{ key: 'title', title: 'Title' }, { key: 'type', title: 'Group' }] : [{ key: 'title', title: 'Title' }]}
          data={data}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
      )}
    </div>
  );
}

