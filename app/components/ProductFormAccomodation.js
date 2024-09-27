"use client"
// Marcar o componente como cliente
import { useState, useEffect, useCallback } from "react";
import MultiSelect from "./MultiSelect";
import TierPricing from "./TierPricing";
import DragImages from "./DragImages";
import Modal from "./Modal";
import MultiSelectAdvanced from "./MultiSelectAdvanced";
import MultiSelectIndependent from "./MultiSelectIndependent";
import DateRangePicker from "./DateRangePicker";
import Table from "./Table";
import Task from "./Task";
import InteractiveMap from "./InteractiveMap";
import MultiSelectResource from "./MultiSelectResource";
import MultiSelectDraggable from "./MultiSelectDraggable";
import RoomPricing from "./RoomPricing";
import { useRouter } from 'next/navigation'; 
import{
  getInclusions, 
  getCancellationPolicies, 
  getExclusions, 
  getThemes, 
  getLocations, 
  getCategories,
  getAgeRanges,
  createDayTourActivity,
  deleteDayTourActivity,
  updateDayTourActivity,
  addAccommodation,
  deleteAccommodation,
  updateAccommodation,
  getAccommodationById,
  getLocationGroups,
  getWhatToBringItems,
  getDestinations
} from '../services/api';
import { v4 as uuidv4 } from "uuid";

