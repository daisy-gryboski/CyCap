import React from 'react';
import { Shield } from 'lucide-react';

export function VerifiedCommunitiesWidget() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-white">Verified Communities</h2>
      </div>
      <p className="text-gray-400">Join trusted trading communities led by verified professional traders with proven track records.</p>
    </div>
  );
}