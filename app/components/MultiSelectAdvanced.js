"use client"; // Marcar o componente como cliente

import { useState } from "react";
import Modal from "./Modal";
import LanguageDetailsModal from "./LanguageDetailsModal";

function MultiSelectAdvanced({ options, selectedOptions, label, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleSelectChange = (option) => {
    if (option && !selectedOptions.find((o) => o.name === option.name)) {
      const newSelectedOptions = [...selectedOptions, { ...option }];
      onSelect(newSelectedOptions); // Sincroniza com o componente pai
      setSearchTerm("");
      setShowOptions(false);
    }
  };

  const removeOption = (option) => {
    const newSelectedOptions = selectedOptions.filter(
      (o) => o.name !== option.name
    );
    onSelect(newSelectedOptions); // Sincroniza com o componente pai
  };

  const openModal = (option) => {
    setModalData(option);
    setShowModal(true);
  };

  const handleModalSave = (title, shortDescription, longDescription) => {
    const updatedOptions = selectedOptions.map((opt) =>
      opt.name === modalData.name
        ? { ...opt, title, shortDescription, longDescription }
        : opt
    );
    onSelect(updatedOptions); // Sincroniza com o componente pai
    setShowModal(false);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Display Selected Options */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
            onClick={() => openModal(option)}
          >
            <img src={option.flag} alt={option.name} className="w-6 h-4 mr-2" />
            <span>{option.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeOption(option);
              }}
              className="ml-2 text-red-600 dark:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Search and Select Field */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowOptions(true);
          }}
          onClick={() => setShowOptions(true)}
          placeholder="Search or type..."
          className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        {showOptions && (
          <div className="absolute w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 max-h-40 overflow-y-auto z-10 shadow-lg">
            {filteredOptions.length ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                  onClick={() => handleSelectChange(option)}
                >
                  <img
                    src={option.flag}
                    alt={option.name}
                    className="w-6 h-4 mr-2"
                  />
                  {option.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 dark:text-gray-400">
                No options found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for Additional Information */}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          title={`Details for ${modalData.name}`}
        >
          <LanguageDetailsModal
            data={modalData}
            onSave={handleModalSave}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default MultiSelectAdvanced;
