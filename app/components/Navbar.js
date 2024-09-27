"use client";
import React, { useState, useEffect } from "react";
import { Disclosure } from "@headlessui/react";
import { CogIcon, BellIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/navigation';



// Defina as opções de navegação que você deseja mostrar
const navigation = [
  { name: "Home", href: "/dashboard", privilegeName: "Home" },
  { name: "Products", href: "/products", privilegeName: "Products" },
  { name: "Trips", href: "/trips", privilegeName: "Trips" },
];

const Navbar = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("Nenhum usuário encontrado no localStorage");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    router.push('/login'); // Redireciona para a página de login
  };

  // Função para verificar as permissões de visualização com base nos privilégios do usuário
  const hasViewPermission = (privilegeName) => {
    if (!user || !user.group || !user.group.privileges) return false;

    const privilege = user.group.privileges.find(
      (priv) => priv.name === privilegeName
    );
    if (privilege) {
      const viewAction = privilege.actions.find((action) => action.view === true);
      return !!viewAction; // Retorna true se a permissão de visualização for verdadeira
    }
    return false;
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {console.log("Navbar",user)}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-8"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  // Mostrar apenas itens de navegação com permissão de visualização
                  if (hasViewPermission(item.privilegeName)) {
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    );
                  }
                  return null; // Não exibe se não tiver permissão
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link href="/settings">
                  <button
                    type="button"
                    className="relative mr-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Settings</span>
                    <CogIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </Link>
                <button
                  type="button"
                  className="relative mr-4 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <ThemeSwitcher />

                <Menu as="div" className="relative  ml-4 ">
                <div>
                  <Menu.Button className="flex dark:bg-gray-600 items-center p-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                      // alt={user.name}
                    />
                    <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1 dark:bg-gray-600 rounded-md">
                    <Menu.Item>
                      {({ active }) => (
                        <div className="px-4 py-2">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
                            {user.email}
                          </p>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout} // Substitua pelo logout real
                          className={`block w-full text-left px-6 py-2 text-sm text-gray-700  dark:text-gray-200 ${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          }`}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
