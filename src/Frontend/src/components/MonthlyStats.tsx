import React from 'react';
import { TrendingUp, Scale, BarChart2 } from 'lucide-react';

interface MonthlyStatsProps {
  winRate: number;
  profitFactor: number;
  totalTrades: number;
}

export function MonthlyStats({ 
  winRate = 78.5,
  profitFactor = 2.4,
  totalTrades = 342
}: MonthlyStatsProps) {
  return (
    <div>
      <h2 className="text-gray-400 text-sm font-medium mb-3">Monthly Performance</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Win Rate</span>
          </div>
          <span className="text-lg font-bold text-white">{winRate}%</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-white" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Profit Factor</span>
          </div>
          <span className="text-lg font-bold text-white">{profitFactor}x</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-4 h-4 text-white" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Trades</span>
          </div>
          <span className="text-lg font-bold text-white">{totalTrades}</span>
        </div>
      </div>
    </div>
  );
}