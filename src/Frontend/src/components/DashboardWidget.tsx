import React from 'react';
import { Users, TrendingUp, CheckCircle, BarChart } from 'lucide-react';

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  type: 'communities' | 'winRate' | 'traders' | 'volume';
}

export function DashboardWidget({ title, value, type }: DashboardWidgetProps) {
  const getIcon = () => {
    switch (type) {
      case 'communities':
        return <Users className="w-6 h-6 text-white" />;
      case 'winRate':
        return <TrendingUp className="w-6 h-6 text-white" />;
      case 'traders':
        return <CheckCircle className="w-6 h-6 text-white" />;
      case 'volume':
        return <BarChart className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="bg-black rounded-xl p-6">
      <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
        {getIcon()}
      </div>
      <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}