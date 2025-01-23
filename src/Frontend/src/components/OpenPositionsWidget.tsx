import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertCircle } from 'lucide-react';

interface Position {
  symbol: string;
  type: 'long' | 'short';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  pnl: number;
  pnlPercentage: number;
  stopLoss: number;
  takeProfit: number;
  openTime: string;
}

interface OpenPositionsWidgetProps {
  positions: Position[];
}

export function OpenPositionsWidget({ positions }: OpenPositionsWidgetProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const calculateTotalPnL = () => {
    return positions.reduce((total, position) => total + position.pnl, 0);
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-black" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Open Positions</h2>
            <p className="text-sm text-gray-400">
              {positions.length} active {positions.length === 1 ? 'trade' : 'trades'}
            </p>
          </div>
        </div>
        <div className={`text-lg font-bold ${calculateTotalPnL() >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {formatCurrency(calculateTotalPnL())}
        </div>
      </div>

      {/* Positions List */}
      {positions.length === 0 ? (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No open positions</p>
          <p className="text-sm text-gray-500">
            Your active trades will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position, index) => (
            <div 
              key={`${position.symbol}-${index}`}
              className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors"
            >
              {/* Position Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    position.type === 'long' ? 'bg-green-500/10' : 'bg-red-500/10'
                  }`}>
                    {position.type === 'long' ? (
                      <TrendingUp className={`w-4 h-4 ${
                        position.type === 'long' ? 'text-green-500' : 'text-red-500'
                      }`} />
                    ) : (
                      <TrendingDown className={`w-4 h-4 ${
                        position.type === 'long' ? 'text-green-500' : 'text-red-500'
                      }`} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{position.symbol}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{position.openTime}</span>
                    </div>
                  </div>
                </div>
                <div className={`text-right ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  <div className="font-medium">{formatCurrency(position.pnl)}</div>
                  <div className="text-sm">{position.pnlPercentage.toFixed(2)}%</div>
                </div>
              </div>

              {/* Position Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Quantity</p>
                  <p className="text-white font-medium">{position.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Entry Price</p>
                  <p className="text-white font-medium">{formatCurrency(position.entryPrice)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Current Price</p>
                  <p className="text-white font-medium">{formatCurrency(position.currentPrice)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Stop Loss</p>
                  <p className="text-red-400 font-medium">{formatCurrency(position.stopLoss)}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${position.pnl >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{
                      width: `${Math.min(Math.abs(position.pnlPercentage), 100)}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}