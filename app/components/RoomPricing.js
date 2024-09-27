import React from 'react';

const RoomPricing = ({ rooms, pricing, setPricing }) => {
  // Função para atualizar o preço por hora ou dia
  const handlePriceChange = (roomId, title, type, value) => {
    setPricing((prevPricing) => {
      // Procurar o item correspondente ao roomId
      const updatedPricing = prevPricing.map((item) =>
        item.roomId === roomId ? { ...item, [type]: value } : item
      );

      // Se o roomId ainda não estiver no array, adicioná-lo
      if (!updatedPricing.find((item) => item.roomId === roomId)) {
        updatedPricing.push({
          roomId,
          title,
          pricePerHour: type === 'pricePerHour' ? value : '',
          pricePerDay: type === 'pricePerDay' ? value : '',
        });
      }

      return updatedPricing;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pricing data:', pricing);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {rooms.map((room) => {
          // Procurar o preço atual no array pricing para este roomId
          const roomPricing = pricing.find((p) => p.roomId === room.id) || {};
          return (
            <div key={room.id} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold text-left">{room.title}</h3>
              <div className="flex space-x-4 border border-gray-300 p-4 rounded-lg shadow-sm">
                {/* Campo para preço por hora */}
                <div className="flex-1">
                  <label htmlFor={`pricePerHour-${room.id}`} className="block text-sm font-medium">
                    Price per Hour
                  </label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      $
                    </span>
                    <input
                      id={`pricePerHour-${room.id}`}
                      type="number"
                      value={roomPricing.pricePerHour || ''}
                      onChange={(e) => handlePriceChange(room.id, room.name, 'pricePerHour', e.target.value)}
                      className="p-2 border rounded-r-md w-full"
                      placeholder="Enter hourly price"
                    />
                  </div>
                </div>

                {/* Campo para preço por dia */}
                <div className="flex-1">
                  <label htmlFor={`pricePerDay-${room.id}`} className="block text-sm font-medium">
                    Price per Day
                  </label>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      $
                    </span>
                    <input
                      id={`pricePerDay-${room.id}`}
                      type="number"
                      value={roomPricing.pricePerDay || ''}
                      onChange={(e) => handlePriceChange(room.id, 'pricePerDay', e.target.value)}
                      className="p-2 border rounded-r-md w-full"
                      placeholder="Enter daily price"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default RoomPricing;
