// service/api.js
import axios from 'axios';

// Configuração básica do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || ' https://bukingmaster.com/api_',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Interceptador para incluir o token de autenticação em cada requisição (opcional) getAcc
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // ou use cookies/estado global para gerenciar o token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador para lidar com respostas de erro
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch User with Email ${email}`);
  }
};

// GET: Fetch all AgeRangeGroups getAge
export const getAgeRangeGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.ageRanges é igual a "ageRanges"
    const ageRangeGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'ages'
    );

    return ageRangeGroups;
  } catch (error) {
    throw new Error('Failed to fetch age range groups');
  }
};

// POST: Add a new AgeRangeGroup
export const addAgeRangeGroup = async (groupData) => {
  try {
    const response = await api.post('/classes', groupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add age range group');
  }
};

// GET /ID: Get a specific AgeRangeGroup by ID
export const getAgeRangeGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch age range group with ID ${id}`);
  }
};

// PUT: Update an existing AgeRangeGroup by ID
export const updateAgeRangeGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/age-ranges/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update age range group with ID ${id}`);
  }
};

// DELETE: Remove an AgeRangeGroup by ID
export const deleteAgeRangeGroup = async (id) => {
  try {
    await api.delete(`/classes/age-ranges/${id}`);
    return { message: `Age range group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete age range group with ID ${id}`);
  }
};

// GET: Fetch all DestinationGroups
export const getDestinationGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.destinations é igual a "destinations"
    const destinationGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'destinations'
    );

    return destinationGroups;
  } catch (error) {
    throw new Error('Failed to fetch destination groups');
  }
};

// POST: Add a new DestinationGroup
export const addDestinationGroup = async (groupData) => {
  try {
    const response = await api.post('/classes', groupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add destination group');
  }
};

// GET /ID: Get a specific DestinationGroup by ID
export const getDestinationGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch destination group with ID ${id}`);
  }
};

// PUT: Update an existing DestinationGroup by ID
export const updateDestinationGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/destinations/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update destination group with ID ${id}`);
  }
};

// DELETE: Remove a DestinationGroup by ID
export const deleteDestinationGroup = async (id) => {
  try {
    await api.delete(`/classes/destinations/${id}`);
    return { message: `Destination group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete destination group with ID ${id}`);
  }
};




// Busca todas as localizações
export const addLocation = async (locationGroupData) => {
  try {
    const response = await api.post('/locations', locationGroupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add location group');
  }
};
// GET: Obter todas as localizações updateGroup
export const getLocations = async () => {
  try {
    const response = await api.get('/locations');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch locations');
  }
};

// GET: Obter uma localização pelo ID
export const getLocationById = async (id) => {
  try {
    const response = await api.get(`/locations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch location with ID ${id}`);
  }
};

// EDIT: Atualizar uma localização pelo ID
export const updateLocation = async (id, data) => {
  try {
    const response = await api.put(`/locations/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update location with ID ${id}`);
  }
};

// REMOVE: Remover uma localização pelo ID
export const deleteLocation = async (id) => {
  try {
    await api.delete(`/locations/${id}`);
    return { message: `Location with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete location with ID ${id}`);
  }
};

// POST: Adicionar um novo grupo de Destinos addEx
export const addDestination = async (destinationGroupData) => {
  try {
    const response = await api.post('/destinations', destinationGroupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add destination group');
  }
};

// GET: Obter todos os grupos de Destinos
export const getDestinations = async () => {
  try {
    const response = await api.get('/destinations');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch destinations');
  }
};

// GET: Obter um grupo de Destino pelo ID
export const getDestinationById = async (id) => {
  try {
    const response = await api.get(`/destinations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch destination with ID ${id}`);
  }
};

// PUT: Atualizar um grupo de Destino pelo ID
export const updateDestination = async (id, data) => {
  try {
    const response = await api.put(`/destinations/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update destination with ID ${id}`);
  }
};

// DELETE: Remover um grupo de Destino pelo ID
export const deleteDestination = async (id) => {
  try {
    await api.delete(`/destinations/${id}`);
    return { message: `Destination with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete destination with ID ${id}`);
  }
};


// GET: Obter todos os LocationGroups
export const getLocationGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.inclusions é igual a "inclusions"
    const locationGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'locations'
    );

    return locationGroups;
  } catch (error) {
    throw new Error('Failed to fetch Location groups');
  }
};
// ADD: Adicionar um novo LocationGroup
export const addLocationGroup = async (locationGroupData) => {
  try {
    const response = await api.post('/classes', locationGroupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add location group');
  }
};

// GET /ID: Obter um LocationGroup específico pelo ID
export const getLocationGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch location group with ID ${id}`);
  }
};

