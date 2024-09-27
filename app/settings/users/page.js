"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
//import ActionButton from "../../components/ActionButton";
import Modal from "../../components/Modal";
import DragImages from "../../components/DragImages";
import { InformationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getUsers, addUser, getUserById, deleteUser, updateUser, getRoles, addRole, getRoleById, updateRole, deleteRole } from '../../services/api';
import axios from 'axios';

export default function UsersAndRoles() {
  
  const [privilegesOriginal, setPrivilegesOriginal] = useState([
    { name: 'Products', actions: { view: false, create: false, edit: false, delete: false } },
    { name: 'Settings', actions: { view: false, create: false, edit: false, delete: false } },
    { name: 'Trips', actions: { view: false, create: false, edit: false, delete: false, clone: false, export: false } },
    { name: 'Exclusions', actions: { view: false, create: false, edit: false, delete: false } },
    { name: 'Home', actions: { view: false, create: false, edit: false, delete: false } },
    // Adicione outras seções conforme necessário
  ]);
  
  function convertPrivileges(data) {
    const converted = data.privileges.map(privilege => ({
      name: privilege.name,
      actions: privilege.actions[0] 
        ? {
            view: privilege.actions[0].view || false,
            create: privilege.actions[0].create || false,
            edit: privilege.actions[0].edit || false,
            delete: privilege.actions[0].delete || false
          }
        : { view: false, create: false, edit: false, delete: false } // Valores padrão caso actions esteja vazio
    }));
    
    // Atualiza o estado de privileges com o novo array convertido
    console.log("p",converted);
    //setPrivilegesOriginal(converted);
  }
  
  

  const handleActionChange = (sectionName, actionName) => {
    setPrivilegesOriginal(prevPrivileges =>
      prevPrivileges.map(section =>
        section.name === sectionName
          ? {
              ...section,
              actions: {
                ...section.actions,
                [actionName]: !section.actions[actionName], // Inverte o valor do checkbox
              },
            }
          : section
      )
    );
  };
  

  const handleDescriptionChange = (section, description) => {
    setPrivileges(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        description,
      },
    }));
  };

  const handleSectionChange = (sectionName) => {
    const section = privilegesOriginal.find(sec => sec.name === sectionName);
    setCurrentSection(sectionName);
    setName(section.name);
    setDescription(section.description || ''); // Atualiza a descrição, se aplicável
  };

  // Função para converter o estado de privilégios em array e passar para o manipulador de salvamento eliminate
  const handleSaveClick = () => {


    const privilegesArray = Object.keys(privileges).map(key => ({
      name: key,
      description: privileges[key].description,
      actions: privileges[key].actions,
    }));

    handleSave(privilegesArray); // Chama a função de salvamento com o array de privilégios
  };

