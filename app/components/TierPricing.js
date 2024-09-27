import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

const TierPricing = ({ tiers, onTiersChange }) => {
  const [localTiers, setLocalTiers] = useState([...tiers]);

  useEffect(() => {
    setLocalTiers([...tiers]); // Sincroniza o estado local com o estado do componente pai
  }, [tiers]);

  const handleMinChange = (index, value) => {
    const newTiers = [...localTiers];
    newTiers[index].minParticipants = value;
    setLocalTiers(newTiers);
    onTiersChange(newTiers); // Atualiza o estado no componente pai
  };

  const handleMaxChange = (index, value) => {
    let newTiers = [...localTiers];
    const newMax = value === "" ? Infinity : value;

    // Atualiza o maxParticipants do tier atual
    newTiers[index].maxParticipants = newMax;

    // Atualiza o próximo tier com base no novo maxParticipants
    if (newTiers[index + 1]) {
      newTiers[index + 1].minParticipants = newMax + 1;
    }

    // Remove todos os tiers subsequentes inválidos
    newTiers = newTiers.filter((tier, i) => {
      return i === 0 || tier.minParticipants <= (tier.maxParticipants || Infinity);
    });

    // Se o último tier tem maxParticipants definido, cria um novo tier vazio
    if (
      index === newTiers.length - 1 &&
      newMax !== Infinity &&
      newMax > newTiers[index].minParticipants
    ) {
      newTiers.push({
        minParticipants: newMax + 1,
        maxParticipants: Infinity,
        pricePerParticipant: 0,
      });
    }

    setLocalTiers(newTiers);
    onTiersChange(newTiers); // Atualiza o estado no componente pai
  };

  const handlePriceChange = (index, value) => {
    const newTiers = [...localTiers];
    newTiers[index].pricePerParticipant = value;
    setLocalTiers(newTiers);
    onTiersChange(newTiers); // Atualiza o estado no componente pai
  };

  const handleRemoveTier = (index) => {
    const newTiers = localTiers.filter((_, i) => i !== index);
    setLocalTiers(newTiers);
    onTiersChange(newTiers); // Atualiza o estado no componente pai
  };

  return (
    <div className="flex flex-col mt-8">
      {localTiers.map((tier, index) => (
        <div key={index} className="flex space-x-2 items-center mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Min Participants
            </label>
            <input
              type="number"
              value={tier.minParticipants}
              readOnly
              className="w-24 p-2 border border-gray-300 rounded text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Max Participants
            </label>
            <input
              type="number"
              value={
                tier.maxParticipants === Infinity ? "" : tier.maxParticipants
              }
              onChange={(e) =>
                handleMaxChange(index, parseInt(e.target.value, 10))
              }
              placeholder="∞"
              className="w-24 p-2 border border-gray-300 rounded text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              min={tier.minParticipants + 1}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Price per Participant
            </label>
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-200 mr-2">$</span>
              <input
                type="number"
                value={tier.pricePerParticipant}
                onChange={(e) =>
                  handlePriceChange(index, parseFloat(e.target.value) || 0)
                }
                className="w-24 p-2 border border-gray-300 rounded text-center dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                min="0"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => handleRemoveTier(index)}
              disabled={index === 0}
              className={`px-2 py-1 rounded ${
                index === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                  : "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              }`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TierPricing;