// EDIT: Atualizar um LocationGroup pelo ID getAcc
export const updateLocationGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/locations/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update location group with ID ${id}`);
  }
};

// REMOVE: Remover um LocationGroup pelo ID
export const deleteLocationGroup = async (id) => {
  try {
    await api.delete(`/classes/locations/${id}`);
    return { message: `Location group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete location group with ID ${id}`);
  }
};

// GET: Obter todos os itens de "What to Bring"
export const getWhatToBringItems = async () => {
  try {
    const response = await api.get('/what-to-bring');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch what to bring items');
  }
};

// GET: Obter um item de "What to Bring" pelo ID
export const getWhatToBringItemById = async (id) => {
  try {
    const response = await api.get(`/what-to-bring/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch what to bring item with ID ${id}`);
  }
};

// POST: Adicionar um novo item de "What to Bring"
export const addWhatToBringItem = async (data) => {
  try {
    const response = await api.post('/what-to-bring', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add what to bring item');
  }
};

// PUT: Atualizar um item de "What to Bring" pelo ID
export const updateWhatToBringItem = async (id, data) => {
  try {
    const response = await api.put(`/what-to-bring/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update what to bring item with ID ${id}`);
  }
};

// DELETE: Remover um item de "What to Bring" pelo ID
export const deleteWhatToBringItem = async (id) => {
  try {
    await api.delete(`/what-to-bring/${id}`);
    return { message: `What to bring item with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete what to bring item with ID ${id}`);
  }
};


export const getWhatToBringGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.ageRanges é igual a "ageRanges"
    const whatToBringGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'whattobring'
    );

    return whatToBringGroups;
  } catch (error) {
    throw new Error('Failed to fetch age range groups');
  }
};


// GET: Obter um grupo de "What to Bring" pelo ID
export const getWhatToBringGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch what to bring group with ID ${id}`);
  }
};

