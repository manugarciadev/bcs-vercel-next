"use client"; // Marcar o componente como cliente

import React, { useState, useCallback } from "react";

const DragImages = ({ images, onImagesChange }) => {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleDrop = useCallback(async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const files = Array.from(event.dataTransfer.files);
    const base64Images = await Promise.all(files.map(file => convertToBase64(file)));
    onImagesChange([...images, ...base64Images]); // Atualiza o estado no componente pai
  }, [images, onImagesChange]);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    const base64Images = await Promise.all(files.map(file => convertToBase64(file)));
    onImagesChange([...images, ...base64Images]); // Atualiza o estado no componente pai
  };

  const handleClear = () => {
    onImagesChange([]); // Limpa as imagens no componente pai
  };

  const handleRemoveImage = (imageToRemove) => {
    const updatedImages = images.filter(image => image !== imageToRemove);
    onImagesChange(updatedImages); // Atualiza o estado no componente pai
  };

  return (
    <div
      className="relative border-dashed border-4 border-gray-300 dark:border-gray-700 p-6 rounded-lg flex flex-col items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="text-center mb-4">
        <p className="text-gray-500 dark:text-gray-400">Drag and drop your images here or click the button to add.</p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id="fileInput"
          onChange={handleFileInputChange}
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Add Image
        </label>
        <button
          onClick={handleClear}
          className="mt-4 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-800 ml-2"
        >
          Clear Images
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`uploaded-image-${index}`} className="w-full h-auto rounded-md" />
            <button
              onClick={() => handleRemoveImage(image)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              aria-label="Remove Image"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragImages;
