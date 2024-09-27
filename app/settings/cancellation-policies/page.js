"use client";
import { useState, useEffect } from 'react';
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { getCancellationPolicies, addCancellationPolicy, getCancellationPolicyById, updateCancellationPolicy, deleteCancellationPolicy } from '../../services/api';

export default function CancellationPolicies() {
  const [showModal, setShowModal] = useState(false);
  const [policyTitle, setPolicyTitle] = useState('');
  const [policyRules, setPolicyRules] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all cancellation policies on component mount
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const data = await getCancellationPolicies();
        setPolicies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  // Handles editing of a selected policy
  const handleEditPolicy = async (policyId) => {
    try {
      const policy = await getCancellationPolicyById(policyId);
      setEditingItem(policy);
      setPolicyTitle(policy.title);
      setPolicyRules(policy.rules); // Load rules for the selected policy
      setShowModal(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Handles saving of a new or edited policy
  // Handles saving of a new or edited policy
const handleSave = async () => {
  try {
    if (editingItem) {
      // Update existing policy
      await updateCancellationPolicy(editingItem._id, {
        title: policyTitle,
        rules: policyRules,
      });
    } else {
      // Create new policy
      await addCancellationPolicy({
        title: policyTitle,
        rules: policyRules,
      });
    }

    // Reload the list of policies after saving
    const updatedPolicies = await getCancellationPolicies();
    setPolicies(updatedPolicies);
    setShowModal(false); // Close the modal

    // Clear the state after saving
    setEditingItem(null);
    setPolicyTitle('');
    setPolicyRules([]);
  } catch (error) {
    console.error('Error saving policy:', error.message);
    alert('Failed to save the policy. Please try again.');
  }
};


  // Adds a new rule to the policy
  const handleAddRule = () => {
    setPolicyRules([
      ...policyRules,
      { duration1: '', duration2: '', unit: '', condition: '', percentage: '', id: Date.now().toString() }, // New rule object with two duration fields
    ]);
  };

  // Updates a specific rule in the policy
  const handleRuleChange = (index, field, value) => {
    const updatedRules = [...policyRules];
    updatedRules[index][field] = value;
    setPolicyRules(updatedRules);
  };

  return (
    <div>
      {/* Modal for adding/editing policies */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        title={editingItem ? "Edit Cancellation Policy" : "Add Cancellation Policy"}
      >
        <div className="flex flex-col space-y-4 items-center relative">
          <div className="absolute top-0 right-0 mt-2 mr-2">
            <InformationCircleIcon
              id="info-icon"
              className="h-6 w-6 text-gray-400 hover:text-gray-600 cursor-pointer"
              data-tooltip-content="Translation automatic to: Portuguese; Spanish; German; French"
            />
          </div>
          <Tooltip anchorSelect="#info-icon" />
          <div className="mb-4 w-full">
            <label htmlFor="policy" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Policy Title
            </label>
            <input
              id="policy"
              type="text"
              value={policyTitle}
              onChange={(e) => setPolicyTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder="Enter Policy Title"
            />
          </div>

          {/* Rule Management */}
          <div className="w-full space-y-4">
            {policyRules.map((rule, index) => (
              <div key={rule._id} className="p-2 border border-gray-300 rounded">
                <div className="flex space-x-4">
                  <select
                    value={rule.condition}
                    onChange={(e) => handleRuleChange(index, 'condition', e.target.value)}
                    className="w-1/4 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="Up to">Up to</option>
                    <option value="Between">Between</option>
                    <option value="From">From</option>
                  </select>
                  
                  {rule.condition === 'Between' ? (
                    <>
                      <input
                        type="number"
                        placeholder="Duration From"
                        value={rule.duration1}
                        onChange={(e) => handleRuleChange(index, 'duration1', e.target.value)}
                        className="w-1/4 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Duration To"
                        value={rule.duration2}
                        onChange={(e) => handleRuleChange(index, 'duration2', e.target.value)}
                        className="w-1/4 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                    </>
                  ) : (
                    <input
                      type="number"
                      placeholder="Duration"
                      value={rule.duration1}
                      onChange={(e) => handleRuleChange(index, 'duration1', e.target.value)}
                      className="w-1/4 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  )}
                  
                  <select
                    value={rule.unit}
                    onChange={(e) => handleRuleChange(index, 'unit', e.target.value)}
                    className="w-1/4 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="Day">Day</option>
                    <option value="Hour">Hour</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Fee"
                    value={rule.percentage}
                    onChange={(e) => handleRuleChange(index, 'percentage', e.target.value)}
                    className="w-1/4 p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={handleAddRule}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Rule
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
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Button to add a new policy */}
      <button
        onClick={() => {
          setEditingItem(null); // Reset item to avoid conflicts
          setPolicyTitle(''); // Clear the title field
          setPolicyRules([]); // Clear rules
          setShowModal(true);
        }}
        className="px-4 py-2 mb-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Cancellation Policy
      </button>

      {/* Table to display policies */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table
          columns={[{ key: 'title', title: 'Title' }, { key: 'type', title: 'Type' }]}
          data={policies}
          onEdit={handleEditPolicy}
          onDelete={deleteCancellationPolicy}
        />
      )}
    </div>
  );
}