// POST: Adicionar um novo grupo de "What to Bring"
export const addWhatToBringGroup = async (data) => {
  try {
    const response = await api.post('/classes', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add what to bring group');
  }
};

// PUT: Atualizar um grupo de "What to Bring" pelo ID
export const updateWhatToBringGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/what-to-bring/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update what to bring group with ID ${id}`);
  }
};

// DELETE: Remover um grupo de "What to Bring" pelo ID
export const deleteWhatToBringGroup = async (id) => {
  try {
    await api.delete(`/classes/what-to-bring/${id}`);
    return { message: `What to bring group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete what to bring group with ID ${id}`);
  }
};

// GET: Obter todas as exclusões
export const getExclusions = async () => {
  try {
    const response = await api.get('/exclusions');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch exclusions');
  }
};


export const addExclusion = async (exclusionData) => {
  try {
    const response = await api.post('/exclusions', exclusionData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add exclusion');
  }
};

// GET: Obter uma exclusão pelo ID
export const getExclusionById = async (id) => {
  try {
    const response = await api.get(`/exclusions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch exclusion with ID ${id}`);
  }
};

// EDIT: Atualizar uma exclusão pelo ID
export const updateExclusion = async (id, data) => {
  try {
    const response = await api.put(`/exclusions/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update exclusion with ID ${id}`);
  }
};

// REMOVE: Remover uma exclusão pelo ID
export const deleteExclusion = async (id) => {
  try {
    await api.delete(`/exclusions/${id}`);
    return { message: `Exclusion with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete exclusion with ID ${id}`);
  }
};

// GET: Obter todas as acomodações
export const getAccommodations = async () => {
  try {
    const response = await api.get('/accommodations');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch accommodations');
  }
};

// GET: Obter uma acomodação pelo ID
export const getAccommodationById = async (id) => {
  try {
    const response = await api.get(`/accommodations/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch accommodation with ID ${id}`);
  }
};

// POST: Criar uma nova acomodação
export const addAccommodation = async (data) => {
  try {
    const response = await api.post('/accommodations', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create accommodation');
  }
};

// EDIT: Atualizar uma acomodação pelo ID
export const updateAccommodation = async (id, data) => {
  try {
    const response = await api.put(`/accommodations/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update accommodation with ID ${id}`);
  }
};

// REMOVE: Remover uma acomodação pelo ID
export const deleteAccommodation = async (id) => {
  try {
    await api.delete(`/accommodations/${id}`);
    return { message: `Accommodation with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete accommodation with ID ${id}`);
  }
};


// GET: Obter todas as viagens
export const getTrips = async () => {
  try {
    const response = await api.get('/trips');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trips');
  }
};

// GET: Obter uma viagem pelo ID
export const getTripById = async (id) => {
  try {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch trip with ID ${id}`);
  }
};

// POST: Criar uma nova viagem
export const addTrip = async (data) => {
  try {
    const response = await api.post('/trips', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create trip');
  }
};


// EDIT: Atualizar uma viagem pelo ID
export const updateTrip = async (id, data) => {
  try {
    const response = await api.put(`/trips/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update trip with ID ${id}`);
  }
};

// REMOVE: Remover uma viagem pelo ID
export const deleteTrip = async (id) => {
  try {
    await api.delete(`/trips/${id}`);
    return { message: `Trip with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete trip with ID ${id}`);
  }
};


export const getThemeGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.inclusions é igual a "inclusions"
    const themeGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'Themes'
    );

    return themeGroups;
  } catch (error) {
    throw new Error('Failed to fetch Theme groups');
  }
};

export const addThemeGroup = async (groupData) => {
  try {
    const response = await api.post('/classes', groupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add theme group');
  }
};

export const getThemeGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch theme group with ID ${id}`);
  }
};

export const updateThemeGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update theme group with ID ${id}`);
  }
};

export const deleteThemeGroup = async (id) => {
  try {
    await api.delete(`/classes/${id}`);
    return { message: `Theme group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete theme group with ID ${id}`);
  }
};


export const getCategoryGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.inclusions é igual a "categories"
    const categoryGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'Categories'
    );

    return categoryGroups;
  } catch (error) {
    throw new Error('Failed to fetch Category groups');
  }
};

export const addCategoryGroup = async (groupData) => {
  try {
    const response = await api.post('/classes', groupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add category group');
  }
};

export const getCategoryGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch category group with ID ${id}`);
  }
};

export const updateCategoryGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update category group with ID ${id}`);
  }
};

export const deleteCategoryGroup = async (id) => {
  try {
    await api.delete(`/classes/${id}`);
    return { message: `Category group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete category group with ID ${id}`);
  }
};


export const getExclusionGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.inclusions é igual a "exclusions"
    const exclusionGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'exclusions'
    );

    return exclusionGroups;
  } catch (error) {
    throw new Error('Failed to fetch Exclusion groups');
  }
};

export const addExclusionGroup = async (groupData) => {
  try {
    const response = await api.post('/classes', groupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add exclusion group');
  }
};

export const getExclusionGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch exclusion group with ID ${id}`);
  }
};

export const updateExclusionGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/exclusions/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update exclusion group with ID ${id}`);
  }
};

