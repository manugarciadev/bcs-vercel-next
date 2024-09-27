import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Task({ taskData, onTaskChange }) {
  const [taskId, setTaskId] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [subTasks, setSubTasks] = useState([]);

  // Atualiza o estado local quando o taskData mudar
  useEffect(() => {
    if (taskData) {
      setTaskId(taskData.id || uuidv4()); // Set a new UUID if taskData does not have one
      setTaskTitle(taskData.title || '');
      setTaskDescription(taskData.description || '');
      setSubTasks(taskData.subTasks || []);
    }
  }, [taskData]);

  // Atualiza o taskData no componente pai sempre que algum campo for alterado
  useEffect(() => {
    const updatedTaskData = { id: taskId, title: taskTitle, description: taskDescription, subTasks };
    // Verifica se realmente houve alguma mudança antes de chamar onTaskChange
    if (
      taskData.title !== taskTitle ||
      taskData.description !== taskDescription ||
      JSON.stringify(taskData.subTasks) !== JSON.stringify(subTasks)
    ) {
      onTaskChange(updatedTaskData);
    }
  }, [taskTitle, taskDescription, subTasks, taskId, taskData, onTaskChange]);

  const handleAddSubTask = () => {
    setSubTasks([...subTasks, { id: uuidv4(), title: '', deadline: '' }]);
  };

  const handleSubTaskChange = (index, field, value) => {
    const updatedSubTasks = subTasks.map((subTask, i) =>
      i === index ? { ...subTask, [field]: value } : subTask
    );
    setSubTasks(updatedSubTasks);
  };

  const handleRemoveSubTask = (index) => {
    const updatedSubTasks = subTasks.filter((_, i) => i !== index);
    setSubTasks(updatedSubTasks);
  };

  return (
    <div className="w-full space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Task Title
        </label>
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
          rows="4"
          className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Subtasks
        </label>
        {subTasks.map((subTask, index) => (
          <div key={subTask.id} className="flex items-center space-x-2 w-full">
            <input
              type="text"
              value={subTask.title}
              onChange={(e) => handleSubTaskChange(index, 'title', e.target.value)}
              placeholder="Subtask title"
              className="flex-grow p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="time"
              value={subTask.deadline}
              onChange={(e) => handleSubTaskChange(index, 'deadline', e.target.value)}
              className="p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            <button
              onClick={() => handleRemoveSubTask(index)}
              className="p-2 text-red-500 hover:text-red-700"
            >
              &times;
            </button>
          </div>
        ))}

        <button
          onClick={handleAddSubTask}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Subtask
        </button>
      </div>
    </div>
  );
}

export default Task;
