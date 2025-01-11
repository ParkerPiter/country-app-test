import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PopulationChart({ populationCounts }) {
  const data = {
    labels: populationCounts.map(count => count.year),
    datasets: [
      {
        label: 'Population',
        data: populationCounts.map(count => count.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population Over Time',
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default PopulationChart;