export const deleteExclusionGroup = async (id) => {
  try {
    await api.delete(`/classes/${id}`);
    return { message: `Exclusion group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete exclusion group with ID ${id}`);
  }
};





// GET: Obter todos os temas
export const getThemes = async () => {
  try {
    const response = await api.get('/themes');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch themes');
  }
};

export const addTheme = async (themeData) => {
  try {
    const response = await api.post('/themes', themeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add Theme');
  }
};

// GET: Obter um tema pelo ID
export const getThemeById = async (id) => {
  try {
    const response = await api.get(`/themes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch theme with ID ${id}`);
  }
};

// EDIT: Atualizar um tema pelo ID
export const updateTheme = async (id, data) => {
  try {
    const response = await api.put(`/themes/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update theme with ID ${id}`);
  }
};

// REMOVE: Remover um tema pelo ID
export const deleteTheme = async (id) => {
  try {
    await api.delete(`/themes/${id}`);
    return { message: `Theme with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete theme with ID ${id}`);
  }
};

export const addCategory = async (categoryData) => {
  try {
    const response = await api.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add category');
  }
};


// GET: Obter todas as categorias
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

// GET: Obter uma categoria pelo ID
export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch category with ID ${id}`);
  }
};

// EDIT: Atualizar uma categoria pelo ID
export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update category with ID ${id}`);
  }
};

// REMOVE: Remover uma categoria pelo ID
export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);
    return { message: `Category with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete category with ID ${id}`);
  }
};



export const getInclusions = async () => {
  try {
    const response = await api.get('/inclusions');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch inclusions');
  }
};

