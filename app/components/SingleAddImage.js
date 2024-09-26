"use client"; // Mark component as client

import React, { useState, useCallback } from "react";

const SingleAddImage = ({ image, onImageChange }) => {
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

    const file = event.dataTransfer.files[0]; // Only accept one file
    if (file) {
      const base64Image = await convertToBase64(file);
      onImageChange(base64Image); // Set the single image in the parent state
    }
  }, [onImageChange]);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0]; // Only accept one file
    if (file) {
      const base64Image = await convertToBase64(file);
      onImageChange(base64Image); // Set the single image in the parent state
    }
  };

  const handleClear = () => {
    onImageChange(null); // Clear the image in the parent state
  };

  return (
    <div
      className="relative border-dashed border-4 border-gray-300 dark:border-gray-700 p-6 rounded-lg flex flex-col items-center justify-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="text-center mb-4">
        <p className="text-gray-500 dark:text-gray-400">
          Drag and drop your image here or click the button to add.
        </p>
        <input
          type="file"
          accept="image/*"
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
          Clear Image
        </button>
      </div>
      {image && (
        <div className="relative">
          <img src={image} alt="uploaded-image" className="w-full h-auto rounded-md" />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            aria-label="Remove Image"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleAddImage;
