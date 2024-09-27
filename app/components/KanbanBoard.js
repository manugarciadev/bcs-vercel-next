import React, { useState, useEffect } from 'react';
import { format, addDays, subDays, eachDayOfInterval } from 'date-fns';
import { CalendarIcon, CogIcon, CheckCircleIcon, StarIcon, UserIcon, TrashIcon, ArrowsUpDownIcon, PlusIcon, MinusIcon,  SunIcon, HomeIcon, CakeIcon, TruckIcon, KeyIcon, TreeIcon, CarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import DateRangePicker from './DateRangePicker'; // Ajuste o caminho conforme necessário
import Modal from './ModalForPackage';
import MultiSelect from "./MultiSelect";
import { useRouter } from 'next/navigation';
import{
  getLocationGroups, getDayTourActivities, addTrip, updateTrip, getAccommodations
} from '../services/api';
import { ArrowRightIcon,  } from '@heroicons/react/24/outline';

const KanbanBoard = (isEditing, isCloning, data) => {

  const router = useRouter();

  useEffect(() => {
    if (isEditing.data) {
      // Modo de edição
      console.log(isEditing);
      setTitle(isEditing.data.title || '');
      setStartDate(isEditing.data.startDate || '');
      setEndDate(isEditing.data.endDate || '');
      setClientBudget(isEditing.data.clientBudget || 0);
      setLanguage(isEditing.data.language);
      setProspect(isEditing.data.prospect);
      setSelectedLocations(isEditing.data.selectedLocations || []);
      setParticipants(isEditing.data.participants);
      setTotalPrice(isEditing.data.price);
      setColumns(revertColumns(isEditing.data.columns));
    } else {
      // Modo de criação data
      if (typeof window !== "undefined") {
      
      }
     
    }
    if (isEditing.isCloning) {
      // Modo de edição
      console.log(isEditing.data);
      //setTotalPrice(isEditing.data.price || 0); buttons
      setStartDate(isEditing.data.startDate);
      setEndDate(isEditing.data.endDate);
      setColumns(revertColumns(isEditing.data.columns));
    } 


  }, [isEditing]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //const [data, setData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState({rates: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [locationGroupOptions, setLocationGroupOptions] = useState([]);
  const [extraCards, setExtraCards] = useState([]);
  const [mockProduct, setMockProduct] = useState(null);
  

  useEffect(() => {

    const fetchLocationGroups = async () => {
      try {
        const data = await getLocationGroups();
        setLocationGroupOptions(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchTours = async () => {
      try {
        const data = await getDayTourActivities();
        setTours(data);
        setExtraCards(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchAccommodations = async () => {
      try {
        const data = await getAccommodations();
        setAccommodations(data);
      } catch (error) {
        setError(error.message);
      }
    };

    
  
    
  
    const fetchData = async () => {
      setLoading(true); // Set loading to true before starting any requests
      await Promise.all([
        fetchLocationGroups(),
      ]);
      setLoading(false); // Set loading to false after all requests complete
    };
    fetchAccommodations();
    fetchLocationGroups();
    fetchTours();
  }, []);
  
 /* const mockProduct = {
    rooms: [
      {
        id: "1",
        code: "ROOM1",
        title: "Deluxe Suite",
        images:['https://www.mews.com/hs-fs/hubfs/Increasing%20revenue%20with%20day%20use%20rooms_Thumbnail%20-%20600x395.png?width=624&height=555&name=Increasing%20revenue%20with%20day%20use%20rooms_Thumbnail%20-%20600x395.png'],
        capacity: 2,
        languages: [
          {
            name: "English",
            flag: "https://flagcdn.com/w320/us.png",
            title: "Deluxe Suite English Description",
            shortDescription: "A luxury suite with all amenities.",
            longDescription: "This room features a king-size bed, ocean view, and a private balcony."
          },
          {
            name: "Spanish",
            flag: "https://flagcdn.com/w320/es.png",
            title: "Descripción en Español de la Suite Deluxe",
            shortDescription: "Una suite de lujo con todas las comodidades.",
            longDescription: "Esta habitación cuenta con una cama tamaño king, vista al mar y un balcón privado."
          }
        ]
      },
      {
        id: "2",
        code: "ROOM2",
        title: "Standard Room",
        images:[],
        capacity: 4,
        languages: [
          {
            name: "French",
            flag: "https://flagcdn.com/w320/fr.png",
            title: "Description en français de la chambre standard",
            shortDescription: "Une chambre standard avec des équipements essentiels.",
            longDescription: "Cette chambre comprend deux lits doubles et une vue sur le jardin."
          },
          {
            name: "English",
            flag: "https://flagcdn.com/w320/us.png",
            title: "Standard Room English Description",
            shortDescription: "A standard room with essential amenities.",
            longDescription: "This room features two double beds and a garden view."
          }
        ]
      }
    ]
  };*/
  

  const cardsDayTour = [
    {
      id: "4b13bbfa-2390-4ecf-84b2-1d5a6b32a1e6",      
      code: "RAI1GP",
      title: "Santiago Tour, from Tarrafal",
      status: "Inctive 🔴",
      images: ["https://www.capeverdeislands.org/wp-content/uploads/2015/07/beach-maio.jpg",],
      destination: [
        { id: '1', title: "MMO" },
      ],
      type: [
        { id: "2", title: "Group" },
      ],
      themes: [
        { id: "1", title: "Adventure" },
        { id: "2", title: "Cultural Experience" },
        { id: "3", title: "Relaxation" },
      ],
      categories: [
        { id: "1", title: "Family" },
        { id: "2", title: "Romantic Getaway" },
        { id: "3", title: "Solo Travel" },
      ],
      languagesTour: [
        {
          name: "English",
          flag:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkEecjfMDN4CD6u3WBViw-Hu9ZGVdQ-WWug&s",
          title: "English Title",
          shortDescription: "English Short Description",
          longDescription: "English Long Description",
        },
        {
          name: "Portuguese",
          flag:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1024px-Flag_of_Portugal.svg.png",
          title: "Portuguese Title",
          shortDescription: "Portuguese Short Description",
          longDescription: "Portuguese Long Description",
        },
      ],
      videoLink: "www.video.com",
      times: [
        {
          id: "ab5cabfc-99a4-4a37-a519-3413278544b0",
          title: "09:55 | 09:55",
          startTime: "09:55",
          duration: "09:55",
        },
        {
          id: "996c275e-4fe7-4ddf-b3ba-2a5837ce0506",
          title: "10:55 | 05:55",
          startTime: "10:55",
          duration: "05:55",
        },
      ],
      pickupPlaces: [
        {
          id: "1",
          title: "Praia",
          coordinates: [14.919755024261182, -23.503026338265],
        },
        {
          id: "2",
          title: "Porto - Gouveia",
          coordinates: [14.938723879832695, -23.661233304860275],
        },
      ],
      dropoffPlaces: [
        {
          id: "1",
          title: "Praia",
          coordinates: [14.919755024261182, -23.503026338265],
        },
        {
          id: "2",
          title: "Porto - Gouveia",
          coordinates: [14.938723879832695, -23.661233304860275],
        },
      ],
      itinerary: [
        {
          id: "1",
          title: "Praia",
          coordinates: [14.919755024261182, -23.503026338265],
        },
        {
          id: "2",
          title: "Porto - Gouveia",
          coordinates: [14.938723879832695, -23.661233304860275],
        },
        {
          id: "3",
          title: "Praia - Baixo",
          coordinates: [15.0625380781946, -23.490323589122315],
        },
      ],
      languages: [
        { id: "1", title: "English" },
        { id: "2", title: "Portuguese" },
      ],
      inclusions: [
        { id: "1", title: "Guided Tour" },
        { id: "2", title: "Breakfast Included" },
        { id: "4", title: "Entrance Tickets" },
      ],
      exclusions: [
        { id: "1", title: "Guided Tour" },
        { id: "3", title: "Transportation" },
      ],
      ageRanges: [
        { id: '1', title: "ADULT 18-99", startAge: 18, endAge: 99 },
        { id: '2', title: "TEEN 13-17", startAge: 13, endAge: 17 },
      ],
      whatToBring: [
        { id: "1", title: "Hat" },
        { id: "2", title: "Water" },
        { id: "3", title: "Comfortable shoes" },
      ],
      cancellationPolicies: [
        { id: "1", title: "Cancellation Policy for Flights" },
        { id: "2", title: "20% Refundable (3 days max.)" },
      ],
      rates: [
        {
          id: "8908b4c6-6d50-4c0e-93e0-b5ab736320cc",
          code: "#RATE1",
          title: "Rate",
          selected: false,
          languages: [
            { id: "1", title: "English" },
            { id: "2", title: "Portuguese" },
          ],
          times: [
            {
              id: "ab5cabfc-99a4-4a37-a519-3413278544b0",
              title: "09:55 | 09:55",
              startTime: "09:55",
              duration: "09:55",
            },
            {
              id: "cb5vabfc-99a4-4a37-a519-3413278544b0",
              title: "11:00 | 02:00",
              startTime: "09:55",
              duration: "09:55",
            }
          ],
          cancellationPolicies: [
            { id: "1", title: "Cancellation Policy for Flights" },
            { id: "2", title: "20% Refundable (3 days max.)" },
          ],
          price: [
            {
              title: "ADULT 18-99",
              minAge: 18,
              maxAge: 99,
              fields: [
                { minParticipants: 1, maxParticipants: 2, pricePerParticipant: 5000 },
                { minParticipants: 3, maxParticipants: 3, pricePerParticipant: 200 },
              ],
            },
            {
              title: "TEEN 13-17",
              minAge: 13,
              maxAge: 17,
              fields: [{ minParticipants: 1, maxParticipants: 1, pricePerParticipant: 1000 }],
            },
          ],
        },
      ],
      tasks: [
        {
          id: "42242bcb-f9b1-468c-8149-ac7fe763310c",
          title: "Task 1",
          description: "Task 1 Description",
          subTasks: [
            { id: "7fb0b89a-e05d-4d6c-ac74-973566c8f0cc", title: "Sub Task 1", deadline: "09:57" },
            { id: "20297498-a468-4209-a0d8-641d4ffe8b33", title: "Sub Task 2", deadline: "09:57" },
          ],
        },
      ],
      resources: [
        {id:"1", name: "Guide", count: 1 },
        {id:"2", name: "Driver", count: 3 },
        {id:"3", name: "Chef", count: 2 },
      ],
    },
    {
      id: "3b13bbfa-2390-4ecf-84b2-1d5a6b32a09d",      
      code: "MMO1GP",
      title: "Maio Island Full Expirience, complete Beach tour",
      status: "Inctive 🔴",
      images: ["https://www.capeverdeislands.org/wp-content/uploads/2015/07/beach-maio.jpg",],
      destination: [
        { id: '1', title: "MMO" },
      ],
      type: [
        { id: "2", title: "Group" },
      ],
      themes: [
        { id: "1", title: "Adventure" },
        { id: "2", title: "Cultural Experience" },
        { id: "3", title: "Relaxation" },
      ],
      categories: [
        { id: "1", title: "Family" },
        { id: "2", title: "Romantic Getaway" },
        { id: "3", title: "Solo Travel" },
      ],
      languagesTour: [
        {
          name: "English",
          flag:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlkEecjfMDN4CD6u3WBViw-Hu9ZGVdQ-WWug&s",
          title: "English Title",
          shortDescription: "English Short Description",
          longDescription: "English Long Description",
        },
        {
          name: "Portuguese",
          flag:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/1024px-Flag_of_Portugal.svg.png",
          title: "Portuguese Title",
          shortDescription: "Portuguese Short Description",
          longDescription: "Portuguese Long Description",
        },
      ],
      videoLink: "www.video.com",
      times: [
        {
          id: "ab5cabfc-99a4-4a37-a519-3413278544b0",
          title: "09:55 | 09:55",
          startTime: "09:55",
          duration: "09:55",
        },
        {
          id: "996c275e-4fe7-4ddf-b3ba-2a5837ce0506",
          title: "10:55 | 05:55",
          startTime: "10:55",
          duration: "05:55",
        },
      ],
      pickupPlaces: [
        {
          id: "1",
          title: "Praia",
          coordinates: [14.919755024261182, -23.503026338265],
        },
        {
          id: "2",
          title: "Porto - Gouveia",
          coordinates: [14.938723879832695, -23.661233304860275],
        },
      ],
      dropoffPlaces: [
        {
          id: "1",
          title: "Praia",
          coordinates: [14.919755024261182, -23.503026338265],
        },
        {
          id: "2",
          title: "Porto - Gouveia",
          coordinates: [14.938723879832695, -23.661233304860275],
        },
      ],
      itinerary: [
        {
          id: "1",
          title: "Praia",
          coordinates: [14.919755024261182, -23.503026338265],
        },
        {
          id: "2",
          title: "Porto - Gouveia",
          coordinates: [14.938723879832695, -23.661233304860275],
        },
        {
          id: "3",
          title: "Praia - Baixo",
          coordinates: [15.0625380781946, -23.490323589122315],
        },
      ],
      languages: [
        { id: "1", title: "English" },
        { id: "2", title: "Portuguese" },
      ],
      inclusions: [
        { id: "1", title: "Guided Tour" },
        { id: "2", title: "Breakfast Included" },
        { id: "4", title: "Entrance Tickets" },
      ],
      exclusions: [
        { id: "1", title: "Guided Tour" },
        { id: "3", title: "Transportation" },
      ],
      ageRanges: [
        { id: '1', title: "ADULT 18-99", startAge: 18, endAge: 99 },
        { id: '2', title: "TEEN 13-17", startAge: 13, endAge: 17 },
      ],
      whatToBring: [
        { id: "1", title: "Hat" },
        { id: "2", title: "Water" },
        { id: "3", title: "Comfortable shoes" },
      ],
      cancellationPolicies: [
        { id: "1", title: "Cancellation Policy for Flights" },
        { id: "2", title: "20% Refundable (3 days max.)" },
      ],
      rates: [
        {
          id: "8908b4c6-6d50-4c0e-93e0-b5ab736320cc",
          code: "#RATE1",
          title: "Rate",
          selected: false,
          languages: [
            { id: "1", title: "English" },
            { id: "2", title: "Portuguese" },
          ],
          times: [
            {
              id: "ab5cabfc-99a4-4a37-a519-3413278544b0",
              title: "09:55 | 09:55",
              startTime: "09:55",
              duration: "09:55",
            },
            {
              id: "cb5vabfc-99a4-4a37-a519-3413278544b0",
              title: "11:00 | 02:00",
              startTime: "09:55",
              duration: "09:55",
            }
          ],
          cancellationPolicies: [
            { id: "1", title: "Cancellation Policy for Flights" },
            { id: "2", title: "20% Refundable (3 days max.)" },
          ],
          price: [
            {
              title: "ADULT 18-99",
              minAge: 18,
              maxAge: 99,
              fields: [
                { minParticipants: 1, maxParticipants: 2, pricePerParticipant: 2000 },
                { minParticipants: 3, maxParticipants: 3, pricePerParticipant: 200 },
              ],
            },
            {
              title: "TEEN 13-17",
              minAge: 13,
              maxAge: 17,
              fields: [{ minParticipants: 1, maxParticipants: 1, pricePerParticipant: 1000 }],
            },
          ],
        },
      ],
      tasks: [
        {
          id: "42242bcb-f9b1-468c-8149-ac7fe763310c",
          title: "Task 1",
          description: "Task 1 Description",
          subTasks: [
            { id: "7fb0b89a-e05d-4d6c-ac74-973566c8f0cc", title: "Sub Task 1", deadline: "09:57" },
            { id: "20297498-a468-4209-a0d8-641d4ffe8b33", title: "Sub Task 2", deadline: "09:57" },
          ],
        },
      ],
      resources: [
        {id:"1", name: "Guide", count: 1 },
        {id:"2", name: "Driver", count: 3 },
        {id:"3", name: "Chef", count: 2 },
      ],
    }
  ];

  

  const cardsAccommodation = [
    { id: '4', content: 'Accommodation 1' },
    { id: '5', content: 'Accommodation 2' },
    { id: '6', content: 'Accommodation 3' },
  ];

  const cardsMeal = [
    { id: '7', content: 'Meal 1' },
    { id: '8', content: 'Meal 2' },
    { id: '9', content: 'Meal 3' },
  ];

  const cardsTransport = [
    { id: '10', content: 'Transport 1' },
    { id: '11', content: 'Transport 2' },
    { id: '12', content: 'Transport 3' },
  ];

  const cardsRental = [
    { id: '13', content: 'Rental 1' },
    { id: '14', content: 'Rental 2' },
    { id: '15', content: 'Rental 3' },
  ];

  const buttons = [
    { name: 'Day Tour', icon: SunIcon, id: 'dayTour', cards: tours, blocked: false },
    { name: 'Accommodation', icon: HomeIcon, id: 'accommodation', cards: accommodations, blocked: false },
    { name: 'Meal', icon: CakeIcon, id: 'meal', cards: cardsMeal, blocked: true }, // Exemplo de botão bloqueado
    { name: 'Transport', icon: TruckIcon, id: 'transport', cards: cardsTransport, blocked: true },
    { name: 'Rental', icon: KeyIcon, id: 'rental', cards: cardsRental, blocked: true }, // Exemplo de botão bloqueado tours
  ];

  // Estado para armazenar os cards atuais e o botão selecionado startDate
  const [selectedButton, setSelectedButton] = useState('dayTour');
  const [showModal, setShowModal] = useState(false);
  const [showSelectRateModal, setShowSelectRateModal] = useState(false);
  const [showSelectRoomModal, setShowSelectRoomModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [language, setLanguage] = useState('');
  const [clientBudget, setClientBudget] = useState(0);
  const [prospect, setProspect] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState({});
  const [selectedRoomsFull, setSelectedRoomsFull] = useState([]);
  const [participants, setParticipants] = useState(editingItem ? editingItem.participants : []);
  const [availableParticipants, setAvailableParticipants] = useState(participants.length);
 // Estado para quartos selecionados

 useEffect(() => {
  // Atualiza o número de participantes disponíveis conforme a ocupação muda onDrop
  const totalOccupied = Object.values(selectedRooms).reduce((acc, room) => {
    return room.isSelected ? acc + (room.occupancy || 0) : acc;
  }, 0);
  setAvailableParticipants(participants.length - totalOccupied);
}, [selectedRooms, participants.length]);

// Lidar com a seleção do quarto
const handleRoomSelection = (roomId, isSelected, room) => {
  // Atualiza o estado de selectedRooms
  setSelectedRooms((prev) => ({
    ...prev,
    [roomId]: { 
      ...prev[roomId], 
      isSelected, 
      occupancy: isSelected ? 1 : 0, // Começa com 1 se selecionado, 0 se desmarcado
    },
  }));

  // Atualiza o array de selectedRoomsFull
  setSelectedRoomsFull((prev) => {
    if (isSelected) {
      // Adiciona o room ao array de quartos selecionados
      return [...prev, { ...room, occupancy: 1 }];
    } else {
      // Remove o room do array de quartos selecionados
      return prev.filter((selectedRoom) => selectedRoom.id !== roomId);
    }
  });
};


// Lidar com a mudança de ocupação Increment
const handleOccupancyChange = (roomId, occupancy, capacity) => {
  const currentTotalOccupied = Object.values(selectedRooms).reduce((acc, room) => {
    return room.isSelected ? acc + (room.occupancy || 0) : acc;
  }, 0);

  const remainingParticipants = participants.length - currentTotalOccupied + (selectedRooms[roomId]?.occupancy || 0);

  // Permitir alteração apenas se houver participantes restantes e a ocupação estiver dentro dos limites
  if (occupancy >= 1 && occupancy <= capacity && remainingParticipants >= 0) {
    const newRemainingParticipants = remainingParticipants - occupancy;
    
    // Garantir que não podemos adicionar mais ocupação do que participantes disponíveis
    if (newRemainingParticipants >= 0) {
      setSelectedRooms((prev) => ({
        ...prev,
        [roomId]: { ...prev[roomId], occupancy },
      }));
    }
  }
};


  const handleSelectChange = (event) => {
    const value = event.target.value;
       if (value && !selectedOptions.includes(value)) {
         setSelectedOptions([...selectedOptions, value]);
        }
  };

  const generateVerificationCode = () => {
    const min = 100000; // Mínimo valor de 6 dígitos
    const max = 999999; // Máximo valor de 6 dígitos
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const removeOption = (option) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
  };

  const handleSelectedLocations = (selected) => { setSelectedLocations(selected);};

  // Função para alternar os cards e destacar o botão clicado extraCards
  const handleButtonClick = (cards, button) => {
    setExtraCards(cards);
    setSelectedButton(button);
  };
  const [columns, setColumns] = useState({});
  const [title, setTitle] = useState('');
 


  const handleSaveAll = async () => {

    const trip = {

      title,
      startDate,
      endDate,
      clientBudget,
      language,
      prospect,
      selectedLocations,
      participants,
      columns: convertColumns(columns),
      price: totalPrice,
      //verificationCode: isEditing.data.verificationCode
     
    };
    
    console.log(trip);

    try {
      // Atualiza o produto usando a função importada
      await updateTrip(isEditing.data._id, trip);
      // Redireciona para a lista de produtos após a atualização
      router.push('/trips');
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  const convertColumns = (columns) => {
    return Object.keys(columns).map(dateKey => {
      const { name, items } = columns[dateKey];
      return { name, items };
    });
  };

  const revertColumns = (columnsArray) => {
    const updatedColumns = {};
    
    columnsArray.forEach((column) => {
      // Supondo que você tenha alguma lógica para extrair o dateKey do "name"
      // Por exemplo, se o "name" for "01/01/2024 (Monday)", extraímos "2024-01-01".
      const dateKey = extractDateKey(column.name); // Precisa de uma função para extrair isso.
      
      updatedColumns[dateKey] = {
        name: column.name,
        items: column.items,
      };
    });
  
    return updatedColumns;
  };
  
  // Exemplo de função para extrair dateKey do nome, ajustado conforme o formato esperado
  const extractDateKey = (name) => {
    const [day, month, year] = name.split(' ')[0].split('/'); // Extrai a data do nome
    return `${year}-${month}-${day}`; // Retorna no formato "yyyy-MM-dd"
  };
  
  

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: '', age: '', nationality: '' }]);
  };
  
  const calculateTotalPrice = (columns, participants) => {
    if (typeof columns !== 'object' || columns === null) {
      console.error('O parâmetro columns deve ser um objeto.');
      return 0;
    }
  
    const getPriceForAgeRange = (rate, ageRangeTitle, count) => {
      const range = rate.price.find(p => p.title === ageRangeTitle);
      if (!range) {
        //throw new Error(`Faixa etária "${ageRangeTitle}" não encontrada no rate.`);
        alert(`Faixa etária "${ageRangeTitle}" não encontrada no rate.`);
        setShowSelectRateModal(false);
      }
  
      const priceEntry = range.fields.find(f => count >= f.minParticipants && count <= f.maxParticipants);
      if (!priceEntry) {
        //throw new Error(`Não existe tier para ${count} participantes na faixa etária "${ageRangeTitle}" no rate.`);
        alert(`Não existe tier para ${count} participantes na faixa etária "${ageRangeTitle}" no rate.`);
        setShowSelectRateModal(false);
      }
  
      return priceEntry.pricePerParticipant * count;
    };
  
    let totalPrice = 0;
  
    // Itera sobre cada card em cada coluna
    Object.values(columns).forEach(column => {
      column.items.forEach(card => {
        if (!card.rates || card.rates.length === 0) {
          //throw new Error(`O produto "${card.title}" não possui nenhum rate disponível.`);
          alert(`O produto "${card.title}" não possui nenhum rate disponível.`);
          setShowSelectRateModal(false);
          
        }
  
        const ageCounts = participants.reduce((acc, participant) => {
          card.rates.forEach(rate => {
            const ageRange = rate.price.find(p => participant.age >= p.minAge && participant.age <= p.maxAge);
            if (ageRange) {
              acc[ageRange.title] = (acc[ageRange.title] || 0) + 1;
            }
          });
          return acc;
        }, {});
  
        // Calcula o preço total para este card com base nas faixas etárias e rates
        card.rates.forEach(rate => {
          if (rate.selected) {  // Apenas calcula se rate.selected for true
            for (const [ageRangeTitle, count] of Object.entries(ageCounts)) {
              totalPrice += getPriceForAgeRange(rate, ageRangeTitle, count);
            }
          }
        });
      });
    });
  
    return totalPrice;
  };
  
  
  
  
  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };
  
  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...participants];
  
    if (field === 'age') {
      const intValue = parseInt(value, 10);
      updatedParticipants[index][field] = isNaN(intValue) ? '' : intValue;
    } else {
      updatedParticipants[index][field] = value;
    }
  
    setParticipants(updatedParticipants);
  };
  

  const handleSave = () => {


    const tripData = {
      title,
      startDate,
      endDate,
      clientBudget,
      language,
      prospect,
      selectedLocations,
      participants,
      columns: convertColumns(columns),
      price: totalPrice,
      //verificationCode: generateVerificationCode()

    };

    console.log(tripData);

    addTrip(tripData)
    .then((data) => {
      console.log('Trip criado com sucesso:', data);
      router.push('/trips');
    })
    .catch((error) => {
      console.error('Erro ao criar o trip:', error.message);
      router.push('/trips');
    });

    //router.push('/trips');

  };


  const [activeColumn, setActiveColumn] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleClientBudgetChange = (budget) => {
    setClientBudget(budget);
  };

  const handlePropectChange = (prospect) => {
    setProspect(prospect);
  };


  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const getDatesInRange = (start, end) => {
    if (!start || !end) return [];
    return eachDayOfInterval({ start, end });
  };

  const datesInRange = getDatesInRange(startDate, endDate);

  const handleIncrementDays = () => {
    console.log(">",selectedRoomsFull);
    if (endDate) {
      setEndDate(addDays(endDate, 1));
    }
  };

  const handleDecrementDays = () => {
    if (startDate && endDate > startDate) {
      setEndDate(subDays(endDate, 1));
    }
  };

  

  useEffect(() => {
    // Verifique se as colunas já foram inicializadas
    if (Object.keys(columns).length === 0 && datesInRange.length > 0) {
      const updatedColumns = {};
      
      // Itera sobre todos os dias no range de datas
      datesInRange.forEach((date) => {
        updatedColumns[format(date, 'yyyy-MM-dd')] = {
          name: format(date, 'dd/MM/yyyy (EEEE)'), // Nome da coluna com data e dia da semana
          items: [], // Inicializa com uma lista vazia
        };
      });
  
      setColumns(updatedColumns);
    }
  }, [columns, datesInRange]); // Agora depende de `columns` para evitar loop
  
  // Adiciona `datesInRange` como dependência para garantir atualização
  

  const onDragStart = (e, itemId) => {
    e.dataTransfer.setData('itemId', itemId);
  };

  const handleRoomsSelection = (columns, productId, rooms) => {
    const updatedColumns = { ...columns };
  
    Object.values(updatedColumns).forEach(column => {
      column.items.forEach(product => {
        if (product.id === productId) {
          // Atualizar os quartos selecionados
          product.selectedRooms = rooms.map(room => ({
            id: room.id,
            title: room.title,
            occupancy: room.occupancy || 1,
            capacity: room.capacity
          }));
        }
      });
    });
  
    return updatedColumns;
  };
  

  const handleRateSelection = (columns, productId, rateId) => {
    const updatedColumns = { ...columns };

    Object.values(updatedColumns).forEach(column => {
      column.items.forEach(product => {
        if (product.id === productId) {
          product.rates.forEach(rate => {
            if (rate.id === rateId) {
              rate.selected = true;
            }
          });
        }
      });
    });

    return updatedColumns;
  };

  // Função para ser chamada na interação do usuário
  const handleSelection = (productId, rateId) => {
    const updatedColumns = handleRateSelection(columns, productId, rateId);
    setColumns(updatedColumns); // Atualiza o estado com os columns modificados handleSelection delete
    
    const price = calculateTotalPrice(columns, participants);
    setTotalPrice(price);

    setShowSelectRateModal(false);
  };


  const onDrop = (e, columnId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const item = extraCards.find(card => card.id === itemId);

    console.log(item);

    const selectedLanguage = item.languagesTour.find(lang => lang.name === language);
  
    if (!selectedLanguage) {
      console.error(`Language "${language}" not found in the item.`);
      // Opcional: Mostrar uma notificação visual para o usuário
      alert(`The selected language "${language}" is not available for this item.`);
      return; // Não adiciona o item à coluna
    }

    if(item.accomodation){
      setMockProduct(item);
      setShowSelectRoomModal(true);
      //return;
    }

    if(item.dayTour){
      const ageRangeError = participants.some(participant => {
        return !item.rates.some(rate => {
          return rate.price.some(ageRange => {
            return participant.age >= ageRange.minAge && participant.age <= ageRange.maxAge;
          });
        });
      });
    
        if (ageRangeError) {
          console.error('Some participants have ages that do not match any age range in the rates.');
          alert('There are participants with ages that do not match any age range in the selected item.');
          return; // Não adiciona o item à coluna
        }
    
        setProduct(item);
        if(product){ setShowSelectRateModal(true);};
    }

 
  
    if (item) {
      setColumns(prev => {
        const updatedColumns = { ...prev };
        if (!updatedColumns[columnId]) {
          updatedColumns[columnId] = {
            name: format(new Date(columnId), 'dd/MM/yyyy (EEEE)'),
            items: [],
          };
        }
        if (!updatedColumns[columnId].items.some(card => card.id === itemId)) {
          updatedColumns[columnId].items.push(item);
        }
        return updatedColumns;
      });
  
      // Opcionalmente, você pode remover o card da coluna extra se necessário
      //setExtraCards(prevExtraCards => prevExtraCards.filter(card => card.id !== itemId)); handleSave
    }
  
    setActiveColumn(null);
  };

  const handleTripInfoSave = () => {      
    const price = calculateTotalPrice(columns, participants);
    setTotalPrice(price);
    setShowModal(false);
  };
  

  const handleRemoveCard = (columnId, cardId) => {
    setColumns(prevColumns => {
      const updatedColumns = { ...prevColumns };
      updatedColumns[columnId] = {
        ...updatedColumns[columnId],
        items: updatedColumns[columnId].items.filter(item => item.id !== cardId)
      };

      const price = calculateTotalPrice(updatedColumns, participants);
      setTotalPrice(price);

      return updatedColumns;
    });


  };

  const handleClearColumn = (columnId) => {
    setColumns(prevColumns => {
      const updatedColumns = { ...prevColumns };
      updatedColumns[columnId] = {
        ...updatedColumns[columnId],
        items: [] // Define o array de items como vazio para remover todos os cards
      };
      
      // Calcula o novo preço usando o estado atualizado
      const price = calculateTotalPrice(updatedColumns, participants);
      setTotalPrice(price);
      
      return updatedColumns;
    });
  };
  

  

  const onDragOver = (e) => {
    e.preventDefault();
    const columnId = e.currentTarget.dataset.columnId;
    setActiveColumn(columnId);
  };

  const onDragLeave = () => {
    setActiveColumn(null);
  };

  return (
    <div className="p-4 relative">
      <Modal showModal={showModal} setShowModal={setShowModal} title={editingItem ? "Edit Trip Information" : "Add Trip Information"}>
      <div className="flex flex-col space-y-4 items-center">
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
            placeholder="Enter trip title"
          />
        </div>
        <div className="mb-4 w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Language
            </label>
            <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Nationality</option>
            <option value="English">English</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Spanish">Spanish</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4 w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
             Clients Budget
            </label>
            <input
                type="number"
                placeholder="Age"
                value={clientBudget}
                onChange={(e) => handleClientBudgetChange(e.target.value)}
                className="w-full flex-1 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />

        </div>
        <div className="mb-4 w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Prospect
            </label>
            <select
            id="prospect"
            value={prospect}
            onChange={(e) => setProspect(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Prospect</option>
            <option value="American">Get Your Guide</option>
            <option value="Brazilian">Viator</option>
            <option value="Canadian">Trip Advisor</option>
          
          </select>
        </div>

        <div className="mb-4 w-full">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Locations (Groups)
            </label>
            <MultiSelect
              options={locationGroupOptions}
              selectedOptions={selectedLocations}
              onSelectChange={handleSelectChange}
              onRemoveOption={removeOption}
              onSelect={handleSelectedLocations}
            />

        </div>
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Participants
          </label>
          {participants.map((participant, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                value={participant.name}
                onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <input
                type="number"
                placeholder="Age"
                value={participant.age}
                onChange={(e) => handleParticipantChange(index, 'age', e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
             <select
                value={participant.nationality}
                onChange={(e) => handleParticipantChange(index, "nationality", e.target.value)}
                className="w-1/3 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Nationality</option>
                <option value="American">American</option>
                <option value="Brazilian">Brazilian</option>
                <option value="Canadian">Canadian</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Indian">Indian</option>
                <option value="Japanese">Japanese</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Spanish">Spanish</option>
                <option value="Other">Other</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveParticipant(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddParticipant}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-2"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex justify-end space-x-2 w-full">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={handleTripInfoSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>

    <Modal showModal={showSelectRoomModal} setShowModal={setShowSelectRoomModal} title={mockProduct ? "Accommodate Travellers" : "Add Trip Information"}>
    <div className="flex flex-col space-y-4 items-center">
        <div className="mb-4 w-full">
          <div className="space-y-4">
            {/* Título com ícone e número de participantes disponíveis */}
            <div className="flex items-center justify-center mb-4">
                {/* Exibição do número de participantes disponíveis */}
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-800 dark:text-gray-300">
                    {availableParticipants} {/* Participantes disponíveis */}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-800 dark:text-gray-300">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            {/* Lista de rooms */}
            {mockProduct && mockProduct.rooms && mockProduct.rooms.length > 0 && (
  mockProduct.rooms.map((room, roomIndex) => (
    <div key={roomIndex} className="mb-4 p-4 border rounded-lg bg-gray-100 dark:bg-gray-700">
      {/* Linha com imagem, title, occupancy, capacity, checkbox - Tudo em uma linha */}
      <div className="flex justify-between items-center space-x-4 flex-wrap">
        {/* Imagem do quarto */}
        <img
          src={room.images[0]} 
          alt="Room" 
          className="w-12 h-12 object-cover rounded-md"
        />

        <span className="text-lg font-semibold text-gray-800 dark:text-gray-300 flex-shrink-0">{room.title}</span>

        {/* Mostrar occupancy ou code com base na seleção */}
        {selectedRooms[room.id]?.isSelected ? (
          <div className="flex items-center space-x-2">
            <label htmlFor={`occupancy-${roomIndex}`} className="text-gray-900 dark:text-white">
              Occupancy:
            </label>
            <input
              type="number"
              id={`occupancy-${roomIndex}`}
              value={selectedRooms[room.id]?.occupancy || 1}
              min={1}
              max={room.capacity}
              className="w-16 p-1 border rounded text-center"
              onChange={(e) => handleOccupancyChange(room.id, Number(e.target.value), room.capacity)}
              disabled={availableParticipants <= 0} // Desabilitar se não houver participantes
            />
            <span className="text-gray-600 dark:text-gray-400">/ {room.capacity}</span>
          </div>
        ) : (
          <span className="text-gray-600 dark:text-gray-400 flex-shrink-0">Code: {room.code}</span>
        )}

        <span className="text-gray-600 dark:text-gray-400 flex-shrink-0">Capacity: {room.capacity}</span>
        <input
          type="checkbox"
          id={`room-select-${roomIndex}`}
          className="h-5 w-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600"
          onChange={(e) => handleRoomSelection(room.id, e.target.checked, room)}
          disabled={availableParticipants <= 0} // Desabilitar se não houver participantes
        />
      </div>
    </div>
  ))
)}

          </div>
        </div>
      </div>
    </Modal>

    <Modal showModal={showSelectRateModal} setShowModal={setShowSelectRateModal} title={product ? "Select Rate" : "Add Trip Information"}>
      <div className="flex flex-col space-y-4 items-center">
      
        <div className="mb-4 w-full">
         
            <div className="space-y-4">
                 
                  {/* Lista de rates */}
                  {product.rates.map((rate, rateIndex) => (
                    <div key={rateIndex} className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                        {rate.title}
                      </h4>

                      {/* Lista de start times */}
                      {rate.times.map((time, timeIndex) => (
                        <div
                          key={timeIndex}
                          className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 p-2 rounded mt-2"
                        >
                          <span className="text-gray-900 dark:text-white">
                            {time.startTime}
                          </span>
                          
                            <button
                             onClick={() => handleSelection(product.id, rate.id)}
                              type="button"
                              className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                            </button>
                       
                        </div>
                      ))}
                    </div>
                  ))}
                      
            </div>
           
        </div>
      </div>
    </Modal>


      <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        {buttons.map((button) => (
          <button
            key={button.id}
            className={`flex items-center justify-center p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
              button.blocked ? 'bg-gray-300 cursor-not-allowed' : selectedButton === button.id ? 'bg-blue-500' : 'bg-gray-500'
            } hover:${!button.blocked && 'bg-gray-600'}`}
            onClick={() => !button.blocked && handleButtonClick(button.cards, button.id)} // Evita clique se estiver bloqueado
            disabled={button.blocked} // Desabilita o botão para melhorar a acessibilidade
          >
            <button.icon className={`h-6 w-6 ${button.blocked ? 'text-gray-400' : 'text-white'}`} />
          </button>
        ))}
      </div>


      <div className="flex justify-end items-center space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
          onClick={() => setShowModal(true)}
        >
          Trip Information
        </button>
        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg space-x-2">
          <span className="text-gray-900 dark:text-white font-semibold">
            {totalPrice} 
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
          </svg>

        </div>

        <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg space-x-2">
          <span className="text-gray-900 dark:text-white font-semibold">
            {participants.length} 
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
          </svg>

        </div>
        <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      </div>

      </div>

      <div className="fixed top-1/2 right-4 ml-2 transform -translate-y-1/2 flex flex-col space-y-2">
        <button
          onClick={handleIncrementDays}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleDecrementDays}
          className="bg-blue-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="fixed bottom-4 right-4 ml-2 flex flex-col space-y-2">
        <button
          //onClick={handleIncrementDays}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
      </svg>

      </button>
      <button
      onClick={isEditing.data ? handleSaveAll : handleSave}
      className="bg-green-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path
          fillRule="evenodd"
          d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    </div>


      <div className="mt-8 mr-8 flex overflow-x-auto space-x-4 custom-scrollbar">
        <div className="flex space-x-4 max-w-[calc(5*20rem)]">
          {/* Coluna Extra */}
          <div
            className={`bg-gray-200 dark:bg-gray-700 p-6 rounded-lg shadow-lg flex-shrink-0 w-[18rem] h-[40rem] ${activeColumn === 'extra-cards' ? 'border-2 border-dashed border-blue-500' : ''}`}
            data-column-id="extra-cards"
            onDrop={(e) => onDrop(e, 'extra-cards')}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <div className="text-center font-semibold">Products</div>
            
            {/* Container dos cards com comportamento de scroll */}
            <div className="mt-4 space-y-4 custom-scrollbar overflow-y-auto h-[35rem]">
              {extraCards.map((card) => (
                <div
                  key={card.id}
                  className="relative bg-white dark:bg-gray-800 mr-2 p-4 rounded-lg shadow-md cursor-move"
                  draggable
                  onDragStart={(e) => onDragStart(e, card.id)}
                >
                  <ArrowsUpDownIcon className="absolute top-2 left-2 h-5 w-5 text-gray-500" />
                  <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                    {card.code}
                  </p>
                  <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {card.title}
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Colunas Dinâmicas */}
          {datesInRange.map((date) => (
            <div
              key={format(date, 'yyyy-MM-dd')}
              className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex-shrink-0 w-[18rem] h-[40rem] relative ${activeColumn === format(date, 'yyyy-MM-dd') ? 'border-2 border-dashed border-blue-500' : ''}`}
              data-column-id={format(date, 'yyyy-MM-dd')}
              onDrop={(e) => onDrop(e, format(date, 'yyyy-MM-dd'))}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              {/* Cabeçalho da coluna */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-left font-semibold text-gray-700 dark:text-gray-300">
                    {format(date, 'dd/MM/yyyy')}
                  </div>
                  <div className="text-left text-sm text-gray-500 dark:text-gray-400">
                    {format(date, 'EEEE')}
                  </div>
                </div>

                {/* Botões de adicionar e remover */}
                <div className="flex flex-col space-y-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md">
                    <PlusIcon className="h-4 w-4" />
                  </button>
                  <button  onClick={() => handleClearColumn(format(date, 'yyyy-MM-dd'))} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Cards dentro da coluna */}
              <div className="mt-4 space-y-4">
                {columns[format(date, 'yyyy-MM-dd')]?.items.map((card) => (
                  <div
                    key={card.id}
                    className="relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-move"
                    draggable
                    onDragStart={(e) => onDragStart(e, card.id)}
                  >
                  <button
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleRemoveCard(format(date, 'yyyy-MM-dd'), card.id)}
                  >
                    &times;
                  </button>
                    <ArrowsUpDownIcon className="absolute top-2 left-2 h-5 w-5 text-gray-500" />
                    <p className=" mt-4 text-xs text-gray-500 dark:text-gray-400">
                      {card.code}
                    </p>
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {card.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
