import React from 'react';
import { Users, Star, TrendingUp, CandlestickChart as Candlestick, LineChart, DollarSign } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  type: 'crypto' | 'options' | 'futures' | 'stocks';
  memberCount: number;
  winRate: number;
  monthlyReturn: number;
  isSubscribed: boolean;
  lastSignal?: string;
}

interface CommunitiesWidgetProps {
  communities: Community[];
  onViewAll: () => void;
}

export function CommunitiesWidget({ communities, onViewAll }: CommunitiesWidgetProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'crypto':
        return <Candlestick className="w-4 h-4" />;
      case 'options':
        return <TrendingUp className="w-4 h-4" />;
      case 'futures':
        return <LineChart className="w-4 h-4" />;
      case 'stocks':
        return <DollarSign className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Star className="w-5 h-5 text-black" />
          </div>
          <h2 className="text-xl font-bold text-white">My Communities</h2>
        </div>
        <button 
          onClick={onViewAll}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
        >
          View All
        </button>
      </div>

      {/* Communities List */}
      {communities.length === 0 ? (
        <div className="text-center py-8">
          <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No communities joined yet</p>
          <p className="text-sm text-gray-500">
            Join a community below to start receiving trading signals
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {communities.map((community) => (
            <div 
              key={community.id}
              className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(community.type)}
                    <h3 className="font-medium text-white">{community.name}</h3>
                  </div>
                  <span className="text-xs text-gray-400 capitalize">({community.type})</span>
                </div>
                <div className="text-sm text-green-400">+{community.monthlyReturn}%</div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Members</p>
                  <p className="text-white font-medium">{community.memberCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Win Rate</p>
                  <p className="text-white font-medium">{community.winRate}%</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Last Signal</p>
                  <p className="text-white font-medium">{community.lastSignal || 'None'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}