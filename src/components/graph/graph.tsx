import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface Props {
  visits: Record<string, number>;
}

const VisitsLineChart: React.FC<Props> = ({ visits }) => {
  // Prepare labels
  const labels = Object.keys(visits).map((date) => {
    const year = date.slice(0, 4);
    const month = date.slice(4,6)
    // const month = (parseInt(date.slice(4, 6)) + 1).toString().padStart(2, '0'); // Ensure two digits
    const day = date.slice(6, 8);
    return `${year}-${month}-${day}`;
  });

  // Prepare data values
  const dataValues = Object.values(visits);

  // Chart Data
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Visits',
        data: dataValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Visits',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default VisitsLineChart;