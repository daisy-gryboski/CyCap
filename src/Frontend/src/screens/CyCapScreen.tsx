import React from 'react';
import { TradesList } from '../components/TradesList';

interface CyCapScreenProps {
  onBack: () => void;
}

export function CyCapScreen({ onBack }: CyCapScreenProps) {
  const trades = [
    { id: '1', description: 'Bought AAPL @ $150.23' },
    { id: '2', description: 'Sold TSLA @ $703.12' },
    { id: '3', description: 'Bought GME @ $24.50' },
    { id: '4', description: 'Bought AMZN @ $123.67' },
  ];

  return (
    <div className="flex flex-col gap-6 p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center uppercase tracking-wider">
        CyCap - Recent Trades
      </h1>

      <button 
        className="w-full bg-green-500 text-black text-lg rounded-lg py-3 px-4 
                   uppercase tracking-wider font-bold hover:bg-green-600 
                   active:bg-green-700 transition-colors duration-200"
      >
        Follow Trader and Connect Robinhood
      </button>

      <TradesList trades={trades} />

      <button
        onClick={onBack}
        className="w-full bg-red-500 text-black text-sm rounded-lg py-2 px-4 
                   uppercase tracking-wider font-bold hover:bg-red-600 
                   active:bg-red-700 transition-colors duration-200"
      >
        Back to Home
      </button>
    </div>
  );
}