import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function PerformanceOverview() {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Performance',
        data: [
          12.5, 18.2, 15.8, 24.3, 32.1, 28.9,
          38.4, 45.2, 42.1, 52.8, 58.4, 65.2
        ],
        fill: true,
        borderColor: '#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 12,
        titleColor: '#fff',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.parsed.y.toFixed(1)}%`;
          }
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          callback: (value: number) => `${value}%`,
          stepSize: 10
        },
        min: 0,
        max: 70
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        }
      },
    },
  };

  return (
    <div className="bg-black rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-8">Performance Overview</h2>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}