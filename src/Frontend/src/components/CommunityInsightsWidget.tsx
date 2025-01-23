import React from 'react';
import { Users } from 'lucide-react';

export function CommunityInsightsWidget() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <Users className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Community Insights</h2>
      </div>
      <p className="text-gray-400">Learn from the community's collective wisdom with shared strategies and market analysis.</p>
    </div>
  );
}