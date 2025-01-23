import React from 'react';
import { Users, TrendingUp, Trophy, DollarSign } from 'lucide-react';

interface Community {
  name: string;
  members: number;
  winRate: number;
  monthly: number;
  rank: number;
}

export function TopCommunities() {
  const communities: Community[] = [
    {
      name: "Alpha Traders",
      members: 12453,
      winRate: 92.5,
      monthly: 24.5,
      rank: 1
    },
    {
      name: "Beta Group",
      members: 8932,
      winRate: 89.8,
      monthly: 21.8,
      rank: 2
    },
    {
      name: "Delta Force",
      members: 7845,
      winRate: 87.3,
      monthly: 19.3,
      rank: 3
    }
  ];

  return (
    <div className="bg-black rounded-xl p-6 h-full">
      <h2 className="text-xl font-bold text-white mb-6">Top Communities</h2>
      <div className="space-y-4">
        {communities.map((community) => (
          <div 
            key={community.name}
            className="bg-gray-900 rounded-lg p-4"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-black">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-white font-medium">{community.name}</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mt-2">
              <div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <Users className="w-3 h-3" />
                  Members
                </div>
                <div className="text-white font-medium">
                  {community.members.toLocaleString()}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <TrendingUp className="w-3 h-3" />
                  Win Rate
                </div>
                <div className="text-white font-medium">
                  {community.winRate}%
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  Monthly
                </div>
                <div className="text-green-500 font-medium">
                  {community.monthly}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}