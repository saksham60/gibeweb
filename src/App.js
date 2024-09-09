// src/App.js

import React, { useState } from 'react';
import './App.css';
import Supervisor from './views/supervisor';
import TaskAssignment from './views/TaskAssignment';
import Navbar from './components/Navbar/Navbar';

function App() {
  // State for workers and tasks
  const [workers, setWorkers] = useState([
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', rate: 5 },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', rate: 4 },
    { firstName: 'Saksham', lastName: 'Kashyap', email: 'saksham@example.com', rate: 3 },
  ]);
  const [tasks, setTasks] = useState({});
  const [currentView, setCurrentView] = useState('supervisor'); // default view

  // Function to add a new worker
  const addWorker = (worker) => {
    setWorkers([...workers, worker]);
  };

  // Function to delete a worker
  const deleteWorker = (email) => {
    setWorkers(workers.filter((worker) => worker.email !== email));
  };

  // Function to add a task for a specific worker
  const addTask = (workerName, task) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [workerName]: [...(prevTasks[workerName] || []), task],
    }));
  };

  // Function to delete a task for a specific worker
  const deleteTask = (workerName, taskIndex) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [workerName]: prevTasks[workerName].filter((_, index) => index !== taskIndex),
    }));
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  return (
    <div>
      <header>
        <Navbar onNavigate={handleNavigation} />
      </header>

      {currentView === 'supervisor' && (
        <Supervisor
          workers={workers}
          addWorker={addWorker}
          deleteWorker={deleteWorker}
        />
      )}

      {currentView === 'tasks' && (
        <TaskAssignment
          workers={workers}
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