const ActionButton = ({ label, isChecked, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-1 px-2 py-1 rounded ${
      isChecked ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white'
    } hover:${isChecked ? 'bg-green-600' : 'bg-gray-300 dark:hover:bg-gray-500'}`}
  >
    {isChecked && <CheckIcon className="h-4 w-4" />} {/* Exibe o ícone de check se o botão estiver marcado */}
    <span>{label}</span>
  </button>
);

  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [data, setData] = useState([]);
  const [currentScenario, setCurrentScenario] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const handleImagesChange = (newImages) => {setImages(newImages);};

  function removeIds(role) {
    const { _id, __v, privileges, ...rest } = role; // Remove _id e __v
  
    return {
      ...rest,
      privileges: privileges.map(({ _id, actions, ...priv }) => ({
        ...priv,
        actions: actions.map(({ _id, ...act }) => act), // Remove o _id de actions também
      })),
    };
  }
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = currentScenario === 'users' ? await getUsers() : await getRoles();
        setData(data);

        if (currentScenario === 'users') {
          const rolesData = await getRoles();
          setRoles(rolesData);
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
    const targetLangs = ['pt-pt', 'fr', 'es', 'de'];

    let translations = [];
    try {
      for (let targetLang of targetLangs) {
        const requestBody = { text: targetText, targetLang: targetLang };
        const response = await axios.post('https://bukingmaster.com/api_/translate', requestBody);
        const translatedText = response.data.translatedText;
        const code = targetLang === 'pt-pt' ? 'pt' : targetLang;
        translations.push({ code: code, text: translatedText });
      }
      const newSelectedLanguages = [...selectedLanguages, ...translations];
      setSelectedLanguages(newSelectedLanguages);
    } catch (error) {
      console.error('Erro ao traduzir o texto:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      if (currentScenario === 'users') {
        await deleteUser(itemId);
      } else {
        await deleteRole(itemId);
      }
      const updatedData = currentScenario === 'users'
        ? await getUsers()
        : await getRoles();
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item. Please try again.');
    }
  };

  const transformActionsToArray = (privileges) => {
    return privileges.map(section => {
      const actionObject = section.actions; // Acessa o objeto atual de actions
  
      return {
        ...section, // Mantém o restante da seção inalterado
        actions: [actionObject] // Envolve o objeto de ações em um array
      };
    });
  };
  

  const transformActionsToObject = (privileges) => {
    return privileges.map(section => {
      const actionArray = section.actions[0]; // Acessa o array dentro de 'actions'
  
      // Preserva o estado atual dos actions
      const actionObject = {
        view: actionArray.view || false,   // Verifica o valor atual, se não existir, define como false
        create: actionArray.create || false,
        edit: actionArray.edit || false,
        delete: actionArray.delete || false,
        clone: actionArray.clone || false,
        export: actionArray.export || false,
        
      };
  
      return {
        ...section, // Mantém o restante da seção inalterado
        actions: actionObject // Substitui o array por um objeto de ações
      };
    });
  };

  

  const handleEditItem = async (itemId) => {
    try {
      const item = currentScenario === 'users'
        ? await getUserById(itemId)
        
        : await getRoleById(itemId);

        setEditingItem(item);
        


      if (currentScenario === 'roles'){
        setName(item.name || '');
        setDescription(item.description || '');
        const transformedPrivileges = transformActionsToObject(item.privileges);
        setPrivilegesOriginal(transformedPrivileges);  
      }  

      setName(item.name || '');
      setEmail(item.email || '');
      setImages(item.images || []);
      
      //setSelectedRole(item.group._id || '');
      //console.log(">>>",item.group._id);


      setShowModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (editingItem) {
        if (currentScenario === 'users') {

          
          const role = await getRoleById(selectedRole);
          //const cleanedRole = removeIds(role);


          console.log("Edit User", name, images, email, password,role );
          await updateUser(editingItem._id, { name, images, email, group: role });
        } else {
          await updateRole(editingItem._id, { name, description, privileges: privilegesOriginal});
        }
      } else {
        if (currentScenario === 'users') {

//console.log(selectedRole);

          const role = await getRoleById(selectedRole);
         

          if (!name.trim() || !email.trim() || !selectedRole) {
            //alert('Please enter a name, email, and select a role.');
            //return;
          }
          
          console.log("Add User", name, images, email, password, role );
          await addUser({ name, images, email, password, group: role });
        } else {
          if (!name.trim()) {
            alert('Please enter a name.');
            return;
          }
          await addRole({ name, description, privileges: privilegesOriginal});
          //console.log("?",name,description,privileges);
        }
      }
      const updatedData = currentScenario === 'users'
        ? await getUsers()
        : await getRoles();
      setData(updatedData);
      setShowModal(false);
      setEditingItem(null);
      setName('');
      setEmail('');
      setSelectedRole('');
    } catch (error) {
      console.error('Error saving item:', error.message);
      //window.location.reload();
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
          Add {currentScenario === 'users' ? 'User' : 'Role'}
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentScenario('users')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
            Manage Users
          </button>
          <button
            onClick={() => setCurrentScenario('roles')}
            className={`px-4 py-2 text-white rounded-md ${currentScenario === 'roles' ? 'bg-blue-500 text-white' : 'bg-gray-500 text-gray-600'}`}
          >
           Manage Roles
          </button>
        </div>
      </div>

      <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={editingItem ? `Edit ${currentScenario === 'users' ? 'User' : 'Group'}` : `Add ${currentScenario === 'users' ? 'User' : 'Group'}`}
    >
      <div className="flex flex-col space-y-4 items-center relative">
        

        {currentScenario === 'roles' && (
          <>
           <div className="absolute top-0 right-0 mt-2 mr-2">
          <InformationCircleIcon
            id="info-icon"
            className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer"
            data-tooltip-content="Translation automatic to: Portuguese; Spanish; German; French"
          />
        </div>
        <Tooltip anchorSelect="#info-icon" />

        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Enter Name"
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Enter Description"
            rows="4"
          />
        </div>
      
       {privilegesOriginal.map(section => (
        <div key={section.name} className="mb-4 w-full">
          <div className="flex items-center justify-between w-full p-4 bg-white dark:bg-gray-700 shadow-md rounded">
            {/* Título da Seção */}
            <h3
              className={`text-md font-semibold text-gray-700 dark:text-gray-200 cursor-pointer ${currentSection === section.name ? 'text-blue-500' : ''}`}
              onClick={() => handleSectionChange(section.name)}
            >
              {section.name}
            </h3>
            {/* Botões de ação */}
            <div className="flex space-x-4">
            {Object.keys(section.actions).map(action => (
              <ActionButton
                 key={action}
                 label={action.charAt(0).toUpperCase() + action.slice(1)} // Exibe "View", "Create", etc.
                 isChecked={section.actions[action]} // Estado atual do botão
                 onClick={() => handleActionChange(section.name, action)} // Alterna o estado da ação
               />
            ))}
          </div>
          </div>
        </div>
      ))}


          </>
        )}

        {currentScenario === 'users' && (
          <>
            <div className="mb-4 w-full">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Image
              </label>
              <DragImages images={images} onImagesChange={handleImagesChange} />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter Name"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter User Email"
              />
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                placeholder="Enter User Password"
              />
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Role
              </label>
              <select
                id="role"
                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
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
      <Table
        data={data}
        columns={currentScenario === 'users' ? [{ key: 'name', title: 'Name' }, { key: 'email', title: 'Email' }] : [{ key: 'name', title: 'Role' }]}
        onDelete={handleDeleteItem}
        onEdit={handleEditItem}
      />
    </div>
  );
}