export const addInclusion = async (inclusionData) => {
  try {
    const response = await api.post('/inclusions', inclusionData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add inclusion');
  }
};


export const getInclusionById = async (id) => {
  try {
    const response = await api.get(`/inclusions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
};

// EDIT: Atualizar um usuário pelo ID addAcc
export const updateInclusion = async (id, data) => {
  try {
    const response = await api.put(`/inclusions/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update user with ID ${id}`);
  }
};

// REMOVE: Remover um usuário pelo ID
export const deleteInclusion = async (id) => {
  try {
    await api.delete(`/inclusions/${id}`);
    return { message: `User with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
};


// GET: Obter todas as atividades de Day Tour
export const getDayTourActivities = async () => {
  try {
    const response = await api.get('/tours');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch day tour activities');
  }
};

export const createDayTourActivity = async (tourData) => {
  try {
    const response = await api.post('/tours', tourData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create day tour activity');
  }
};


// GET: Obter uma atividade de Day Tour pelo ID
export const getDayTourActivityById = async (id) => {
  try {
    const response = await api.get(`/tours/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch day tour activity with ID ${id}`);
  }
};

// EDIT: Atualizar uma atividade de Day Tour pelo ID
export const updateDayTourActivity = async (id, data) => {
  try {
    const response = await api.put(`/tours/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update day tour activity with ID ${id}`);
  }
};

// REMOVE: Remover uma atividade de Day Tour pelo ID
export const deleteDayTourActivity = async (id) => {
  try {
    await api.delete(`/tours/${id}`);
    return { message: `Day tour activity with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete day tour activity with ID ${id}`);
  }
};


export const getAgeRanges = async () => {
  try {
    const response = await api.get('/age-ranges');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch age ranges');
  }
};

export const addAgeRange = async (ageRangeData) => {
  try {
    const response = await api.post('/age-ranges', ageRangeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add Age Range');
  }
};

export const getAgeRangeById = async (id) => {
  try {
    const response = await api.get(`/age-ranges/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch age range with ID ${id}`);
  }
};

// EDIT: Atualizar uma faixa etária pelo ID
export const updateAgeRange = async (id, data) => {
  try {
    const response = await api.put(`/age-ranges/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update age range with ID ${id}`);
  }
};

// REMOVE: Remover uma faixa etária pelo ID
export const deleteAgeRange = async (id) => {
  try {
    await api.delete(`/age-ranges/${id}`);
    return { message: `Age range with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete age range with ID ${id}`);
  }
};


export const getCancellationPolicies = async () => {
  try {
    const response = await api.get('/cancellation-policy');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cancellation policies');
  }
};

export const getCancellationPolicyById = async (id) => {
  try {
    const response = await api.get(`/cancellation-policy/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch cancellation policy with ID ${id}`);
  }
};

export const addCancellationPolicy = async (cancellPolicyData) => {
  try {
    const response = await api.post('/cancellation-policy', cancellPolicyData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add cancellation-policy');
  }
};

// EDIT: Atualizar uma política de cancelamento pelo ID
export const updateCancellationPolicy = async (id, data) => {
  try {
    const response = await api.put(`/cancellation-policy/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update cancellation policy with ID ${id}`);
  }
};

// REMOVE: Remover uma política de cancelamento pelo ID
export const deleteCancellationPolicy = async (id) => {
  try {
    await api.delete(`/cancellation-policy/${id}`);
    return { message: `Cancellation policy with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete cancellation policy with ID ${id}`);
  }
};

// GET: Obter todos os InclusionGroups
export const getInclusionGroups = async () => {
  try {
    const response = await api.get('/classes');
    
    // Filtra apenas os registros onde options.inclusions é igual a "inclusions"
    const inclusionGroups = response.data.filter(
      classe => classe.options && classe.options[0] === 'inclusions'
    );

    return inclusionGroups;
  } catch (error) {
    throw new Error('Failed to fetch inclusion groups');
  }
};


export const addInclusionGroup = async (groupData) => {
  try {
    const response = await api.post('/classes', groupData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add inclusion group');
  }
};


// GET /ID: Obter um InclusionGroup específico pelo ID
export const getInclusionGroupById = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch inclusion group with ID ${id}`);
  }
};

// EDIT: Atualizar um InclusionGroup pelo ID
export const updateInclusionGroup = async (id, data) => {
  try {
    const response = await api.put(`/classes/inclusions/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update inclusion group with ID ${id}`);
  }
};

// REMOVE: Remover um InclusionGroup pelo ID
export const deleteInclusionGroup = async (id) => {
  try {
    await api.delete(`/classes/inclusions/${id}`);
    return { message: `Inclusion group with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete inclusion group with ID ${id}`);
  }
};

// GET: Obter todos os roles
export const getRoles = async () => {
  try {
    const response = await api.get('/roles');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch roles');
  }
};

// POST: Adicionar um novo role
export const addRole = async (roleData) => {
  try {
    const response = await api.post('/roles', roleData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add role');
  }
};

// GET: Obter um role pelo ID
export const getRoleById = async (id) => {
  try {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch role with ID ${id}`);
  }
};

// PUT: Atualizar um role pelo ID
export const updateRole = async (id, roleData) => {
  try {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update role with ID ${id}`);
  }
};

// DELETE: Remover um role pelo ID
export const deleteRole = async (id) => {
  try {
    await api.delete(`/roles/${id}`);
    return { message: `Role with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete role with ID ${id}`);
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add user');
  }
};

// ::: START USERS :::
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

// GET /ID: Obter um usuário específico pelo ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users_/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with ID ${id}`);
  }
};

// EDIT: Atualizar um usuário pelo ID
export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update user with ID ${id}`);
  }
};

// REMOVE: Remover um usuário pelo ID
export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return { message: `User with ID ${id} deleted successfully` };
  } catch (error) {
    throw new Error(`Failed to delete user with ID ${id}`);
  }
};
// ::: END USERS :::

// Exporte o objeto api e outras funções conforme necessário
export default api;
