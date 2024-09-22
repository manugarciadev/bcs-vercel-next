"use client";

const Modal = ({ showModal, setShowModal, title, children }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null; // Don't render the modal if it's not supposed to be shown

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            &times;
          </button>
        </div>
        <div className="overflow-y-auto max-h-[70vh] text-gray-700 dark:text-gray-300 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
