"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader'; // Import the Loader component

const Settings = () => {
  const [loading, setLoading] = useState(true);

  // Simulate fetching data with a delay
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a fetch request
        await new Promise((resolve) => setTimeout(resolve, 2500));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Array with titles, subtitles, and links for each section
  const sections = [
    { title: 'Inclusions', subtitle: 'What is included in your package', link: '/settings/inclusions' },
    { title: 'Exclusions', subtitle: 'What is not included in your package', link: '/settings/exclusions' },
    { title: 'Themes', subtitle: 'Explore various themes for your tours', link: '/settings/themes' },
    { title: 'Categories', subtitle: 'Browse through different categories', link: '/settings/categories' },
    { title: 'Destinations', subtitle: 'Find popular destinations', link: '/settings/destinations' },
    { title: 'Locations', subtitle: 'Find specific locations', link: '/settings/locations' },
    { title: 'Age Ranges', subtitle: 'Browse Age ranges', link: '/settings/age-ranges' },
    { title: 'What to bring', subtitle: 'Explore what to bring', link: '/settings/what-to-bring' },
    { title: 'Users', subtitle: 'Create and manage Users', link: '/settings/users' },
    { title: 'Cancellation Policies', subtitle: 'Set up all the products CP', link: '/settings/cancellation-policies' },
  ];

  return (
    <ProtectedRoute>
      {loading ? (
        <Loader /> // Show the loader while loading
      ) : (
        <div className="relative overflow-auto bg-gray-100 dark:bg-gray-900 h-screen p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-between relative"
              >
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {section.subtitle}
                  </p>
                </div>
                <Link href={section.link}>
                  <button
                    type="button"
                    className="absolute bottom-4 right-4 flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Settings;
