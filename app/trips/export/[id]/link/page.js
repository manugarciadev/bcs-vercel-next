"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTripById } from "../../../../services/api";

export default function ExportTrip() {
  const router = useRouter();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeProducts, setActiveProducts] = useState({}); // Controla quais produtos estão ativos

  useEffect(() => {
    const extractIdFromUrl = () => {
      const url = window.location.pathname;
      const segments = url.split("/");
      const id = segments[segments.length - 2];
      return id;
    };

    const id = extractIdFromUrl();

    if (!id) {
      console.log("ID não encontrado na URL");
      setLoading(false);
      return;
    }

    console.log(`Fetching data for trip ID: ${id}`);
    setLoading(true);

    getTripById(id)
      .then((data) => {
        console.log("Data fetched successfully:", data);
        setTrip(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trip:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Função para alternar o produto ativo
  const toggleProduct = (dayIndex, productIndex) => {
    setActiveProducts((prev) => ({
      ...prev,
      [`${dayIndex}-${productIndex}`]: !prev[`${dayIndex}-${productIndex}`],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl font-bold mb-6">Trip Details</h2>

        {trip?.columns.map((column, dayIndex) => (
          <div key={dayIndex} className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Day {dayIndex + 1} - {column.name}
            </h2>

            {column.items.map((item, productIndex) => (
              <div key={productIndex} className="mb-4">
                <div
                  className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md cursor-pointer"
                  onClick={() => toggleProduct(dayIndex, productIndex)}
                >
                  <div className="flex items-center">
                    <img
                      src={item.images[0]}
                      alt="Product Avatar"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <p className="text-lg font-semibold">{item.title}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-600">
                      12:00 am 🕙
                    </span>
                    <span className="text-sm text-gray-600">
                    
                    </span>
                    
                  </div>
                  <button className="text-blue-500">
                    {activeProducts[`${dayIndex}-${productIndex}`] ? '-' : '+'}
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                    activeProducts[`${dayIndex}-${productIndex}`] ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-gray-100 rounded-b-lg">
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      {item.images.slice(0, 3).map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`Item Image ${imgIndex + 1}`}
                          className="w-34 h-34 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-6">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold mb-2">Inclusions:</h3>
                        <ul className="list-disc pl-5">
                          {item.inclusions.map((inclusion, inclIndex) => (
                            <li key={inclIndex} className="flex items-center mb-1">
                              <svg
                                className="w-5 h-5 text-green-500 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 15.293a1 1 0 0 1-1.414-1.414L10.586 13 7.707 10.121a1 1 0 1 1 1.414-1.414L12 11.586l4.879-4.879a1 1 0 1 1 1.414 1.414L12.707 15.293a1 1 0 0 1-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {inclusion.title}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">Exclusions:</h3>
                        <ul className="list-disc pl-5">
                          {item.exclusions.map((exclusion, exclIndex) => (
                            <li key={exclIndex} className="flex items-center mb-1">
                              <svg
                                className="w-5 h-5 text-red-500 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 15.293a1 1 0 0 1-1.414-1.414L10.586 13 7.707 10.121a1 1 0 1 1 1.414-1.414L12 11.586l4.879-4.879a1 1 0 1 1 1.414 1.414L12.707 15.293a1 1 0 0 1-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {exclusion.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
