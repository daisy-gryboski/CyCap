import React from 'react';
import { Shield } from 'lucide-react';

export function RiskManagementWidget() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Risk Management</h2>
      </div>
      <p className="text-gray-400">Advanced risk management tools to protect your capital and optimize your trading strategy.</p>
    </div>
  );
}