export default function Home(isEditing, data) {

  const router = useRouter();
  const [pricing, setPricing] = useState([]);
  const [inclusionOptions, setInclusionOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [wtbOptions, setWtbOptions] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [locationGroupOptions, setLocationGroupOptions] = useState([]);
  const [exclusionOptions, setExclusionOptions] = useState([]);
  const [themeOptions, setThemeOptions] = useState([]);
  const [ageRanges, setAgeRanges] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [cancellPolicyOptions, setCancellPolicyOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState(0);
  const [capacity, setCapacity] = useState(0);


  useEffect(() => {
    const fetchInclusions = async () => {
      try {
        const data = await getInclusions();
        setInclusionOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinationOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchWhatToBring = async () => {
      try {
        const data = await getWhatToBringItems();
        setWtbOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchLocationGroups = async () => {
      try {
        const data = await getLocationGroups();
        setLocationGroupOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchAgeRanges = async () => {
      try {
        const data = await getAgeRanges();
        setAgeRanges(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchExclusions = async () => {
      try {
        const data = await getExclusions();
        setExclusionOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchThemes = async () => {
      try {
        const data = await getThemes();
        setThemeOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocationOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategoryOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchCancellationPolicies = async () => {
      try {
        const data = await getCancellationPolicies();
        setCancellPolicyOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };
  
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting any requests
      await Promise.all([
        fetchInclusions(),
        fetchWhatToBring(),
        fetchExclusions(),
        fetchThemes(),
        fetchLocations(),
        fetchLocationGroups(),
        fetchCategories(),
        fetchAgeRanges(),
        fetchDestinations(),
        fetchCancellationPolicies(),
      ]);
      setLoading(false); // Set loading to false after all requests complete- rooms
    };
  
    fetchData();
  }, []);
  
  

  useEffect(() => {
    if (isEditing.data) {
      // Modo de edição
      console.log(isEditing.data);
      setMainCode(isEditing.data.code || '');
      setStatus(isEditing.data.status || '');
      setVerificationCode(isEditing.data.verificationCode || 0);
      setSelectedDestinationOptions(isEditing.data.destinations || []);
      setSelectedTypeOptions(isEditing.data.types || []);
      setImages(isEditing.data.images || []);
      setSelectedThemes(isEditing.data.themes || []);
      setSelectedCategories(isEditing.data.categories || []);
      setSelectedLanguages(isEditing.data.languagesTour || []);
      setVideoLink(isEditing.data.videoLink || '');
      setTimes(isEditing.data.times || []);
      setSelectedPickupPlaces(isEditing.data.pickupPlaces || []);
      setSelectedDropoffPlaces(isEditing.data.dropoffPlaces || []);
      setSelectedLocations(isEditing.data.locations || []);
      setSelectedInclusions(isEditing.data.inclusions || []);
      setSelectedExclusions(isEditing.data.exclusions || []);
      setSelectedAvailableLanguages(isEditing.data.languages || []);
      setSelectedWhatToBring(isEditing.data.whatToBring || []);
      setSelectedAgeRanges(isEditing.data.ageRanges || []);
      setSelectedCancellationPolicys(isEditing.data.cancellationPolicies || []);
      setRates(isEditing.data.rates || []);
      setTasks(isEditing.data.tasks || []);
      setSelectedResources(isEditing.data.resources || []);
    } else {
      // Modo de criação
      if (typeof window !== "undefined") {
        // Client-side-only code
        const savedData = {
          mainCode: localStorage.getItem('mainCode') || '',
          destinations: JSON.parse(localStorage.getItem('selectedDestinationOptions')) || [],
          types: JSON.parse(localStorage.getItem('selectedTypeOptions')) || [],
          images: JSON.parse(localStorage.getItem('images')) || [],
          themes: JSON.parse(localStorage.getItem('selectedThemes')) || [],
          categories: JSON.parse(localStorage.getItem('selectedCategories')) || [],
          languagesTour: JSON.parse(localStorage.getItem('selectedLanguages')) || [],
          videoLink: localStorage.getItem('videoLink') || '',
          times: JSON.parse(localStorage.getItem('times')) || [],
          pickupPlaces: JSON.parse(localStorage.getItem('selectedPickupPlaces')) || [],
          dropoffPlaces: JSON.parse(localStorage.getItem('selectedDropoffPlaces')) || [],
          locations: JSON.parse(localStorage.getItem('selectedLocations')) || [],
          inclusions: JSON.parse(localStorage.getItem('selectedInclusions')) || [],
          exclusions: JSON.parse(localStorage.getItem('selectedExclusions')) || [],
          languages: JSON.parse(localStorage.getItem('selectedAvailableLanguages')) || [],
          whatToBring: JSON.parse(localStorage.getItem('selectedWhatToBring')) || [],
          ageRanges: JSON.parse(localStorage.getItem('selectedAgeRanges')) || [],
          cancellationPolicies: JSON.parse(localStorage.getItem('selectedCancellationPolicies')) || [],
          rates: JSON.parse(localStorage.getItem('rates')) || [],
          tasks: JSON.parse(localStorage.getItem('tasks')) || [],
          resources: JSON.parse(localStorage.getItem('selectedResources')) || []
        };
    
        setMainCode(savedData.mainCode);
        setSelectedDestinationOptions(savedData.destinations);
        setSelectedTypeOptions(savedData.types);
        setImages(savedData.images);
        setSelectedThemes(savedData.themes);
        setSelectedCategories(savedData.categories);
        setSelectedLanguages(savedData.languagesTour);
        setVideoLink(savedData.videoLink);
        setTimes(savedData.times);
        setSelectedPickupPlaces(savedData.pickupPlaces);
        setSelectedDropoffPlaces(savedData.dropoffPlaces);
        setSelectedLocations(savedData.locations);
        setSelectedInclusions(savedData.inclusions);
        setSelectedExclusions(savedData.exclusions);
        setSelectedAvailableLanguages(savedData.languages);
        setSelectedWhatToBring(savedData.whatToBring);
        setSelectedAgeRanges(savedData.ageRanges);
        setSelectedCancellationPolicys(savedData.cancellationPolicies);
        setRates(savedData.rates);
        setTasks(savedData.tasks);
        setSelectedResources(savedData.resources);
      }
     
    }
  }, [isEditing]);
  
    


  const steps = [
    "Basic Info 📝",
    "Media & Description 🖼️",
    "Start-time & Duration ⏰",
    "Pick-up / Drop-off 🚐",
    "Itinerary 📍",
    "Inclusion / Exclusion ✅",
    "Rooms 🛏️",
    "Pricing 💲",
    "Task & Resources 📋",
    "Activate 🟢"
  ];


  const typeOptions = [
    { id: '1', title: 'Private' },
    { id: '2', title: 'Group' },
  ];


  const langOptions = [
    { id: 1, title: 'English' },
    { id: 2, title: 'Portuguese' },
    { id: 3, title: 'German' },
    { id: 4, title: 'Spanish' },
    { id: 5, title: 'French' },
  ];

  const roomAmenitiesOptions = [
    { _id: 1, title: 'Free Wi-Fi' },
    { _id: 2, title: 'Air Conditioning' },
    { _id: 3, title: 'Private Bathroom' },
    { _id: 4, title: 'Flat-screen TV' },
    { _id: 5, title: 'Mini Bar' },
    { _id: 6, title: 'Room Service' },
    { _id: 7, title: 'Tea/Coffee Maker' },
    { _id: 8, title: 'Balcony' },
    { _id: 9, title: 'Safe Deposit Box' },
    { _id: 10, title: 'Hair Dryer' }
  ];

  const roomTypesOptions = [
    { _id: 1, title: 'Single Room' },
    { _id: 2, title: 'Double Room' },
    { _id: 3, title: 'Twin Room' },
    { _id: 4, title: 'Deluxe Room' },
    { _id: 5, title: 'Suite' },
    { _id: 6, title: 'Family Room' },
    { _id: 7, title: 'Studio' },
    { _id: 8, title: 'Presidential Suite' },
    { _id: 9, title: 'Penthouse' },
    { _id: 10, title: 'Villa' }
  ];
  
  

  

  // >>> Variables
  


  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const options = [
    { id: '1', title: 'City Tour' },
    { id: '2', title: 'Museum Visit' },
    { id: '3', title: 'Beach Day' },
    { id: '4', title: 'Mountain Hike' },
    { id: '5', title: 'Wine Tasting' },
  ];
  
  
  
  const ageOptions = [
    { id: '1', title: 'Child (0-12)' },
    { id: '2', title: 'Teenager (13-17)' },
    { id: '3', title: 'Adult (18-64)' },
    { id: '4', title: 'Senior (65+)' },
    { id: '5', title: 'Family Package' },
  ];
  




// >>> Variables
  const [rates, setRates] = useState([]);
  const [roomCode, setRoomCode] = useState('');
  const [selectedRateLanguages, setSelectedRateLanguages] = useState([]);
  const [selectedRateCancellationPolicys, setSelectedRateCancellationPolicys] = useState([]);
  const [selectedRateTimes, setSelectedRateTimes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPickupPlaces, setSelectedPickupPlaces] = useState([]);
  const [selectedDropoffPlaces, setSelectedDropoffPlaces] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedInclusions, setSelectedInclusions] = useState([]);
  const [selectedDestinationOptions, setSelectedDestinationOptions] = useState([]);
  const [selectedExclusions, setSelectedExclusions] = useState([]);
  const [selectedResources, setSelectedResources] = useState([]);
  const [selectedTypeOptions, setSelectedTypeOptions] = useState([]);
  const [selectedAvailableLanguages, setSelectedAvailableLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedRoomLanguages, setSelectedRoomLanguages] = useState([]);
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [selectedWhatToBring, setSelectedWhatToBring] = useState([]);
  const [selectedCancellationPolicys, setSelectedCancellationPolicys] = useState([]);
  const [images, setImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [selectedRoomAmenities, setSelectedRoomAmenities] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [tiers, setTiers] = useState([{ minParticipants: 1, maxParticipants: Infinity, pricePerParticipant: 0 }]);
  const [ageRangeTiers, setAgeRangeTiers] = useState({});
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [currentTask, setCurrentTask] = useState({});
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteRate = (id) => {
    console.log("Tentando excluir o time com id:", id);
  
    const originalLength = rates.length;
    console.log("Tamanho original do array 'rates':", originalLength);
  
    const updatedRates = rates.filter((rate) => {
      console.log(`Comparando ${rate.id} com ${id}`);
      return rate.id !== id;
    });
  
    console.log("Array 'rates' após tentativa de exclusão:", updatedRates);
  
    if (updatedRates.length < originalLength) {
      setRates(updatedRates);
      console.log("Exclusão bem-sucedida. Novo tamanho do array 'rates':", updatedRates.length);
    } else {
      console.log("Falha na exclusão. O array 'times' permanece o mesmo tamanho:", updatedRates.length);
    }
  };
  

  const handleActivateProduct = () => {
    // Lógica para ativar o produto
   
      localStorage.setItem('mainCode', '');  // Armazena uma string vazia show handleSaveAll
      localStorage.setItem('images', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedThemes', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedCategories', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedLanguages', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('videoLink', '');  // Armazena uma string vazia
      localStorage.setItem('times', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedPickupPlaces', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedDropoffPlaces', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedLocations', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedInclusions', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedExclusions', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedAvailableLanguages', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedWhatToBring', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedAgeRanges', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedCancellationPolicys', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('rates', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('tasks', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedResources', JSON.stringify([]));  

   // Armazena um array vazio
    console.log('Product Activated');

    const newTour = {

      id: uuidv4(),
      code: mainCode,  // Código principal
      title: selectedLanguages[0].title,
      status: 'Active 🟢',
      accomodation: true,
      destinations: selectedDestinationOptions,
      type: selectedType,
      types: selectedTypeOptions,
      images: images,  // Imagens
      themes: selectedThemes,  // Temas selecionados
      categories: selectedCategories,  // Categorias selecionadas
      languagesTour: selectedLanguages,  // Idiomas selecionados
      videoLink: videoLink,  // Link do vídeo
      times: times,  // Horários
      pickupPlaces: selectedPickupPlaces,  // Locais de coleta selecionados
      dropoffPlaces: selectedDropoffPlaces,  // Locais de entrega selecionados
      locations: selectedLocations,  // Localizações selecionadas
      inclusions: selectedInclusions,  // Inclusões selecionadas
      exclusions: selectedExclusions,  // Exclusões selecionadas
      rooms: rooms,  // Idiomas disponíveis selecionado
      cancellationPolicies: selectedCancellationPolicys,  // Políticas de cancelamento selecionadas
      rates: rates,  // Tarifas
      tasks: tasks,  // Tarefas
      resources: selectedResources  // Recursos selecionados

    };
    
    console.log(newTour);
    
    
    addAccommodation(newTour)
      .then((data) => {
        console.log('Tour criado com sucesso:', data);
      })
      .catch((error) => {
        console.error('Erro ao criar o tour:', error.message);
      });
 
    
    setDropdownOpen(false);
    router.push('/products');
  };

  const handleSaveAsDraft = () => {
    // Lógica para salvar como rascunho
  
      localStorage.setItem('mainCode', '');  // Armazena uma string vazia show
      localStorage.setItem('images', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedThemes', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedCategories', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedLanguages', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('videoLink', '');  // Armazena uma string vazia
      localStorage.setItem('times', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedPickupPlaces', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedDropoffPlaces', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedLocations', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedInclusions', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedExclusions', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedAvailableLanguages', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedWhatToBring', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedAgeRanges', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedCancellationPolicys', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('rates', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('tasks', JSON.stringify([]));  // Armazena um array vazio
      localStorage.setItem('selectedResources', JSON.stringify([]));  
  

    const newTour = {

      id: uuidv4(),
      code: mainCode,  // Código principal
      title: selectedLanguages[0].title,
      accomodation: true,
      status: 'Inactive 🔴',
      destinations: selectedDestinationOptions,
      type: selectedType,
      types: selectedTypeOptions,
      images: images,  // Imagens
      themes: selectedThemes,  // Temas selecionados
      categories: selectedCategories,  // Categorias selecionadas
      languagesTour: selectedLanguages,  // Idiomas selecionados
      videoLink: videoLink,  // Link do vídeo
      times: times,  // Horários
      pickupPlaces: selectedPickupPlaces,  // Locais de coleta selecionados
      dropoffPlaces: selectedDropoffPlaces,  // Locais de entrega selecionados
      locations: selectedLocations,  // Localizações selecionadas
      inclusions: selectedInclusions,  // Inclusões selecionadas
      exclusions: selectedExclusions,  // Exclusões selecionadas
      rooms: rooms,  // Idiomas disponíveis selecionado
      cancellationPolicies: selectedCancellationPolicys,  // Políticas de cancelamento selecionadas
      rates: rates,  // Tarifas
      tasks: tasks,  // Tarefas
      resources: selectedResources  // Recursos selecionados
      
    };
    
    console.log(newTour);
    

    addAccommodation(newTour)
    .then((data) => {
      console.log('Tour criado com sucesso:', data);
      router.push('/products');
    })
    .catch((error) => {
      console.error('Erro ao criar o tour:', error.message);
      router.push('/products');
    });


    console.log('Saved as Draft');
    setDropdownOpen(false);

    //router.push('/products');
  };

  /*const rooms = [
    { id: 1, name: 'Deluxe Suite' },
    { id: 2, name: 'Standard Room' },
    { id: 3, name: 'Presidential Suite' },
    { id: 4, name: 'Single Room' },
    { id: 5, name: 'Double Room' }
  ];*/
  

  const handleSaveTask = () => {
    if (editingTaskId) {
      // Editando uma tarefa existente
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? currentTask : task
      );
      setTasks(updatedTasks);
    } else {
      // Adicionando uma nova tarefa com UUID
      setTasks((prevTasks) => [...prevTasks, { ...currentTask, id: uuidv4() }]);
    }
    setShowModal(false);
    setEditingTaskId(null);
    setCurrentTask({ id: '', title: '', description: '', subTasks: [] }); // Reseta o estado após salvar handleSaveAll
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditingTaskId(id);
    console.log(taskToEdit);
    setCurrentTask(taskToEdit);
    setShowModal(true);
  };

 // >>> Handle Selections throught MultiSelect.jsx || ex : themes -> handleSelectedThemes()  mainCode editRate
  const handleSelectedResources = (selected) => { setSelectedResources(selected);};  
  const handleSelectedDestinationOptions = (selected) => { setSelectedDestinationOptions(selected);}; 
  const handleSelectedTypeOptions = (selected) => { setSelectedTypeOptions(selected);};
  const handleSelectedRateLanguages = (selected) => { setSelectedRateLanguages(selected);};
  const handleSelectedRateCancellationPolicys = (selected) => { setSelectedRateCancellationPolicys(selected);};
  const handleSelectedRateTimes = (selected) => { setSelectedRateTimes(selected);};
  const handleSelectedThemes = (selected) => { setSelectedThemes(selected);};
  const handleSelectedCategories = (selected) => { setSelectedCategories(selected);};
  const handleSelectedPickupPlaces = (selected) => { setSelectedPickupPlaces(selected);};
  const handleSelectedDropoffPlaces = (selected) => { setSelectedDropoffPlaces(selected);};
  const handleSelectedLocations = (selected) => { setSelectedLocations(selected);};
  const handleSelectedInclusions = (selected) => { setSelectedInclusions(selected);};
  const handleSelectedExlusions = (selected) => { setSelectedExclusions(selected);};
  const handleSelectedRoomAmenities = (selected) => { setSelectedRoomAmenities(selected);};
  const handleSelectedAvailableLanguages = (selected) => { setSelectedAvailableLanguages(selected);};
  const handleSelectedLanguages = (selected) => { setSelectedLanguages(selected);};
  const handleSelectedRoomLanguages = (selected) => { setSelectedRoomLanguages(selected);};
  const handleSelectedAgeRanges = (selected) => { setSelectedAgeRanges(selected);};
  const handleSelectedWhatToBring = (selected) => { setSelectedWhatToBring(selected);};
  const handleSelectedCancellationPolicys = (selected) => { setSelectedCancellationPolicys(selected);};
  const handleImagesChange = (newImages) => {setImages(newImages);};
  const handleRoomImagesChange = (newImages) => {setRoomImages(newImages);};

  const handleCheckboxChange = (title) => {
    const newSelectedRanges = new Set(selectedRanges);

    if (newSelectedRanges.has(title)) {
      newSelectedRanges.delete(title);
      const updatedTiers = { ...ageRangeTiers };
      delete updatedTiers[title];
      setAgeRangeTiers(updatedTiers);
    } else {
      newSelectedRanges.add(title);
      if (!ageRangeTiers[title]) {
        setAgeRangeTiers((prev) => ({
          ...prev,
          [title]: [{ minParticipants: 1, maxParticipants: Infinity, pricePerParticipant: 0 }],
        }));
      }
    }
    setSelectedRanges(newSelectedRanges);
  };

  const [roomPricing, setRoomPricing] = useState({});

  const handleUpdatePricing = (updatedPricing) => {
    setRoomPricing(updatedPricing);
    console.log('Updated Pricing in Parent:', updatedPricing);
    // Aqui você pode enviar esses dados para um backend ou usá-los em outra lógica
  };

  const handleSaveAll = async () => {

    const newTour = {
      code: mainCode,  // Código principal
      title: selectedLanguages[0].title,
      status: status,
      destinations: selectedDestinationOptions,
      type: selectedType,
      types: selectedTypeOptions,
      images: images,  // Imagens
      themes: selectedThemes,  // Temas selecionados
      categories: selectedCategories,  // Categorias selecionadas
      languagesTour: selectedLanguages,  // Idiomas selecionados
      videoLink: videoLink,  // Link do vídeo
      times: times,  // Horários
      pickupPlaces: selectedPickupPlaces,  // Locais de coleta selecionados
      dropoffPlaces: selectedDropoffPlaces,  // Locais de entrega selecionados
      locations: selectedLocations,  // Localizações selecionadas
      inclusions: selectedInclusions,  // Inclusões selecionadas
      exclusions: selectedExclusions,  // Exclusões selecionadas
      rooms: rooms,  // Idiomas disponíveis selecionado
      cancellationPolicies: selectedCancellationPolicys,  // Políticas de cancelamento selecionadas
      rates: rates,  // Tarifas
      tasks: tasks,  // Tarefas
      resources: selectedResources  // Recursos selecionados
    };
    
    console.log(newTour);

    try {
      // Atualiza o produto usando a função importada
      await updateAccommodation(isEditing.data._id, newTour);
      // Redireciona para a lista de produtos após a atualização
      router.push('/products');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleSave = () => {

    //const rate = rates.find((rate) => rate._id || rate.id === editingItem);

   

    const newRate = {
      id: uuidv4(),
      code: code,
      title: rateTitle,
      description: description,
      startDate: startDate,
      endDate: endDate,
      price: pricing
    };

    console.log(">>>",newRate);
    
    if (editingItem !== null) {
      // Edita o item existente
      const updatedRates = rates.map((rate) =>
      rate.id || rate._id === editingItem ? newRate : rate
    );
    setRates(updatedRates);
    } else {
      // Adiciona um novo rate
      setRates((prevRates) => [...prevRates, newRate]);
    }

    // Resetar estados após salvar
    setRateTitle("");
    setCode("");
    setSelectedRanges(new Set());
    setAgeRangeTiers({});
    //setEditingItem(null);

    // Fechar o modal
    setShowModal(false);
  };


  const handleEdit = (rateId) => {
    // Pesquisar o rate pelo UUID handleSave
    const rateToEdit = rates.find((rate) => rate._id || rate.id === rateId);
    console.log(rateId);
    if (rateToEdit) {
      console.log(rateToEdit);
      // Carregar os dados do rate selecionado para edição selectedOptions
      setEditingItem(rateToEdit);
      setRateTitle(rateToEdit.title);
      setCode(rateToEdit.code || "");
      setSelectedRateLanguages(rateToEdit.languages);
      setSelectedRateTimes(rateToEdit.times);
      setSelectedRateCancellationPolicys(rateToEdit.cancellationPolicies);
      const selectedRangeTitles = new Set(rateToEdit.price.map(p => p.title));
      setSelectedRanges(selectedRangeTitles);
      console.log(selectedRanges);
      
      setAgeRangeTiers(
        rateToEdit.price.reduce((acc, curr) => {
          acc[curr.title] = curr.fields;
          return acc;
        }, {})
      );
      setShowModal(true);
    }
  };
  
  const handleTierChange = (ageRangeTitle, updatedTiers) => {
    setAgeRangeTiers((prev) => ({
      ...prev,
      [ageRangeTitle]: updatedTiers,
    }));
  };





  // Functions
  const rateColumns = [
    { key: 'code', title: 'Code' },
    { key: 'title', title: 'Title' },
    
  ];

  const taskColumns = [
    { key: 'title', title: 'Title' },
  ];

  const timeColumns = [
    { key: 'startTime', title: 'Start - Time' },
    { key: 'duration', title: 'Duration' }
  ];

  
  const roomColumns = [
    { key: 'title', title: 'Room Title' },
    { key: 'type', title: 'Type' }
  ];


  const handleDelete = (item) => {
    setData((prevData) => prevData.filter((dataItem) => dataItem.code !== item.code));
  };

  const resourceOptions = [
    { name: "Guide"},
    { name: "Driver"},
    { name: "Chef"},
    { name: "Cleaner"}
    // Add more languages as needed
  ];

  const languageOptions = [
    { name: "English", flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkEecjfMDN4CD6u3WBViw-Hu9ZGVdQ-WWug&s" },
    { name: "Spanish", flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQePK8Mj8wmsGuANtEyew5qTZEJBeULNdoBQg&s" },
    { name: "French", flag: "https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png" },
    { name: "Portuguese", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1024px-Flag_of_Portugal.svg.png" },
    { name: "German", flag: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq9PyDXDTJy5qIG_5QSjU_iU10WM0p4tI69Q&s" },
    // Add more languages as needed
  ];
  const [startTime, setStartTime] = useState(""); // Estado para Start Time
  const [duration, setDuration] = useState(""); // Estado para Duration
  const [times, setTimes] = useState([]); // Lista de tempos armazenados
  const [editingItem, setEditingItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [mainCode, setMainCode] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [rateTitle, setRateTitle] = useState("");
  //const [tiers, setTiers] = useState([]);
  /*const ageRanges = [
    { id: 1, title: "ADULT 18-99", startAge: 18, endAge: 99 },
    { id: 2, title: "TEEN 13-17", startAge: 13, endAge: 17 },
    { id: 3, title: "CHILD 4-12", startAge: 4, endAge: 12 },
  ];*/
  const [selectedRanges, setSelectedRanges] = useState(new Set());
  const [selectedIsland, setSelectedIsland] = useState(""); // Estado local
  const [selectedType, setSelectedType] = useState(""); // Estado local
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');

  
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Função para lidar com a mudança de seleção
  const handleSelectedTypeChange = (event) => {
    setSelectedType(event.target.value); // Atualiza o estado local
  };

  const handleChange = (event) => {
    setSelectedIsland(event.target.value); // Atualiza o estado localmente handleEditTime
  };
  const handleSaveTime = () => {
    const newTime = {
      id: editingItem || uuidv4(), // Se estiver editando, mantém o mesmo id
      title: `${startTime.toString()} | ${duration.toString()}`, 
      startTime: startTime, // valor do startTime
      duration: duration, // valor do duration
    };

    console.log(newTime);
  
    if (editingItem !== null) {
      console.log(editingItem);
      // Edita o item existente no array times
      const updatedTimes = times.map((time) =>
        time.id === editingItem.id ? newTime : time
      );
      setTimes(updatedTimes);
    } else {
      // Adiciona um novo time
      setTimes((prevTimes) => [...prevTimes, newTime]);
    }
  
    // Resetar estados após salvar
    setStartTime(""); // Reseta o startTime
    setDuration(""); // Reseta o duration
    setEditingItem(null);
  
    // Fechar o modal
    setShowModal(false);
  };

  const handleDeleteTime = (id) => {
    console.log("Tentando excluir o time com id:", id);
  
    const originalLength = times.length;
    console.log("Tamanho original do array 'times':", originalLength);
  
    const updatedTimes = times.filter((time) => {
      console.log(`Comparando ${time.id} com ${id}`);
      return time.id !== id;
    });
  
    console.log("Array 'times' após tentativa de exclusão:", updatedTimes);
  
    if (updatedTimes.length < originalLength) {
      setTimes(updatedTimes);
      console.log("Exclusão bem-sucedida. Novo tamanho do array 'times':", updatedTimes.length);
    } else {
      console.log("Falha na exclusão. O array 'times' permanece o mesmo tamanho:", updatedTimes.length);
    }
  };
  
  
  
  

  const handleEditTime = (timeId) => {
    // Pesquisar o time pelo UUID
    console.log(timeId);
    const timeToEdit = times.find((time) => time._id || time.id === timeId);
  
    if (timeToEdit) {
      // Carregar os dados do time selecionado para edição
      setEditingItem(timeToEdit);
      setStartTime(timeToEdit.startTime); // Carrega o startTime
      setDuration(timeToEdit.duration); // Carrega o duration
      setShowModal(true);
    }
  };


  const handleSaveRoom = () => {

    const newTime = {
      id: editingItem || uuidv4(), // Se estiver editando, mantém o mesmo id
      code: roomCode,
      title: selectedRoomLanguages[0].title,
      images: roomImages,
      type: selectedRoomType,
      languages: selectedRoomLanguages , 
      capacity: capacity, // valor do startTime
      inclusions: selectedRoomAmenities, // valor do duration
    };

    console.log(">",newTime);
  
    if (editingItem !== null) {
      console.log(editingItem);
      // Edita o item existente no array times
      const updatedTimes = rooms.map((time) =>
        time.id === editingItem.id ? newTime : time
      );
      setRooms(updatedTimes);
    } else {
      // Adiciona um novo time
      setRooms((prevRooms) => [...prevRooms, newTime]);
    }
  
    // Resetar estados após salvar
    setStartTime(""); // Reseta o startTime
    setDuration(""); // Reseta o duration
    setEditingItem(null);
  
    // Fechar o modal
    setShowModal(false);
  };


  const handleEditRoom = (timeId) => {
    // Pesquisar o time pelo UUID
    console.log(timeId);
    const timeToEdit = rooms.find((time) => time._id || time.id === timeId);
  
    if (timeToEdit) {
      // Carregar os dados do time selecionado para edição
      setEditingItem(timeToEdit);
      //setStartTime(timeToEdit.startTime); // Carrega o startTime
      //setDuration(timeToEdit.duration); // Carrega o duration
      setRoomCode(timeToEdit.code);
      setSelectedRoomLanguages(timeToEdit.languages);
      setSelectedRoomType(timeToEdit.type);
      setCapacity(timeToEdit.capacity);
      setSelectedRoomAmenities(timeToEdit.inclusions);
      setShowModal(true);
    }
  };


  const handleDeleteRoom = (id) => {
    console.log("Tentando excluir o time com id:", id);
  
    const originalLength = rooms.length;
    console.log("Tamanho original do array 'rates':", originalLength);
  
    const updatedRooms = rooms.filter((room) => {
      console.log(`Comparando ${room.id} com ${id}`);
      return room.id !== id;
    });
  
    console.log("Array 'rates' após tentativa de exclusão:", updatedRooms);
  
    if (updatedRooms.length < originalLength) {
      setRooms(updatedRooms);
      console.log("Exclusão bem-sucedida. Novo tamanho do array 'rates':", updatedRooms.length);
    } else {
      console.log("Falha na exclusão. O array 'times' permanece o mesmo tamanho:", updatedRooms.length);
    }
  };

  
  
  

  const handleSelectChange = (event) => {
    const value = event.target.value;
       if (value && !selectedOptions.includes(value)) {
         setSelectedOptions([...selectedOptions, value]);
        }
  };

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
  };

  const [viewedSteps, setViewedSteps] = useState(new Set());

  const handleStepperClick = (stepIndex) => {
    // Atualizar os passos visualizados
    setViewedSteps(prevViewed => {
      const newViewedSteps = new Set(prevViewed);
      newViewedSteps.add(stepIndex);
      return newViewedSteps;
    });
  
    // Atualizar o passo ativo
    setActiveStep(stepIndex);
  };
  
  const validateFields = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          mainCode.trim() !== "" &&
          selectedDestinationOptions.length > 0 &&
          selectedTypeOptions.length > 0 &&
          selectedThemes.length > 0 &&
          selectedCategories.length > 0
        );
      case 1:
        return (
          videoLink.trim() !== "" &&
          images.length > 0 &&
          selectedLanguages.length > 0
        );
      case 2:
        return (
          times.length > 0
       );
      case 3:
        return (
          selectedPickupPlaces.length > 0 &&
          selectedDropoffPlaces.length > 0
       );
       case 4:
        return (
          selectedLocations.length > 0 
       );
       case 5:
        return (
          selectedInclusions.length > 0 &&
          selectedExclusions.length > 0
       );
       case 6:
        return (
          selectedAvailableLanguages.length > 0 &&
          selectedAgeRanges.length > 0 &&
          selectedWhatToBring.length > 0 &&
          selectedCancellationPolicys.length > 0 
       );
       case 7:
        return (
          rates.length > 0 
       );
       case 8:
        return (
          tasks.length > 0 &&
          selectedResources.length > 0  
       );
      // Adicione mais cases conforme necessário
      default:
        return true;
    }
  };
  
  const updateCompletedSteps = useCallback(() => {
    setCompletedSteps(prevCompleted => {
      const newCompletedSteps = new Set(prevCompleted);
      steps.forEach((_, index) => {
        if (validateFields(index)) {
          newCompletedSteps.add(index);
        } else {
          newCompletedSteps.delete(index);
        }
      });
      return newCompletedSteps;
    });
  }, [
    steps, // Adicione as dependências necessárias
    validateFields // Certifique-se de incluir todas as dependências usadas na função
  ]);
  
  
  
  
  const handleTimeChange = (time) => {
    console.log("Selected Time:", time);
  };

  const handleBack = () => {
    console.log(selectedCancellationPolicys);
    setActiveStep(prevStep => {
      const newStep = Math.max(prevStep - 1, 0);
      setCompletedSteps(prevCompletedSteps => {
        const newCompletedSteps = new Set(prevCompletedSteps);
        newCompletedSteps.delete(prevStep); // Remove o estado de conclusão do passo atual
        return newCompletedSteps;
      });
      return newStep;
    });
  };

  

  const handleSaveAndContinue = () => {

    // >>> Cookies
    localStorage.setItem('mainCode', mainCode);
    localStorage.setItem('selectedDestinationOptions', JSON.stringify(selectedDestinationOptions));
    localStorage.setItem('selectedTypeOptions', JSON.stringify(selectedTypeOptions));
    localStorage.setItem('images', JSON.stringify(images));
    localStorage.setItem('selectedThemes', JSON.stringify(selectedThemes));
    localStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
    localStorage.setItem('selectedLanguages', JSON.stringify(selectedLanguages));
    localStorage.setItem('videoLink', videoLink);
    localStorage.setItem('times', JSON.stringify(times));
    localStorage.setItem('selectedPickupPlaces', JSON.stringify(selectedPickupPlaces));
    localStorage.setItem('selectedDropoffPlaces', JSON.stringify(selectedDropoffPlaces));
    localStorage.setItem('selectedLocations', JSON.stringify(selectedLocations));
    localStorage.setItem('selectedInclusions', JSON.stringify(selectedInclusions));
    localStorage.setItem('selectedExclusions', JSON.stringify(selectedExclusions));
    localStorage.setItem('selectedAvailableLanguages', JSON.stringify(selectedAvailableLanguages));
    localStorage.setItem('selectedWhatToBring', JSON.stringify(selectedWhatToBring));
    localStorage.setItem('selectedAgeRanges', JSON.stringify(selectedAgeRanges));
    localStorage.setItem('selectedCancellationPolicys', JSON.stringify(selectedCancellationPolicys));
    localStorage.setItem('rates', JSON.stringify(rates));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('selectedResources', JSON.stringify(selectedResources));
    // >>>
    setCompletedSteps(prevCompletedSteps => {
      const newCompletedSteps = new Set(prevCompletedSteps);
      newCompletedSteps.add(activeStep); // Marca o passo atual como concluído
      return newCompletedSteps;
    });
    setActiveStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
    console.log(">",rates);
  };

  useEffect(() => {
    updateCompletedSteps();
  }, [
      mainCode, 
      selectedDestinationOptions, 
      selectedTypeOptions, 
      selectedThemes, 
      selectedCategories, 
      videoLink, 
      images,
      selectedLanguages,
      times,
      selectedPickupPlaces,
      selectedDropoffPlaces,
      selectedLocations,
      selectedInclusions,
      selectedExclusions,
      selectedAvailableLanguages,
      selectedAgeRanges,
      selectedWhatToBring,
      selectedCancellationPolicys,
      rates,
      tasks,
      selectedResources
    ]);
  
  

  return (
    <main className="flex flex-col p-4 overflow-hidden">
    {/* ThemeSwitcher positioned at the top right */}
    <div className="flex flex-col w-full max-w-8xl items-start justify-start font-mono text-sm flex-grow overflow-hidden">
      {/* Title and Breadcrumbs Section */}
      <div className="flex flex-col w-full  custom-scrollbar">
        <div className="flex w-full flex-grow">
          {/* Stepper Section with Divider */}
          <div className="w-full max-w-xs pr-4 overflow-y-auto">
            <div className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg">
              <ol className="space-y-4">
                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  const isCompleted = completedSteps.has(index);
                  const isViewed = viewedSteps.has(index);
  
                  return (
                    <li key={index}>
                      <div
                        className={`p-2 border rounded-lg cursor-pointer text-center ${
                          isActive
                            ? "text-blue-700 bg-blue-100 border-blue-300 dark:bg-gray-800 dark:border-blue-800 dark:text-blue-400"
                            : isViewed
                            ? isCompleted
                              ? "text-green-700 bg-green-50 border-green-300 dark:bg-gray-800 dark:border-green-800 dark:text-green-400"
                              : "text-red-700 bg-red-50 border-red-300 dark:bg-gray-800 dark:border-red-800 dark:text-red-400"
                            : "text-gray-700 bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                        }`}
                        role="alert"
                        onClick={() => handleStepperClick(index)}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-xs">
                            {index + 1}. {step}
                          </h3>
                          {isCompleted && !isActive && (
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 16 12"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5.917 5.724 10.5 15 1.5"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
  
          {/* Session Content Section */}
          <div className="flex-1 pl-4 overflow-auto mr-8">
            {/* Main Content */}
            <div className="text-left flex-grow">
              {activeStep === 0 && (
                <div className="space-y-2 text-center">
                    <div className="w-full flex flex-col items-center space-y-2 ">
                      
                      <div className="w-full max-w-lg">
                        <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> {/* Reduzi a margem inferior */}
                          Give your Experience a Code
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2"> 
                           Give your Experience a code that serves as an presentation.
                        </p>
                        <br/>
                        <input
                          id="code"
                          type="text"
                          value={mainCode}
                          onChange={(e) => setMainCode(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          placeholder="Enter code"
                        />
                      </div>
                      <div className="w-full max-w-lg">
                        <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> {/* Reduzi a margem inferior */}
                          Choose the Expiriences Destination
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                           Give your Experience a Destination.
                        </p>
                        <br/>
                        <MultiSelectIndependent
                          options={destinationOptions}
                          selectedOptions={selectedDestinationOptions}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedDestinationOptions}
                        />
                      </div>
                      <br/>
                      <div className="w-full max-w-lg">
                        <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200">
                        What is the Type of your Expirience
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Pick the product Type / Private / Group / Private & Group.
                        </p>
                        <br/>
                        <MultiSelectIndependent
                          options={typeOptions}
                          selectedOptions={selectedTypeOptions}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedTypeOptions}
                        />
                      </div>
                      <br/>
                      <div className="w-full max-w-lg mb-4">
                        <h3 className="text-xl font-semibold mb-1 mt-4 text-center text-gray-800 dark:text-gray-200">
                        Chose the Themes that best describe your Expirience
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Help your travallers find what they are looking for.
                        </p>
                              
                        <MultiSelect
                          options={themeOptions}
                          selectedOptions={selectedThemes}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedThemes}
                        />
                      </div>
                      <br/>
                      <div className="w-full max-w-lg">
                        <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200">
                        Chose the Categories that best describe your Expirience
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Help your travallers find what they are looking for.
                        </p>
                        <MultiSelect
                          options={categoryOptions}
                          selectedOptions={selectedCategories}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedCategories}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {activeStep === 1 && (
                <div className="space-y-4 text-center"> 
                   <div className="w-full flex flex-col items-center space-y-4">  
                     <div className="w-full max-w-lg">
                       <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200">
                         Tell your travellers what the expirience is all about
                       </h3>
                       <p className="text-gray-700 dark:text-gray-300 mb-2">
                       Describe your expirience in detail, using exciting and engaging language to capture the essence of the expirience.
                       </p>
                       <MultiSelectAdvanced
                        options={languageOptions} // Lista de opções disponíveis
                        selectedOptions={selectedLanguages} // Estado das opções selecionadas
                        label="Select Languages" // Rótulo do campo
                        onSelect={handleSelectedLanguages} // Callback para receber as seleções
                      />
                     </div>
                     <br/>
                     <div className="w-full max-w-lg">
                       <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200">
                       Want to add Photos to your expirience?
                       </h3>
                       <p className="text-gray-700 dark:text-gray-300 mb-2">
                       Show travellers even more details about your expirience to give your travellers a better idea of what to expect.

                       </p>
                       <br/>
                       <DragImages images={images} onImagesChange={handleImagesChange} />
                     </div>
                     <br/>

                     <div className="w-full max-w-lg mb-4">
                       <h3 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200">
                       Want to add videos to your expirience?
                       </h3>
                       <p className="text-gray-700 dark:text-gray-300 mb-2"> 
                       Show travellers even more details in videos about your expirience to give your travellers a better idea of what to expect.
                       </p>
                       <br/>
                       <input
                          id="video-link"
                          type="url"
                          value={videoLink}
                          onChange={(e) => setVideoLink(e.target.value)}
                          placeholder="Paste the video link here..."
                          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                     </div>
                   </div>
                 </div>
                  )}
                  {activeStep === 2 && (
                  <div className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                        Set up your Experience Start Time
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Create start - time & Durations for  your Experience.
                    </p>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold mx-auto"/> 
                        <button
                          onClick={() => {
                            setEditingItem(null); // Define que não está editando nenhum item
                            setShowModal(true);
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Add Start - Time / Duration
                        </button>
                      </div>
                      <Table columns={timeColumns} data={times} onEdit={handleEditTime} onDelete={handleDeleteTime} />
                      <Modal showModal={showModal} setShowModal={setShowModal} title={editingItem ? "Edit Time" : "Add Time"}>
                        <div className="flex flex-col space-y-4 items-center"> 
                          
                          <div className="mb-4 w-full">
                            <label
                              htmlFor="start-time"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                            >
                              Start Time
                            </label>
                            <input
                              type="time"
                              value={startTime} // valor do startTime
                              onChange={(e) => setStartTime(e.target.value)} // atualiza o estado
                              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                          </div>

                          {/* Campo para Duration */}
                          <div className="mb-4 w-full">
                            <label
                              htmlFor="duration"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                            >
                              Duration
                            </label>
                            <input
                              type="time"
                              value={duration} // valor do duration
                              onChange={(e) => setDuration(e.target.value)} // atualiza o estado
                              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                          </div>

                          <div className="flex justify-end space-x-2 w-full">
                            <button
                              onClick={() => setShowModal(false)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Close
                            </button>
                            <button
                              onClick={handleSaveTime}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </Modal>

                    </div>
                  )}
                  {activeStep === 3 && (
                  <div className="space-y-4 text-center">
                      <div className="w-full flex flex-col items-center space-y-4">
                        <div className="w-full max-w-lg mb-4">
                          <h2 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> 
                            Set - up the Expirience Pick - Up Places
                          </h2>
                          <p className="text-gray-700 dark:text-gray-300 mb-2"> 
                            Choose pick-up, Spots.
                          </p>
                          <MultiSelect
                            options={locationGroupOptions}
                            selectedOptions={selectedPickupPlaces}
                            onSelectChange={handleSelectChange}
                            onRemoveOption={removeOption}
                            onSelect={handleSelectedPickupPlaces}
                          />
                        </div>
                        <div className="w-full max-w-lg">
                          <h2 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> 
                            Set - up the Expirience Drop - Off Places
                          </h2>
                          <p className="text-gray-700 dark:text-gray-300 mb-2"> 
                            Choose drop, Spots.
                          </p>
                          <MultiSelect
                            options={locationGroupOptions}
                            selectedOptions={selectedDropoffPlaces}
                            onSelectChange={handleSelectChange}
                            onRemoveOption={removeOption}
                            onSelect={handleSelectedDropoffPlaces}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {activeStep === 4 && (
                    <div className="space-y-4 text-center">
                    <div className="w-full flex flex-col items-center space-y-4">
                      <div className="w-full max-w-lg mb-4">
                        <h2 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> {/* Reduzi a margem inferior */}
                        Build the Itinerary for the Tour
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2"> 
                        Choose destinations for the Itinerary
                        </p>
                        <InteractiveMap locations={selectedLocations} />
                        <MultiSelectDraggable
                          options={locationOptions}
                          selectedOptions={selectedLocations}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedLocations}
                        />
                        <br/>  
                      </div>
                    </div>
                  </div>
                  )}
                  {activeStep === 5 && (
                  <div className="space-y-4 text-center">
                    <div className="w-full flex flex-col items-center space-y-4">
                      <div className="w-full max-w-lg mb-4">
                        <h2 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> {/* Reduzi a margem inferior */}
                        What is Include in your Expirience ?
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Let travellers know what is provided to help them understand what they are paying for. Included items such as food and drinks, special equipmentm and adnission fees.
                        </p>
                        <MultiSelect
                          options={inclusionOptions}
                          selectedOptions={selectedInclusions}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedInclusions}
                        />
                      </div>
                      <div className="w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-1 text-center text-gray-800 dark:text-gray-200"> {/* Reduzi a margem inferior */}
                          What is NOT Include in your Expirience ?
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-2"> 
                          Is there anything your travellers may need that is not included in your offering? Example: Food, Equipment or Addiotinal fees.
                        </p>
                        <MultiSelect
                          options={exclusionOptions}
                          selectedOptions={selectedExclusions}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedExlusions}
                        />
                      </div>
                    </div>
                  </div>
                  )}
                  {activeStep === 6 && (
                  <div className="space-y-4 text-center">
                  <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                      Rooms available in this Accomodation
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                      Add the rooms, with their specific features.
                  </p>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold mx-auto"/> 
                      <button
                        onClick={() => {
                          setEditingItem(null); // Define que não está editando nenhum item
                          setShowModal(true);
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Add Room
                      </button>
                    </div>
                    <Table columns={roomColumns} data={rooms} onEdit={handleEditRoom} onDelete={handleDeleteRoom} />
                    <Modal showModal={showModal} setShowModal={setShowModal} title={editingItem ? "Edit Time" : "Add Time"}>
                      <div className="flex flex-col space-y-4 items-center"> 
                      <div className="mb-4 w-full">
                          <label
                            htmlFor="start-time"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                          >
                            Images
                          </label>
                          <DragImages images={roomImages} onImagesChange={handleRoomImagesChange} />
                        </div>
                        <div className="mb-4 w-full">
                          <label
                            htmlFor="start-time"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                          >
                            Code
                          </label>
                          <input
                            type="roomCode"
                            value={roomCode} // valor do duration
                            onChange={(e) => setRoomCode(e.target.value)} // atualiza o estado
                            className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          />
                        </div>
                        <div className="w-full max-w-lg">
                        <label
                            htmlFor="start-time"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                          >
                            Title & Description
                        </label>
                       <MultiSelectAdvanced
                        options={languageOptions} // Lista de opções disponíveis
                        selectedOptions={selectedRoomLanguages} // Estado das opções selecionadas
                        label="Select Languages" // Rótulo do campo
                        onSelect={handleSelectedRoomLanguages} // Callback para receber as seleções
                      />
                     </div>
                    <div className="mb-4 w-full">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Type
                      </label>
                      <select
                        id="type"
                        className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        value={selectedRoomType}
                        onChange={(e) => setSelectedRoomType(e.target.value)}
                      >
                        <option value="">Select a room type</option>
                        {roomTypesOptions.map((type) => (
                          <option key={type._id} value={type.title}>
                            {type.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4 w-full">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Amenities
                      </label>
                      <MultiSelect
                          options={roomAmenitiesOptions}
                          selectedOptions={selectedRoomAmenities}
                          onSelectChange={handleSelectChange}
                          onRemoveOption={removeOption}
                          onSelect={handleSelectedRoomAmenities}
                        />

                    </div>
                    <div className="mb-4 w-full">
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Number of People
                      </label>
                      <input
                        type="number"
                        value={capacity} // valor do duration
                        onChange={(e) => setCapacity(e.target.value)} // atualiza o estado
                        className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                          />
                     <br/> 
                    </div>
                    <div className="flex justify-end space-x-2 w-full">
                          <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Close
                          </button>
                          <button
                            onClick={handleSaveRoom}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Modal>

                  </div>
                  )}
                  {activeStep === 7 && (
                  <div className="space-y-4 text-center">                 
                       <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                          Would you like to offer multiple rates for your expirience?
                         </h2>
                         <p className="text-gray-700 dark:text-gray-300 mb-2">
                           Rates allow you to price your options separatly. For example, settig additional price for lunch or pick - up.
                         </p>
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold mx-auto"/> 
                        <button
                          onClick={() => {
                            setEditingItem(null); // Define que não está editando nenhum item
                            setShowModal(true);
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Add Season
                        </button>
                      </div>
                      <Table columns={rateColumns} data={rates} onEdit={handleEdit} onDelete={handleDeleteRate} />
                      <Modal showModal={showModal} setShowModal={setShowModal} title={editingItem ? "Edit Rate" : "Add Rate"}>
                        <div className="flex flex-col space-y-4 items-center">
                          <div className="mb-4 w-full">
                            <label htmlFor="rate-code" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Code
                            </label>
                            <input
                              id="rate-code"
                              type="text"
                              value={code}
                              onChange={(e) => setCode(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                              placeholder="Enter rate code"
                            />
                          </div>
                          <div className="mb-4 w-full">
                            <label htmlFor="rate-title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Title
                            </label>
                            <input
                              id="rate-title"
                              type="text"
                              value={rateTitle}
                              onChange={(e) => setRateTitle(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                              placeholder="Enter rate title"
                            />
                          </div>      
                          <div className="mb-4 w-full">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                              Description
                            </label>
                            <textarea
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Enter task description"
                              rows="4"
                              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                            />
                           
                          </div>
                          <div className="mb-4 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                              Season | Start & End Date
                            </label>
                            <DateRangePicker
                              startDate={startDate}
                              endDate={endDate}
                              onStartDateChange={handleStartDateChange}
                              onEndDateChange={handleEndDateChange}
                            />
                          </div>
                          <div className="mb-4 w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                              Rooms
                            </label>
                            <RoomPricing rooms={rooms} pricing={pricing} setPricing={setPricing} />
                          </div>                       
                         
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
                    </div>
                  )}
                  {activeStep === 8 && (
                  <div className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                        Tasks
                     </h2>
                     <p className="text-gray-700 dark:text-gray-300 mb-2">
                         Set - up all the tasks necessary to make this experience.
                      </p>
                       <div className="flex justify-between items-center mb-4">
                         <h2 className="text-xl font-semibold mx-auto"></h2>
                         <button
                           onClick={() => {
                             setEditingItem(null); // Define que não está editando nenhum item
                             setShowModal(true);
                           }}
                           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                         >
                           Add Task
                         </button>
                       </div>                     
                       <Table columns={taskColumns} data={tasks} onEdit={handleEditTask} />
                       <br/>
                       <div className="w-full max-w-lg mx-auto">
                         <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                         Resources
                         </h2>
                         <p className="text-gray-700 dark:text-gray-300 mb-2">
                         Set - up all the Resources necessary to make this experience.
                         </p>
                         <MultiSelectResource
                           options={resourceOptions}
                           selectedOptions={selectedResources}
                           onRemoveOption={removeOption}
                           label="Select Languages"
                           onSelect={handleSelectedResources}
                         />
                       </div>
                       <Modal showModal={showModal} setShowModal={setShowModal} title={editingItem ? "Edit Task" : "Add Task"}>
                         <div className="flex flex-col space-y-4 items-center">
                           <Task taskData={currentTask} onTaskChange={setCurrentTask} />
                         <div className="flex justify-end space-x-2 w-full">
                            <button
                              onClick={() => setShowModal(false)}
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              Close
                            </button>
                            <button
                              onClick={handleSaveTask}
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                              Save
                            </button>
                          </div>
                         </div>
                       </Modal>
                     </div>
                  )}
             {activeStep === 9 ? (
           <div className="space-y-4 text-center">
           <div className="flex flex-col items-center">
           <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                        Confirmation
                     </h2>
                     <p className="text-gray-700 dark:text-gray-300 mb-2">
                         Save product as a Draft or make it A ready to use product - Ative | inactive  
                      </p>
                      <br/>
             {/* Imagem centralizada */}
             <img
               src="https://cdn-icons-png.flaticon.com/512/747/747095.png"
               alt="Centered Image"
               className="w-48 h-48 mb-2"
             />
           </div>
         
           <div className="relative flex justify-between mt-6 items-center">
             <button
               onClick={handleBack}
               className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
             >
               Back
             </button>
         
             <div className="relative">

             {isEditing.isEditing ? (
                <button
                  onClick={handleSaveAll}
                  className="px-4 py-2 bg-green-500 dark:bg-green-700 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-800"
                >
                  Save All
                </button>
              ) : (
                <button
                  onClick={handleDropdownToggle}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  {isDropdownOpen ? 'Select Action' : 'Actions'}
                </button>
              )}

         
               {isDropdownOpen && (
                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
                   <button
                     onClick={handleActivateProduct}
                     className="block w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                   >
                     Activate Product
                   </button>
                   <button
                     onClick={handleSaveAsDraft}
                     className="block w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                   >
                     Save as Draft
                   </button>
                 </div>
               )}
             </div>
           </div>
         </div>
         
           
            ) : (
              <div className="relative flex justify-between mt-6 items-center">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
                >
                  Back
                </button>

                <button
                  onClick={handleSaveAndContinue}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800"
                >
                  Save & Continue
                </button>
              </div>
            )}

              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

