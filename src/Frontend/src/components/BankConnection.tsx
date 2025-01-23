import React from 'react';
import { Wallet } from 'lucide-react';

export function BankConnection() {
  return (
    <div className="bg-zinc-900 rounded-xl p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
          <Wallet className="w-6 h-6 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Bank Connection</h2>
          <p className="text-gray-400">Connect your bank account to enable trading</p>
        </div>
      </div>

      <button
        className="w-full bg-green-500 text-black px-6 py-3 rounded-lg font-medium 
                   hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        Connect Bank Account
      </button>
    </div>
  );
}