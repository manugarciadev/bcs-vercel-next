import { useState } from "react";

function LanguageDetailsModal({ data, onSave, onCancel }) {
  const [title, setTitle] = useState(data.title || "");
  const [shortDescription, setShortDescription] = useState(
    data.shortDescription || ""
  );
  const [longDescription, setLongDescription] = useState(
    data.longDescription || ""
  );

  const handleSave = () => {
    onSave(title, shortDescription, longDescription);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Short Description
        </label>
        <input
          type="text"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Long Description
        </label>
        <textarea
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          rows="4"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default LanguageDetailsModal;
