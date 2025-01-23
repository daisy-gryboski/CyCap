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

export function CommunityPerformance() {
  const times = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '1:00', '1:30', '2:00', '2:30', 
    '3:00', '3:30', '4:00'
  ];

  const data = {
    labels: times,
    datasets: [
      {
        label: 'Community Performance',
        data: [4500, 6000, 5250, 7500, 9000, 7500, 9000, 10500, 9750, 12000, 13500, 12750, 15000, 16500, 18000],
        fill: true,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#fff',
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
            return `$${context.parsed.y.toLocaleString()}`;
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
          callback: (value: number) => `$${value.toLocaleString()}`,
          stepSize: 1500
        },
        min: 0,
        max: 19500
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
    <div className="bg-black rounded-xl p-6">
      <h2 className="text-xl font-bold text-white mb-6">Community Performance</h2>
      <div className="h-[400px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}