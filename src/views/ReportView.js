// src/views/ReportView.js

import React, { useEffect, useRef, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './styles/ReportView.css'; // Add custom styling for layout

// Register the components
Chart.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

const ReportView = ({ workers }) => {  // Receive workers as a prop from App.js
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [selectedWorker, setSelectedWorker] = useState('all'); // Dropdown state to filter workers

  const workersData = {
    all: workers.map(worker => worker.rate),  // Use worker rates for chart data
    ...workers.reduce((acc, worker) => {
      acc[worker.firstName] = [worker.rate];  // Dynamically generate individual worker data
      return acc;
    }, {}),
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartData = selectedWorker === 'all' ? workersData.all : workersData[selectedWorker];

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: selectedWorker === 'all' ? workers.map(worker => worker.firstName) : [selectedWorker],
        datasets: [
          {
            label: 'Efficiency',
            data: chartData,
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: { type: 'category' },
          y: { beginAtZero: true },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [selectedWorker, workers]);

  const handleWorkerChange = (e) => {
    setSelectedWorker(e.target.value);
  };

  return (
    <div className="report-container">
      <div className="dropdown">
        <label htmlFor="worker-select">Select Worker: </label>
        <select id="worker-select" onChange={handleWorkerChange}>
          <option value="all">All Workers</option>
          {workers.map(worker => (
            <option key={worker.id} value={worker.firstName}>
              {worker.firstName}
            </option>
          ))}
        </select>
      </div>
      <div className="chart-wrapper">
        <canvas ref={chartRef} id="workerEfficiencyChart"></canvas>
      </div>
    </div>
  );
};

export default ReportView;
