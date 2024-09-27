"use client"
import { useState, useEffect } from 'react';
import { getTripById } from '../../../services/api';
import { useRouter } from 'next/navigation'; 
import ProtectedRoute from '../../../components/ProtectedRoute';
import Modal from '../../../components/Modal';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const TripsPage = () => {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(null);
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    alert("Link copiado para a área de transferência!");
  };
  //const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    
    // Exemplo para simular a extração do ID do URL
    const url = window.location.href;
    const extractedId = url.split('/').pop(); // Extrai o ID da URL
   
    
    if (extractedId) {
      setId(extractedId);
      setLink(window.location.href + '/link');
      // Use the imported function to fetch the product
      getTripById(extractedId)
        .then(data => {
          setTrip(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    } else {
      setProduct({});
      setLoading(false); // Initialize with default values for creation
    }

}, []);

const handleExportLink = (productId) => {
  // Redireciona para a página de edição do produto com o ID correspondente
  router.push(`/trips/export/${productId}/link`);
  // Aqui você pode implementar a lógica adicional para editar o produto, se necessário
};

  


  return (
    <ProtectedRoute>
    <div>
    <Modal showModal={showModal} setShowModal={setShowModal} title="Link">
      <div className="flex flex-col space-y-4 items-center relative">
        {/* Campo de texto com botão de copiar */}
        <div className="flex space-x-2 items-center w-full">
          <input
            type="text"
            value={link}
            readOnly
            className="border border-gray-300 px-4 py-2 rounded-md w-full"
          />
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-2" />
            Copiar
          </button>
        </div>

        {/* Botão para fechar o modal */}
        <div className="flex justify-end space-x-2 w-full">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
        Export
      </h2>
      {trip && Object.keys(trip).length > 0 && (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Export {trip.title || ''} as a PDF file or generate a link
        </p>
      )}

      <br />
      {/* Imagem centralizada */}
      <img
        src="https://cdn.iconscout.com/icon/free/png-256/free-export-icon-download-in-svg-png-gif-file-formats--document-doc-produce-execute-user-interface-vol-2-pack-icons-13290.png"
        alt="Centered Image"
        className="w-48 h-48 mb-2"
      />
  
      {/* Botões lado a lado */}
      <div className="flex space-x-4 mt-4 mt-4">
        {/* Botão Export PDF */}
        <button
          className="bg-blue-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
          //onClick={handleExportPDF} // Substitua pela sua função de exportar PDF
        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
          </svg>

          Export PDF
        </button>
  
        {/* Botão Export Link */}
        <button
          className="bg-green-500 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
          onClick={() => setShowModal(true)} // Substitua pela sua função de exportar link
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13.828 14.828a4 4 0 005.656 0l1.414-1.414a4 4 0 000-5.656l-1.414-1.414a4 4 0 00-5.656 0M10.172 9.172a4 4 0 00-5.656 0l-1.414 1.414a4 4 0 000 5.656l1.414 1.414a4 4 0 005.656 0"
            />
          </svg>
          Export Link
        </button>
      </div>
    </div>
  </div>
  </ProtectedRoute>
  
  );
};

export default TripsPage;
