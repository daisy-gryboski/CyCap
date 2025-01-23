import React from 'react';

interface Trade {
  id: string;
  description: string;
}

interface TradesListProps {
  trades: Trade[];
}

export function TradesList({ trades }: TradesListProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-bold uppercase tracking-wider mb-4">Recent Trades</h3>
      <ul className="bg-gray-50 border border-gray-200 rounded-lg divide-y divide-gray-200">
        {trades.map((trade) => (
          <li 
            key={trade.id}
            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {trade.description}
          </li>
        ))}
      </ul>
    </div>
  );
}