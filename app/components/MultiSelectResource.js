"use client"; // Mark component as client

import { useState } from "react";

function MultiSelectResource({ options, label, onSelect }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSelectChange = (option) => {
    if (!selectedOptions.find((o) => o.name === option.name)) {
      const newSelectedOptions = [...selectedOptions, { ...option, count: 0 }];
      setSelectedOptions(newSelectedOptions);
      if (onSelect) {
        onSelect(newSelectedOptions);
      }
      setSearchTerm("");
      setShowOptions(false);
    }
  };

  const removeOption = (option) => {
    const newSelectedOptions = selectedOptions.filter(
      (o) => o.name !== option.name
    );
    setSelectedOptions(newSelectedOptions);
    if (onSelect) {
      onSelect(newSelectedOptions);
    }
  };

  const incrementCount = (option) => {
    const newSelectedOptions = selectedOptions.map((o) =>
      o.name === option.name ? { ...o, count: o.count + 1 } : o
    );
    setSelectedOptions(newSelectedOptions);
    if (onSelect) {
      onSelect(newSelectedOptions);
    }
  };

  const decrementCount = (option) => {
    const newSelectedOptions = selectedOptions.map((o) =>
      o.name === option.name && o.count > 0 ? { ...o, count: o.count - 1 } : o
    );
    setSelectedOptions(newSelectedOptions);
    if (onSelect) {
      onSelect(newSelectedOptions);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full ">
      {/* Display Selected Options */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded"
          >
            <span>{option.name}</span>
            <span className="mx-2 text-gray-600 dark:text-gray-400">|</span>
            <button
              onClick={() => decrementCount(option)}
              className="ml-2 text-blue-600 dark:text-blue-400"
            >
              &ndash;
            </button>
            <div className="mx-2 w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 rounded">
              <span>{option.count}</span>
            </div>
            <button
              onClick={() => incrementCount(option)}
              className="ml-2 text-green-600 dark:text-green-400"
            >
              +
            </button>
            <span className="mx-2 text-gray-600 dark:text-gray-400">|</span>
            <button
              onClick={() => removeOption(option)}
              className="text-red-600 dark:text-red-400"
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
    </div>
  );
}

export default MultiSelectResource;
