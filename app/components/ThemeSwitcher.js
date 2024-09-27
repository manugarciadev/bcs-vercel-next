"use client"; // Marcar o componente como cliente

import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Carrega o tema salvo no localStorage ou o padrão
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-300 dark:bg-gray-600 rounded-md"
    >
      {isDarkMode ? (
        <span className="text-white">🌞 </span>
      ) : (
        <span className="text-black">🌙 </span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
