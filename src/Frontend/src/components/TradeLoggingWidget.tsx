import React from 'react';
import { ClipboardList } from 'lucide-react';

export function TradeLoggingWidget() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Automated Trade Logging</h2>
      </div>
      <p className="text-gray-400">Automatically log and analyze all your trades with detailed performance metrics and insights.</p>
    </div>
  );
}