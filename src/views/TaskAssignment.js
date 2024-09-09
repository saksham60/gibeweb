import React, { useState } from 'react';
import './styles/TaskAssignment.css';

const TaskAssignment = ({ workers, tasks, addTask, deleteTask }) => {
  const [selectedWorker, setSelectedWorker] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleWorkerChange = (e) => {
    setSelectedWorker(e.target.value);
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask && selectedWorker) {
      addTask(selectedWorker, newTask);
      setNewTask('');
    }
  };

  return (
    <div className="task-assignment-container">
      <h1>Task Assignment</h1>
      <div className="dropdown-container">
        <select value={selectedWorker} onChange={handleWorkerChange}>
          <option value="" disabled>Select a Worker</option>
          {workers.map((worker, index) => (
            <option key={index} value={`${worker.firstName} ${worker.lastName}`}>
              {worker.firstName} {worker.lastName}
            </option>
          ))}
        </select>
      </div>
      {selectedWorker && (
        <div className="task-input-container">
          <input
            type="text"
            value={newTask}
            onChange={handleNewTaskChange}
            placeholder="Enter new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
      {selectedWorker && tasks[selectedWorker] && (
        <div className="task-queue">
          <h2>Tasks for {selectedWorker}</h2>
          <ul>
            {tasks[selectedWorker].map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => deleteTask(selectedWorker, index)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskAssignment;
