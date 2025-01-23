import React from 'react';
import { User, CheckCircle, Users } from 'lucide-react';

interface ProfileWidgetProps {
  username: string;
  imageUrl?: string;
  memberCount?: number;
  winRate?: number;
  monthlyWinRate?: number;
  totalTrades?: number;
  isVerified?: boolean;
}

export function ProfileWidget({ 
  username, 
  imageUrl, 
  memberCount = 1234,
  winRate = 87.5,
  monthlyWinRate = 92.3,
  totalTrades = 1543,
  isVerified = true 
}: ProfileWidgetProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={username} 
            className="w-10 h-10 rounded-full object-cover grayscale"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{username}</span>
            {isVerified && <CheckCircle className="w-4 h-4 text-white" />}
          </div>
          <span className="text-gray-400 text-sm">{memberCount.toLocaleString()} members</span>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-3">
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Win Rate</span>
          <span className="text-white font-bold">{winRate}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Monthly Wins</span>
          <span className="text-white font-bold">{monthlyWinRate}%</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Trades</span>
          <span className="text-white font-bold">{totalTrades.toLocaleString()}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 text-xs uppercase tracking-wider mb-1">Status</span>
          <span className="text-white font-bold">{isVerified ? 'Verified' : 'Unverified'}</span>
        </div>
      </div>

      <button 
        className="mt-4 w-full bg-black text-white rounded-lg py-2 px-4 flex items-center justify-center gap-2 
                   hover:bg-gray-900 transition-colors border border-gray-800"
      >
        <Users className="w-4 h-4" />
        <span className="font-medium">View Community</span>
      </button>
    </div>
  );
}