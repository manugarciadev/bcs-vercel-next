"use client";
import React, { useState } from 'react';
import { HomeIcon, UsersIcon, FolderIcon, CalendarIcon, DocumentIcon, ChartBarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    router.push('/login'); // Redireciona para a página de login
  };

  return (
    <div className={`flex flex-col h-screen min-h-screen bg-blue-600 text-white transition-width duration-300 ${isOpen ? 'w-64' : 'w-14'}`}>
      <div className="flex items-center justify-between p-3 mb-6">
        {/* Logo e Título */}
        {isOpen && (
          <div className="flex items-center space-x-3">
            <img src="https://i.postimg.cc/yxJyBnsy/logo.png" alt="Logo" className="w-14 h-14 transition-all duration-300" />
            <h1 className="text-xl font-bold">BM.</h1>
          </div>
        )}

        {/* Botão para recolher/expandir sidebar */}
        <button onClick={toggleSidebar} className="focus:outline-none">
          {isOpen ? '←' : '→'}
        </button>
      </div>

      <ul className="flex-1 space-y-2">
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/" className="flex items-center w-full">
            <HomeIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Dashboard</span>
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/team" className="flex items-center w-full">
            <UsersIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Team</span>
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/projects" className="flex items-center w-full">
            <FolderIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Projects</span>
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/calendar" className="flex items-center w-full">
            <CalendarIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Calendar</span>
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/documents" className="flex items-center w-full">
            <DocumentIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Documents</span>
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/reports" className="flex items-center w-full">
            <ChartBarIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Reports</span>
          </Link>
        </li>
        <li className="flex items-center p-2 hover:bg-indigo-600 rounded">
          <Link href="/resources" className="flex items-center w-full">
            <UsersIcon className="h-6 w-6" />
            <span className={`ml-3 ${!isOpen && 'hidden'}`}>Resources</span>
          </Link>
        </li>
      </ul>

      {/* Botão de Logout */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left focus:outline-none hover:bg-indigo-500 p-2 rounded-md"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span className={`ml-3 ${!isOpen && 'hidden'}`}>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
