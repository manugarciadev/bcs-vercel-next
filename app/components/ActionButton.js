const ActionButton = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    const handleClick = () => {
      setIsChecked(!isChecked); // Inverte o estado de checked ao clicar
    };
  
    return (
      <button
        onClick={handleClick}
        className={`flex items-center space-x-1 px-2 py-1 rounded ${
          isChecked ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white'
        } hover:${isChecked ? 'bg-green-600' : 'bg-gray-300 dark:hover:bg-gray-500'}`}
      >
        {isChecked && <CheckIcon className="h-4 w-4" />} {/* Exibe o ícone de check se o botão estiver marcado */}
        <span>{label}</span>
      </button>
    );
  };