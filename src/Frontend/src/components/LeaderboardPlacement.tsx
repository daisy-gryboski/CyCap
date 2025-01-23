import React from 'react';
import { Trophy, TrendingUp, Target } from 'lucide-react';

interface LeaderboardPlacementProps {
  rank: number;
  totalTraders: number;
  winRate: number;
  profitFactor: number;
}

export function LeaderboardPlacement({
  rank = 1,
  totalTraders = 10000,
  winRate = 92.5,
  profitFactor = 3.2
}: LeaderboardPlacementProps) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-black" />
        </div>
        <h2 className="text-xl font-bold text-white">Leaderboard Placement</h2>
      </div>

      {/* Rank Display */}
      <div className="bg-zinc-800 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Current Rank</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">#{rank}</span>
              <span className="text-gray-400">/ {totalTraders.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-green-500" />
            <span className="text-gray-400 text-sm">Win Rate</span>
          </div>
          <span className="text-2xl font-bold text-white">{winRate}%</span>
        </div>

        <div className="bg-zinc-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-gray-400 text-sm">Profit Factor</span>
          </div>
          <span className="text-2xl font-bold text-white">{profitFactor}x</span>
        </div>
      </div>
    </div>
  );
}