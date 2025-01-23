import React from 'react';
import { TrendingDown, Activity } from 'lucide-react';

interface RiskMetricsProps {
  maxDrawdown: number;
  sharpeRatio: number;
}

export function RiskMetrics({ 
  maxDrawdown = 12.3,
  sharpeRatio = 2.8
}: RiskMetricsProps) {
  return (
    <div>
      <h2 className="text-gray-400 text-sm font-medium mb-3">Risk Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-white" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Max Drawdown</span>
          </div>
          <span className="text-lg font-bold text-white">-{maxDrawdown}%</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-white" />
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Sharpe Ratio</span>
          </div>
          <span className="text-lg font-bold text-white">{sharpeRatio}</span>
        </div>
      </div>
    </div>
  );
}