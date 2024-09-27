import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const ProductTable = ({ columns, data, onEdit, onDelete, updateStatus, itemsPerPage = 5, permissions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredData = data.filter((row) =>
  row.title && row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDelete(itemToDelete);
      setIsModalOpen(false);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Barra de Pesquisa */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            <th scope="col" className="px-6 py-3">Image</th>
            {columns.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.title}
              </th>
            ))}
            {(permissions.edit || permissions.eliminate) && (
              <th scope="col" className="px-6 py-3">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${
                  rowIndex % 2 === 0 ? '' : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <td className="px-6 py-4">{(currentPage - 1) * itemsPerPage + rowIndex + 1}</td>
                <td className="px-6 py-4">
                  {row.images && row.images.length > 0 ? (
                    <img
                      src={row.images[0]}
                      alt="Product"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">No Image</span>
                  )}
                </td>
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {column.key === 'status' ? (
                      <select
                        value={row.status}
                        onChange={(e) => handleStatusChange(row._id || row.id, e.target.value)}
                        className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
                      >
                        <option value="Inactive">Inactive 🔴</option>
                        <option value="Active">Active 🟢</option>
                      </select>
                    ) : Array.isArray(row[column.key]) ? (
                      <div className="flex space-x-2">
                        {row[column.key].map((item) => (
                          <span
                            key={item.id}
                            className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded"
                          >
                            {item.title}
                          </span>
                        ))}
                      </div>
                    ) : typeof row[column.key] === 'object' && row[column.key] !== null ? (
                      row[column.key].title
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
                {(permissions.edit || permissions.eliminate) && (
                  <td className="px-6 py-4 inline-block px-2 py-1 text-sm">
                    {permissions.edit && (
                      <button
                        onClick={() => onEdit(row._id || row.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
                      >
                        Edit
                      </button>
                    )}
                    {permissions.delete && (
                      <button
                        onClick={() => handleDeleteClick(row._id || row.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (permissions.edit || permissions.delete ? 1 : 0)} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No Records.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Controle de Paginação */}
      <div className="flex justify-between items-center mt-4 space-y-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentPage === 1 ? 'cursor-not-allowed' : ''
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed ${
            currentPage === totalPages ? 'cursor-not-allowed' : ''
          }`}
        >
          Next
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Do you really want to eliminate? 
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 dark:bg-red-700 text-sm font-medium text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
