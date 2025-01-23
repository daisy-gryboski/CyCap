import React from 'react';
import { LineChart } from 'lucide-react';

export function PerformanceTrackingWidget() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <LineChart className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Real-Time Performance Tracking</h2>
      </div>
      <p className="text-gray-400">Monitor win rates, profit/loss, and performance metrics for every trader and community in real-time.</p>
    </div>
  );
}