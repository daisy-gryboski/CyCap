import React from 'react';
import { Zap } from 'lucide-react';

export function TradeExecutionWidget() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Instant Trade Execution</h2>
      </div>
      <p className="text-gray-400">Execute trades instantly with one-click trading across multiple brokerages. No more delays or missed opportunities.</p>
    </div>
  );
}