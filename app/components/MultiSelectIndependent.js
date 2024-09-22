"use client"; // Marcar o componente como cliente

import { useState } from "react";

function MultiSelectIndependent({ options, label, selectedOptions, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectChange = (option) => {
    if (option && !selectedOptions.some((o) => o._id === option._id)) {
      const newSelectedOptions = [...selectedOptions, option];
      onSelect(newSelectedOptions); // Atualiza o estado no componente pai
      setSearchTerm('');
      setShowOptions(false);
    }
  };

  const removeOption = (option) => {
    const newSelectedOptions = selectedOptions.filter((o) => o._id !== option._id);
    onSelect(newSelectedOptions); // Atualiza o estado no componente pai
  };

  const filteredOptions = options.filter(option =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full ">
      <h1 className="text-2xl font-bold mb-4">{label}</h1>

      {/* Display Selected Options */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedOptions.map((option) => (
          <div
            key={option._id} // Use a propriedade única, como `id`
            className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded"
          >
            <span>{option.title}</span>
            <button
              onClick={() => removeOption(option)}
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
          onClick={() => setShowOptions((prev) => !prev)} // Toggle the options when clicked
          placeholder="Search or type..."
          className="block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />

        {showOptions && (
          <div className="absolute w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 max-h-40 overflow-y-auto z-10 shadow-lg">
            {filteredOptions.length ? (
              filteredOptions.map((option) => (
                <div
                  key={option._id} // Use a propriedade única, como `id`
                  className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => handleSelectChange(option)}
                >
                  {option.title}
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
    </div>
  );
}

export default MultiSelectIndependent;
